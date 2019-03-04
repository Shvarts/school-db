import React, { Component } from 'react'
import axios from 'axios';
import {
    Col,
    Card,
    CardHeader,
    CardBody,
    Button,
    Row} from 'reactstrap'
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter'
import paginationFactory from 'react-bootstrap-table2-paginator'
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import PopUp from "./PopUp";
import {connect} from "react-redux";
// import ReactExport from "react-data-export";
//
//
// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
// const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


class ChildrenTable extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            records: [],
            modalShow: false,
            schools: []
        };

        this.onAdd = this.onAdd.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onEditBeforeSaveCell = this.onEditBeforeSaveCell.bind(this);
        this.onDateFilter = this.onDateFilter.bind(this);
    }

    componentDidMount() {
        const {isAuthenticated, user} = this.props.auth;
        const isAdmin = user.isAdmin === 'так';

        if(!isAuthenticated) {
            this.props.history.push('/login');
            return;
        }

        const params = !isAdmin ? {
            params: {
                school: user.school
            }
        } : null;

        axios.get('/api/notes/', params)
            .then(response => {
                this.setState({
                    records: response.data
                });
            });

        if (isAdmin) {
            axios.get('/api/schools/')
                .then(response => {
                    const schoolsOptions = response.data.map((school) => {
                        return {
                            value: school.name,
                            label: school.name
                        }
                    });
                    this.setState({
                        schoolOptions: schoolsOptions
                    });
                });
        } else {
            this.setState({
                schoolOptions: [{
                    value: user.school,
                    label: user.school
                }]
            })
        }
    }

    onAdd(data) {
        axios.post('/api/notes/', data)
            .then(response => {
                this.state.records.push(response.data);
                this.setState({
                    records: this.state.records
                })
            });
    }

    onDelete() {
        const data = {ids: this.node.selectionContext.state.selected};

        axios.delete('/api/notes/', {data})
            .then(response => {
                this.setState({
                    records: this.state.records.filter(function(r) {
                        return data.ids.indexOf(r._id) === -1;
                    })
                });
            });
    }

    onEditBeforeSaveCell(oldValue, newValue, row) {
        axios.put('/api/notes/', row)
    }

    onDateFilter(filterValue) {
        const years = filterValue.split(/[ ,]+/);

        return this.state.records.filter((record) => {
            return years.indexOf(new Date(record.dateOfBirth).getFullYear() + '') > -1;
        });
    }

    render() {
        // const formOfStudySelectOptions = {
        //     0: 'індивідуальна',
        //     1: 'індивідуально-групова',
        //     2: 'колективна'
        // };

        const columns = [{
            dataField: 'fullname',
            text: "Повне Ім'я",
            filter: textFilter(),
            sort: true
        }, {
            dataField: 'locationOfLiving',
            text: 'Місце проживання',
            filter: textFilter(),
            sort: true
        }, {
            dataField: 'locationOfStudy',
            text: 'Місце навчання',
            filter: textFilter(),
            sort: true,
            editor: {
                type: Type.SELECT,
                options: this.state.schoolOptions
            }
        }, {
            dataField: 'sex',
            text: 'Стать',
            filter: textFilter(),
            sort: true,
            editor: {
                type: Type.SELECT,
                options: [{
                    value: 'чоловіча',
                    label: 'чоловіча'
                }, {
                    value: 'жіноча',
                    label: 'жіноча'
                }]
            }
        }, {
            dataField: 'formOfStudy',
            text: 'Форма навчання',
            sort: true,
            editor: {
                type: Type.SELECT,
                options: [{
                    value: 'індивідуальна',
                    label: 'індивідуальна'
                }, {
                    value: 'індивідуально-групова',
                    label: 'індивідуально-групова'
                }, {
                    value: 'колективна',
                    label: 'колективна'
                }]
            },
            filter: textFilter()
            // formatter: cell => formOfStudySelectOptions[cell],
            // filter: selectFilter({
            //     options: formOfStudySelectOptions,
            //     onFilter: filterVal => console.log(`Filter Value: ${filterVal}`)
            // })
        }, {
            dataField: 'specialCategory',
            text: 'Сцеціальна категорія',
            filter: textFilter(),
            sort: true,
            editor: {
                type: Type.CHECKBOX,
                value: 'так:ні'
            }
        }, {
            dataField: 'dateOfBirth',
            text: 'Дата народження',
            filter: textFilter({
                onFilter: this.onDateFilter
            }),
            sort: true,
            formatter: (cell) => {
                let dateObj = cell;
                if (typeof cell !== 'object') {
                    dateObj = new Date(cell);
                }
                return `${('0' + dateObj.getDate()).slice(-2)}.${('0' + (dateObj.getMonth() + 1)).slice(-2)}.${dateObj.getFullYear()}`;
            },
            editor: {
                type: Type.DATE
            }
        }];

        const selectRow = {
            mode: 'checkbox',
            clickToEdit: true
        };

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Таблиця дітей
                            </CardHeader>
                            <CardBody>
                                <div style={{display: 'flex'}}>
                                    <PopUp onAdd={this.onAdd}/>
                                    <button className="btn btn-danger btn-xs"
                                            onClick={this.onDelete}>Delete
                                    </button>
                                    {/*<ExcelFile element={<Button color="success">Експортувати в XLS</Button>}>*/}
                                        {/*<ExcelSheet data={this.state.records} name="children">*/}
                                            {/*<ExcelColumn label="Повне Ім'я" value="fullname"/>*/}
                                            {/*<ExcelColumn label="Місце проживання" value="locationOfLiving"/>*/}
                                            {/*<ExcelColumn label="Місце навчання" value="locationOfStudy"/>*/}
                                            {/*<ExcelColumn label="Стать" value="sex"/>*/}
                                            {/*<ExcelColumn label="Сцеціальна категорія" value="specialCategory"/>*/}
                                            {/*<ExcelColumn label="Дата народження" value="dateOfBirth"/>*/}
                                        {/*</ExcelSheet>*/}
                                    {/*</ExcelFile>*/}
                                </div>
                                <BootstrapTable
                                    ref={ n => this.node = n }
                                    keyField='_id'
                                    data={ this.state.records }
                                    columns={ columns }
                                    filter={ filterFactory() }
                                    pagination={ paginationFactory() }
                                    selectRow={ selectRow }
                                    cellEdit={ cellEditFactory({
                                        mode: 'click',
                                        beforeSaveCell: this.onEditBeforeSaveCell,
                                        blurToSave: true })}
                                    defaultSorted={ [{
                                        dataField: 'name',
                                        order: 'desc'
                                    }] }
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps)(ChildrenTable)

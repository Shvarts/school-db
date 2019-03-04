import React, { Component } from 'react'
import axios from 'axios';
import {
    Col,
    Card,
    CardHeader,
    CardBody,
    Row} from 'reactstrap'
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter'
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import PopUp from "./PopUp";
import { registerUser } from '../../actions/authentication';
import {connect} from "react-redux";

class Users extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            records: [],
            modalShow: false
        };

        axios.get('/api/users/')
            .then(response => {
                this.setState({
                    records: response.data
                });
            });

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

        this.onAdd = this.onAdd.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onEditBeforeSaveCell = this.onEditBeforeSaveCell.bind(this);
    }

    componentDidMount() {
        if(!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
            return;
        } else if (this.props.auth.user.isAdmin !== 'так') {
            this.props.history.push('/children-table');
            return;
        }
    }

    onAdd(data) {
        axios.post('/api/users/register', data)
            .then(res => {
                this.state.records.push(data);
                this.setState({records: this.state.records});
            });
    }

    onDelete() {
        const data = {ids: this.node.selectionContext.state.selected};

        axios.delete('/api/users/', {data})
            .then(response => {
                this.setState({
                    records: this.state.records.filter(function(r) {
                        return data.ids.indexOf(r._id) === -1;
                    })
                });
            });
    }

    onEditBeforeSaveCell(oldValue, newValue, row) {
        axios.post('/api/users/update', row);
    }

    render() {
        const columns = [{
            dataField: 'name',
            text: "Ім'я",
            filter: textFilter(),
            sort: true
        }, {
            dataField: 'login',
            text: "Логін",
            filter: textFilter(),
            sort: true
        }, {
            dataField: 'password',
            text: "Пароль",
            formatter: () => {
                return (
                    <h5>
                        <span className="label label-success"> Пароль</span>
                    </h5>
                );
            }
        }, {
            dataField: 'school',
            text: 'Школа',
            filter: textFilter(),
            sort: true,
            editor: {
                type: Type.SELECT,
                options: this.state.schoolOptions
            }
        }, {
            dataField: 'isAdmin',
            text: 'Адмін',
            filter: textFilter(),
            sort: true,
            editor: {
                type: Type.CHECKBOX,
                value: 'так:ні'
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
                                <i className="fa fa-align-justify"></i> Таблиця користувачів
                            </CardHeader>
                            <CardBody>
                                <div style={{display: 'flex'}}>
                                    <PopUp onAdd={this.onAdd}/>
                                    <button className="btn btn-danger btn-xs"
                                            onClick={this.onDelete}>Delete
                                    </button>
                                </div>
                                <BootstrapTable
                                    ref={ n => this.node = n }
                                    keyField='_id'
                                    data={ this.state.records }
                                    columns={ columns }
                                    filter={ filterFactory() }
                                    selectRow={ selectRow }
                                    cellEdit={ cellEditFactory({
                                        mode: 'click',
                                        afterSaveCell: this.onEditBeforeSaveCell,
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

export default connect(mapStateToProps,{ registerUser })(Users);

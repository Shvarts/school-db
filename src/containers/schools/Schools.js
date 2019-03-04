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
import cellEditFactory from 'react-bootstrap-table2-editor';
import PopUp from "./PopUp";
import {connect} from "react-redux";

class Schools extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            records: [],
            modalShow: false
        };

        this.onAdd = this.onAdd.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onEditBeforeSaveCell = this.onEditBeforeSaveCell.bind(this);
    }

    componentDidMount() {
        if(!this.props.auth.isAuthenticated) {
            this.props && this.props.history && this.props.history.push('/login');
            return;
        } else if (this.props.auth.user.isAdmin !== 'так') {
            this.props && this.props.history && this.props.history.push('/children-table');
            return;
        }

        axios.get('/api/schools/')
            .then(response => {
                this.setState({
                    records: response.data
                });
            });
    }

    onAdd(data) {
        axios.post('/api/schools/', data)
            .then(response => {
                this.state.records.push(response.data);
                this.setState({
                    records: this.state.records
                })
            });
    }

    onDelete() {
        const data = {ids: this.node.selectionContext.state.selected};

        axios.delete('/api/schools/', {data})
            .then(response => {
                this.setState({
                    records: this.state.records.filter(function(r) {
                        return data.ids.indexOf(r._id) === -1;
                    })
                });
            });
    }

    onEditBeforeSaveCell(oldValue, newValue, row) {
        axios.put('/api/schools/', row)
        // .then(response => {
        //     console.log(response);
        // });
    }

    render() {
        const columns = [{
            dataField: 'name',
            text: "Назва школи",
            filter: textFilter(),
            sort: true
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
                                <i className="fa fa-align-justify"></i> Таблиця шкіл
                            </CardHeader>
                            <CardBody>
                                <div style={{display: 'flex'}}>
                                    <PopUp onAdd={this.onAdd}/>
                                    <button className="btn btn-danger btn-xs"
                                            onclick={this.onDelete}>Delete
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

export default connect(mapStateToProps)(Schools);

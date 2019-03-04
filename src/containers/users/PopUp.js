import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from "axios";
import {connect} from "react-redux";

class PopUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            onAdd: props.onAdd,
            name: '',
            login: '',
            school: this.props.auth.user.school || '',
            password: '',
            isAdmin: 'ні'
        };

        this.onAdd = this.onAdd.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCheckBox = this.handleChangeCheckBox.bind(this);
        this.getSchoolOptions = this.getSchoolOptions.bind(this);
    }

    componentDidMount() {
        const {user} = this.props.auth;
        const isAdmin = user.isAdmin === 'так';

        if (isAdmin) {
            axios.get('/api/schools/')
                .then(response => {;
                    this.setState({
                        school: response.data[0].name,
                        schoolOptions: response.data
                    });
                });
        } else {
            this.setState({
                schoolOptions: [{
                    name: user.school
                }]
            })
        }
    }

    getSchoolOptions() {
        return this.state.schoolOptions && this.state.schoolOptions.map((school, i) => <option key={i}>{school.name}</option>);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    onAdd() {
        const data = {
            name: this.state.name,
            login: this.state.login,
            school: this.state.school,
            password: this.state.password,
            isAdmin: this.state.isAdmin
        };
        this.state.onAdd(data);
        this.toggle();
    }

    handleChange(e) {
        this.setState({[e.target.id]: e.target.value});
    }

    handleChangeCheckBox(e) {
        this.setState({[e.target.id]: e.target.checked ? 'так' : 'ні'});
    }

    render() {
        return (
            <div>
                <Button color="primary" onClick={this.toggle}>Додати</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Додати запис</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="name">Імя</Label>
                                <Input value={this.state.name} onChange={this.handleChange} type="text" name="text" id="name" placeholder="Імя" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="login">Логін</Label>
                                <Input value={this.state.login} onChange={this.handleChange} type="text" name="text" id="login" placeholder="Логін" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Пароль</Label>
                                <Input value={this.state.password} onChange={this.handleChange} type="text" name="text" id="password" placeholder="Пароль" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="school">Школа</Label>
                                <Input value={this.state.school} onChange={this.handleChange} type="select" name="select" id="school">
                                    {this.getSchoolOptions()}
                                </Input>
                            </FormGroup>
                            <FormGroup check>
                                <Label for="isAdmin" check>
                                    <Input value={this.state.isAdmin} onChange={this.handleChangeCheckBox} type="checkbox" id="isAdmin" />{' '}
                                    Адмін
                                </Label>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.onAdd}>Додати</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Відмінити</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps)(PopUp);
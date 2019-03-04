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
            fullname: '',
            locationOfLiving: '',
            locationOfStudy: this.props.auth.user.school || '',
            dateOfBirth: '',
            specialCategory: 'ні',
            sex: 'чоловіча',
            formOfStudy: 'колективна'
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
                .then(response => {
                    this.setState({
                        locationOfStudy: response.data[0].name,
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
            fullname: this.state.fullname,
            locationOfLiving: this.state.locationOfLiving,
            locationOfStudy: this.state.locationOfStudy,
            dateOfBirth: this.state.dateOfBirth,
            specialCategory: this.state.specialCategory,
            sex: this.state.sex,
            formOfStudy: this.state.formOfStudy
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
                                <Label for="fullname">Повне Ім'я</Label>
                                <Input value={this.state.fullname} onChange={this.handleChange} type="text" name="text" id="fullname" placeholder="Повне Імя" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="locationOfLiving">Місце проживання</Label>
                                <Input value={this.state.locationOfLiving} onChange={this.handleChange} type="text" name="text" id="locationOfLiving" placeholder="Місце проживання" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="locationOfStudy">Місце навчання</Label>
                                <Input value={this.state.locationOfStudy} onChange={this.handleChange} type="select" name="select" id="locationOfStudy">
                                    {this.getSchoolOptions()}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="sex">Стать</Label>
                                <Input value={this.state.sex} onChange={this.handleChange} type="select" name="select" id="sex">
                                    <option>чоловіча</option>
                                    <option>жіноча</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="formOfStudy">Форма навчання</Label>
                                <Input value={this.state.formOfStudy} onChange={this.handleChange} type="select" name="select" id="formOfStudy">
                                    <option>колективна</option>
                                    <option>індивідуальна</option>
                                    <option>індивідуально-групова</option>
                                </Input>
                            </FormGroup>
                            <FormGroup check>
                                <Label for="specialCategory" check>
                                    <Input value={this.state.specialCategory} onChange={this.handleChangeCheckBox} type="checkbox" id="specialCategory" />{' '}
                                    Сцеціальна категорія
                                </Label>
                            </FormGroup>
                            <FormGroup>
                                <Label for="dateOfBirth">Дата народження</Label>
                                <Input value={this.state.dateOfBirth} onChange={this.handleChange} type="date" name="date" id="dateOfBirth" />
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
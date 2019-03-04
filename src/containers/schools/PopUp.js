import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

class PopUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            onAdd: props.onAdd,
            name: ''
        };

        this.onAdd = this.onAdd.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    onAdd() {
        const data = {
            name: this.state.name
        };
        this.state.onAdd(data);
        this.toggle();
    }

    handleChange(e) {
        this.setState({[e.target.id]: e.target.value});
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
                                <Label for="name">Назва</Label>
                                <Input value={this.state.name} onChange={this.handleChange} type="text" name="text" id="name" placeholder="Назва" />
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

export default PopUp;
import React, { Component } from 'react'
import {
    Button,
    ButtonToolbar,
    ButtonGroup,
    ButtonDropdown,
    Col,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Collapse,
    Container,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    Label,
    Pagination,
    PaginationItem,
    PaginationLink,
    Row,
    Table,
    Form,
    FormGroup,
    FormText
} from 'reactstrap'
import PagingButtons from './PagingButtons'

const eventsData = require('./fixtures/events.json')
const eventsPageInfo = require('./fixtures/pageInfo.json')

class EventsFilterForm extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    render() {
        return(
            <Card>
                <CardHeader>
                    <Button className="btn btn-outline-secondary text-dark" onClick={this.toggle}><strong>Filter Settings</strong></Button>
                </CardHeader>
                <Collapse isOpen={this.state.collapse}>
                    <CardBody>
                        <Form action="" method="post" className="form-horizontal">
                            <Container>
                            <Row>
                                <Col lg="6">
                                    <FormGroup>
                                        <Label htmlFor="text-input">Device-ID</Label>
                                        <Input type="text" id="deviceId" name="text-input" placeholder="Enter device ID..."/>
                                        <FormText className="help-block">Please enter the device ID</FormText>
                                    </FormGroup>
                                </Col>
                                <Col lg="3">
                                    <FormGroup>
                                        <Label htmlFor="text-input">O&D</Label>
                                        <Input type="text" id="location" name="text-input" placeholder="Enter IATA code of origin/destination..."/>
                                        <FormText className="help-block">Please enter IATA code of origin/destination...</FormText>
                                    </FormGroup>
                                </Col>
                                <Col lg="3">
                                    <FormGroup>
                                        <Label htmlFor="text-input">Platform</Label>
                                        <Input type="select" name="select" id="select">
                                            <option value="none">Please select</option>
                                            <option value="android">Android</option>
                                            <option value="ios">iOS</option>
                                        </Input>
                                        <FormText className="help-block">Select the device platform...</FormText>
                                    </FormGroup>
                                </Col>
                                </Row>
                            </Container>
                        </Form>
                    </CardBody>
                    <CardFooter>
                        <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Filter</Button>
                        <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                    </CardFooter>
                </Collapse>
            </Card>
        )
    }
}

const EventRows = (props) => {
    if (props.events.length > 0) {
        return (
            <tbody>
            {props.events.map((eventData, idx) =>
                <tr key={eventData.timestamp}>
                    <td>{eventData.recordingId}</td>
                    <td>{eventData.timestamp}</td>
                    <td>{eventData.event}</td>
                </tr>)}
            </tbody>)
    } else {
        return null
    }
}

class Events extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
        }
    }

    render() {
        const events = /*this.props.*/eventsData
        const pageInfo = /*this.props.*/eventsPageInfo
        console.log('eventsPageInfo: ', pageInfo)
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        <EventsFilterForm/>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Events
                            </CardHeader>
                            <CardBody>
                                <PagingButtons pageInfo={pageInfo} />
                                <Table hover bordered striped responsive size="sm">
                                    <thead>
                                    <tr>
                                        <th>Recording-ID</th>
                                        <th>Timestamp</th>
                                        <th>Event</th>
                                    </tr>
                                    </thead>
                                    <EventRows events={events} />
                                </Table>
                                <PagingButtons pageInfo={pageInfo} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Events

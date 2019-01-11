import React, {Component} from 'react';

import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from './Header';
import Sidebar from './Sidebar/';
// import Breadcrumb from './Breadcrumb';
import Aside from './Aside';
import Footer from './Footer';

// import Dashboard from './views/Dashboard';
import SensorRecords from './views/SensorRecords';
import Events from './views/Events';
import About from './views/About';
import ReleaseNotes from './views/ReleaseNotes';
import GettingStarted from './views/GettingStarted';
import Development from './views/Development';
import Support from './views/Support';
// import ConfigForm from './views/ConfigForm/';

class Main extends Component {
    render() {
        return (
            <div className="app">
                <Header />
                <div className="app-body">
                    <Sidebar {...this.props}/>
                    <main className="main">
                        {/* <x /> */}
                        <Container fluid>
                            <Switch>
                                {/* <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                                <Route path="/events" name="Events" component={Events}/> */}
                                <Route path="/children-table" name="Таблиця діти" component={SensorRecords}/>
                                {/* <Route path="/about" name="About" component={About}/>
                                <Route path="/release-notes" name="Release Notes" component={ReleaseNotes}/>
                                <Route path="/getting-started" name="Getting Started" component={GettingStarted}/>
                                <Route path="/development" name="Development" component={Development}/>
                                <Route path="/support" name="Support" component={Support}/>
                                <Route path="/config-form" name="Configuration" component={ConfigForm}/> */}
                                <Redirect from="/" to="/children-table"/>
                            </Switch>
                        </Container>
                    </main>
                    {/* <Aside /> */}
                </div>
                <Footer />
            </div>
        );
    }
}

export default Main;

import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';

import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import SensorRecords from "./containers/children-table/ChildrenTable";
import Users from "./containers/users/Users";
import Schools from "./containers/schools/Schools";
import Redirect from "react-router/es/Redirect";
import Switch from "react-router/es/Switch";

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store = { store }>
        <Router>
            <div>
              <Navbar />
                <div className="container">
                    <Switch>
                    <Route exact path="/children-table" component={ SensorRecords } />
                    <Route exact path="/users" component={ Users} />
                    <Route exact path="/schools" component={ Schools} />
                    <Route exact path="/register" component={ Register } />
                    <Route exact path="/login" component={ Login } />
                    <Redirect from="/" to="children-table" />
                    </Switch>
                </div>
            </div>
        </Router>
        </Provider>
    );
  }
}

export default App;

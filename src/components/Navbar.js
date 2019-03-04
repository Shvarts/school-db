import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';

class Navbar extends Component {

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const isAdmin = user.isAdmin === 'так';

        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <Button color="link" onClick={this.onLogout.bind(this)}>
                    {user.name} Вийти
                </Button >
            </ul>
        )
      const guestLinks = (
        <ul className="navbar-nav ml-auto">
            {/*<li className="nav-item">*/}
                {/*<Link className="nav-link" to="/register">Sign Up</Link>*/}
            {/*</li>*/}
            <li className="nav-item">
                <Link className="nav-link" to="/login">Вхід</Link>
            </li>
        </ul>
      )
        const adminLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/users">Користувачі</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/schools">Школи</Link>
                </li>
            </ul>
        )

        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/children-table">Головна</Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {isAdmin ? adminLinks : ''}
                </div>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {isAuthenticated ? authLinks : guestLinks}
                </div>
            </nav>
        )
    }
}
Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));
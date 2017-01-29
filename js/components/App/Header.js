import React from 'react';
import Relay from 'react-relay';
import {browserHistory} from 'react-router';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import Login from './Login';
import Register from './Register';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.goToGraphiQL = this.goToGraphiQL.bind(this);
        this.goHome = this.goHome.bind(this);
    }

    goToGraphiQL() {
        browserHistory.push('/graphiql');
    }

    goHome() {
        browserHistory.push('/');
    }

    render() {
        return (
            <Navbar style={styles.navbar}>
              <Navbar.Header>
                <Navbar.Brand>
                  <a href="/">Scaphold</a>
                </Navbar.Brand>
              </Navbar.Header>
              <Nav pullRight={true}>
                <NavItem onClick={this.goHome}>Home</NavItem>
                {/*<NavItem onClick={this.goToGraphiQL}>GraphiQL</NavItem>*/}
                <Login />
                <Register />
              </Nav>
            </Navbar>
        );
    }
}

export default Relay.createContainer(Header, {
    fragments: {
    }
});

const styles = {
    navbar: {
        marginBottom: 0
    }
};

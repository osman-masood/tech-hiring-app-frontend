import React from 'react';
import Relay from 'react-relay';
import {browserHistory} from 'react-router';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import Logout from './Logout';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.goToGraphiQL = this.goToGraphiQL.bind(this);
        this.goHome = this.goHome.bind(this);
    }

    //noinspection JSMethodCanBeStatic
    goToGraphiQL() {
        browserHistory.push('/graphiql');
    }

    //noinspection JSMethodCanBeStatic
    goHome() {
        browserHistory.push('/');
    }

    //noinspection JSMethodCanBeStatic
    render() {
        const user = JSON.parse(localStorage.getItem('user'));
        const loggedInUser = user ? user.username : '';

        return (
            <Navbar style={styles.navbar}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">PadawanHire</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav pullRight={true}>
                    {/*<NavItem onClick={this.goHome}>Home</NavItem>*/}
                    <NavItem>{loggedInUser}</NavItem>
                <Logout />
              </Nav>
            </Navbar>
        );
    }
}

export default Relay.createContainer(Header, {
    fragments: {}
});

const styles = {
    navbar: {
        marginBottom: 0
    }
};

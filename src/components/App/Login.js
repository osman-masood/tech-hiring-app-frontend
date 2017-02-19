import React from 'react';
import Relay from 'react-relay';
import { browserHistory } from 'react-router';
import { Button, Modal, OverlayTrigger, NavItem, Form, FormControl, FormGroup, Row, Col, ControlLabel, Alert } from 'react-bootstrap';
import * as Auth from './../../auth/Auth';
import config from './../../../config';

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            loginEmail: '',
            loginPassword: '',
            errors: null
        };

        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this._handleLoginEmailChange = this._handleLoginEmailChange.bind(this);
        this._handleLoginPasswordChange = this._handleLoginPasswordChange.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.loginUser = this.loginUser.bind(this);
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    _handleLoginEmailChange(e) {
        this.setState({
            loginEmail: e.target.value
        });
    }

    _handleLoginPasswordChange(e) {
        this.setState({
            loginPassword: e.target.value
        });
    }

    validateInput() {
        return (
            this.state.loginEmail && this.state.loginEmail.length &&
            this.state.loginPassword && this.state.loginPassword.length
        );
    }

    loginUser() {
        if (this.validateInput()) {
            Auth.login(this.state.loginEmail, this.state.loginPassword).then(data => {
                if (!data.errors) {
                    localStorage.setItem('scapholdAuthToken', data.loginUser.token);
                    localStorage.setItem('user', JSON.stringify(data.loginUser.user));
                    this.setState({ errors: [] });
                    browserHistory.push('/home');
                } else {
                    this.setState({ errors: data.errors });
                }
            }).catch(errors => {
                this.setState({ errors });
            });
        } else {
            this.setState({
                errors: 'Username or password was not filled out. Please fill out the required fields.'
            });
        }
    }

    render() {
        return (
            <NavItem onClick={this.open}>
                Login

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login Here!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={styles.errors}>
                            {
                                this.state.errors ?
                                    <Alert bsStyle="danger">{this.state.errors}</Alert> : ''
                            }
                        </div>
                        <Form horizontal>
                            <FormGroup>
                                <Col componentClass={ControlLabel} smOffset={1} sm={2}>
                                    Email
                                </Col>
                                <Col sm={8}>
                                    <FormControl type="email" placeholder="Email" onChange={this._handleLoginEmailChange} />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col componentClass={ControlLabel} smOffset={1} sm={2}>
                                    Password
                                </Col>
                                <Col sm={8}>
                                    <FormControl type="password" placeholder="Password" onChange={this._handleLoginPasswordChange} />
                                </Col>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="primary" type="submit" onClick={this.loginUser}>Login</Button>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </NavItem>
        );
    }
}

const styles = {
    errors: {
        textAlign: 'left',
        color: 'red'
    }
};

export default Relay.createContainer(Login, {
    fragments: {}
});

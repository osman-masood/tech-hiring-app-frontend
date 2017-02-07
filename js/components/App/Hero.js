import React from 'react';
import Relay from 'react-relay';
import { browserHistory } from 'react-router';
import FontAwesome from 'react-fontawesome';
import { Button, Jumbotron, Modal, OverlayTrigger, NavItem, Form, FormControl, FormGroup, Row, Col, ControlLabel, Alert } from 'react-bootstrap';
import * as Auth from './../../auth/Auth';
import config from './../../../config';

class Hero extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loginEmail: '',
            loginPassword: '',
            errors: null
        };

        this._handleLoginEmailChange = this._handleLoginEmailChange.bind(this);
        this._handleLoginPasswordChange = this._handleLoginPasswordChange.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.loginUser = this.loginUser.bind(this);
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
        console.log("Hero.loginUser: Called with state: ", this.state);
        if (this.validateInput()) {
            console.log("Hero.loginUser: validateInput passed, state: ", this.state);
            Auth.login(this.state.loginEmail, this.state.loginPassword).then(data => {
                console.log("Hero.loginUser: Auth.login, state: ", this.state, "data", data);
                if (!data.errors) {
                    console.log("Hero.loginUser: Login successful, state: ", this.state);
                    localStorage.setItem('scapholdAuthToken', data.loginUser.token);
                    localStorage.setItem('user', JSON.stringify(data.loginUser.user));
                    this.setState({ errors: [] });
                    browserHistory.push('/home');
                } else {
                    console.log("Hero.loginUser: Login unsuccessful, state: ", this.state);
                    this.setState({ errors: data.errors });
                }
            }).catch(errors => {
                console.log("Hero.loginUser: Auth.login through exception, state: ", this.state, "errors", errors);
                this.setState({ errors });
            });
        } else {
            console.log("Hero.loginUser: validateInput failed, state: ", this.state);
            this.setState({
                errors: 'Username or password was not filled out. Please fill out the required fields.'
            });
        }
    }

    render() {
        return (
            <Row>
                <Col smOffset={2} sm={8}>
                    <Jumbotron style={styles.jumbotron}>
                        <h1>Welcome!</h1>
                        <br />
                        <p>
                            Login to PadawanHire, you will.
                            &nbsp;<FontAwesome name="hand-paper-o" />
                        </p>
                        <br />
                        { this.renderLoginForm() }
                        <p>

                            {/*<Button bsStyle="primary" bsSize="large" target="_blank" href="/login">Login <FontAwesome name="check" /></Button>*/}
                            {/*<Button style={styles.slack} bsSize="large" target="_blank" href="https://scapholdslackin.herokuapp.com/">Join our Slack <FontAwesome name="slack" /></Button>*/}
                        </p>
                    </Jumbotron>
                </Col>
            </Row>
        );
    }

    renderLoginForm() {
        return (<div>
            <div style={styles.errors}>
                {
                    this.state.errors ?
                        <Alert bsStyle="danger">{this.state.errors}</Alert> : ''
                }
            </div>
            <Form horizontal>
                <FormGroup bsSize="large">
                    <Col componentClass={ControlLabel} smOffset={1} sm={2}>
                        Email
                    </Col>
                    <Col sm={8}>
                        <FormControl type="email" placeholder="Email" onChange={this._handleLoginEmailChange} />
                    </Col>
                </FormGroup>

                <FormGroup bsSize="large">
                    <Col componentClass={ControlLabel} smOffset={1} sm={2}>
                        Password
                    </Col>
                    <Col sm={8}>
                        <FormControl type="password" placeholder="Password" onChange={this._handleLoginPasswordChange} />
                    </Col>
                </FormGroup>
            </Form>
            <Button bsStyle="primary" type="submit" onClick={this.loginUser}>Login</Button>
        </div>);
    }

}

export default Relay.createContainer(Hero, {
    fragments: {
    }
});

const styles = {
    jumbotron: {
        marginTop: 20,
        borderRadius: 10,
        textAlign: 'center'
    },
    scaphold: {
        color: '#1DAAA0'
    },
    slack: {
        color: 'white',
        backgroundColor: '#1DAAA0'
    },
    errors: {
        textAlign: 'left',
        color: 'red'
    }
};

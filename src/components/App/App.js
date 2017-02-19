import React from 'react';
import Relay from 'react-relay';
import {Row, Col, Button, Jumbotron} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import Header from './Header';
import Hero from './Hero';
import Footer from './Footer';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    //noinspection JSMethodCanBeStatic
    componentWillMount() {
        if (localStorage.scapholdAuthToken) {
            browserHistory.push('/home');
        }
    }

    //noinspection JSMethodCanBeStatic
    render() {
        return (
            <div>
                <Header />
                <Hero />
                <Footer />
            </div>
        );
    }
}

export default Relay.createContainer(App, {
    fragments: {}
});

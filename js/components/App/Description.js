import React from 'react';
import Relay from 'react-relay';
import {Row, Col} from 'react-bootstrap';

class Description extends React.Component {
    //noinspection JSMethodCanBeStatic
    render() {
        return (
            <Row style={styles.marketing}>
              <Col smOffset={2} sm={4}>
                <h4 style={styles.marketing.h4}><a target="_blank" href="https://facebook.github.io/react/">React.js Boilerplate</a></h4>
                <p style={styles.marketing.p}>This React.js boilerplate helps developers create modern, performant, and clean web apps with the help of Scaphold.io.</p>

                <h4 style={styles.marketing.h4}><a target="_blank" href="https://facebook.github.io/relay/">React-Relay</a></h4>
                <p style={styles.marketing.p}>Leverage the simplicity and power of Relay and GraphQL to manage your application's data store.</p>
              </Col>

              <Col sm={4}>
                <h4 style={styles.marketing.h4}><a target="_blank" href="https://react-bootstrap.github.io/">React-Bootstrap</a></h4>
                <p style={styles.marketing.p}>Smoothe and creative components to fit the way you want your apps to be experienced.</p>

                <h4 style={styles.marketing.h4}><a target="_blank" href="https://webpack.github.io/docs/list-of-tutorials.html">Webpack</a></h4>
                <p style={styles.marketing.p}>Webpack is a module bundler that helps you serve your application in any environment with hot reloading.</p>
              </Col>
            </Row>
        );
    }
}

export default Relay.createContainer(Description, {
    fragments: {
    }
});

const styles = {
    marketing: {
        margin: '40px 0',
        p: {
            marginTop: 28
        },
        h4: {
            marginTop: 28
        }
    }
};

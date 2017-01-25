import React from 'react';
import Relay from 'react-relay';
import {Button} from 'react-bootstrap';
import {hashHistory} from 'react-router';
import Header from './Header';
import Body from './Body';

class Home extends React.Component {
    //noinspection JSUnusedGlobalSymbols
    static propTypes = {
        viewer: React.PropTypes.object.isRequired,
        relay: React.PropTypes.object.isRequired,
    };

    //noinspection JSMethodCanBeStatic
    render() {
        console.log("Home.render() called with props", this.props);
        if (!localStorage.scapholdAuthToken) {
            hashHistory.push('/');
        }

        return (
            <div>
                <Header />
                <Body allCandidateInfos={this.props.viewer.allCandidateInfos}/>
            </div>
        );
    }
}

export default Relay.createContainer(Home, {
    initialVariables: {},
    fragments: {
        viewer: () => Relay.QL`
            fragment on Viewer {
                allCandidateInfos(first: 10) {
                    edges {
                        node {
                            id
                            user {
                                id
                                fullName
                                thumbnailUrl
                            }
                            githubUsername
                            hackerRankUsername
                            codeFightsUsername
                        }
                    }
                }
            }
`
}});

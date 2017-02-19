import React from 'react';
import Relay from 'react-relay';
import {Button} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import Header from './Header';
import Search from './Search';

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
            browserHistory.push('/');
        }

        return (
            <div>
                <Header />
                <Search allCandidateInfos={this.props.viewer.allCandidateInfos}/>
            </div>
        );
    }
}

// TODO: Instead of getting all candidate infos and passing it into Search, we need Search to have its own fragment and variables.

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
                            githubRepoInfos
                            githubEventInfos
                            hackerRankUsername
                            hackerRankInfo
                            codeFightsUsername
                        }
                    }
                }
            }
`
}

});

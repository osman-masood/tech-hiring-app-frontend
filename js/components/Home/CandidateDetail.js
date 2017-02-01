/**
 * Created by osman on 1/26/17.
 *
 * @flow
 */

import React from 'react';
import Relay from 'react-relay';
import {browserHistory} from 'react-router';
import Header from './Header';
import {Row, Col, Button, FormControl, FormGroup, ControlLabel, Well, Image} from 'react-bootstrap';
const ReactHighcharts = require('react-highcharts');
const HighchartsMore = require('highcharts-more');
const reactjsAdminlte = require('adminlte-reactjs');
const InfoTile = reactjsAdminlte.InfoTile;
const Box = reactjsAdminlte.Box;
const ProgressBar = reactjsAdminlte.ProgressBar;
import moment from 'moment';

class CandidateDetail extends React.Component {
    //noinspection JSUnusedGlobalSymbols
    static propTypes = {
        user: React.PropTypes.object.isRequired,
        relay: React.PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.props.relay.setVariables({userId: this.props.params.userId});
        console.log("CandidateDetail.constructor() called with props", this.props);
    }

    //noinspection JSMethodCanBeStatic
    render() {
        console.log("CandidateDetail.render() called with props", this.props);
        if (!localStorage.scapholdAuthToken) {
            browserHistory.push('/');
        }

        const joinedCurrentYear = new Date(this.props.user.createdAt).getUTCFullYear() === new Date().getUTCFullYear();
        const joinedDate = moment(this.props.user.createdAt).format('MMMM D' + (joinedCurrentYear ? '' : ', YYYY'));

        return (
            <div>
                <Header />

                <div className="content-wrapper" style={{marginLeft: 0}}>
                    <section className="content-header">
                        <h1>
                            <span>{this.props.user.fullName || this.props.user.username}</span><small>Joined {joinedDate}</small>
                        </h1>
                    </section>
                    <section className="content">
                        <Row>
                            <InfoTile
                                width={3}
                                content=''
                                icon='fa-envelope-o'
                                stats='1,410'
                                subject='Repos'
                                theme='bg-aqua'>

                                {/*<ProgressBar percent={10} description='50% Increase in 30 Days' color='white' />*/}
                            </InfoTile>
                            <InfoTile width={3} content = '' icon = 'fa-thumbs-o-up' stats = '41,410' subject = 'Likes' theme = 'bg-green' >
                                {/*<ProgressBar percent={50} description = '50% Increase in 30 Days' color = 'white' />*/}
                            </InfoTile>
                            <InfoTile
                                width={3}
                                content=''
                                icon='fa-envelope-o'
                                stats='1,410'
                                subject='Messages'
                                theme='bg-aqua'/>
                            <InfoTile
                                width={3}
                                content=''
                                icon='fa-envelope-o'
                                stats='1,410'
                                subject='Messages'
                                theme='bg-aqua'/>
                        </Row>
                        <Row>
                            <Box
                                width = {3}
    border={true}
    content = 'The body of the box'
    theme = 'box-default'
    title = 'Expandable'
    collapsed={true}
    boxTools = {['expand']}
/>
                        </Row>
                    </section>
                </div>
            </div>
        );
    }
}

export default Relay.createContainer(CandidateDetail, {
    initialVariables: {userId: ""},
    fragments: {
        user: () => Relay.QL`
            fragment on User {
                fullName
                username
                thumbnailUrl
                modifiedAt
                createdAt

                candidateInfo {
                    githubUsername
                    githubRepoInfos
                    hackerRankUsername
                    codeFightsUsername
                    modifiedAt
                    createdAt
                }
            }
`
    }});

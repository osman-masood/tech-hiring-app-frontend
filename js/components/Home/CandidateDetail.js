/**
 * Created by osman on 1/26/17.
 *
 * @flow
 */

import React from 'react';
import Relay from 'react-relay';
import {browserHistory} from 'react-router';
import Header from './Header';
import {Row, Col, Button, FormControl, ButtonToolbar, FormGroup, ControlLabel, Well, Image} from 'react-bootstrap';
const ReactHighcharts = require('react-highcharts');
const HighchartsMore = require('highcharts-more');
HighchartsMore(ReactHighcharts.Highcharts);
const reactjsAdminlte = require('adminlte-reactjs');
const InfoTile = reactjsAdminlte.InfoTile;
// const Box = reactjsAdminlte.CustomBox;
const ProgressBar = reactjsAdminlte.ProgressBar;
const StatTile = reactjsAdminlte.StatTile;
import moment from 'moment';

const getGithubReposUrl = (githubUsername) => githubUsername ? `https://github.com/${githubUsername}?tab=repositories` : null;
const getGithubOverviewUrl = (githubUsername) => githubUsername ? `https://github.com/${githubUsername}` : null;
const getHackerRankUrl = (hackerRankUsername) => hackerRankUsername ? `https://www.hackerrank.com/${hackerRankUsername}` : null;

const spiderGraphConfig = {

    chart: {
        polar: true,
        type: 'line'
    },

    title: {
        text: '',
        x: -80
    },

    // pane: {
    //     size: '80%'
    // },

    xAxis: {
        categories: ['C', 'C++', 'Java', 'Python', 'JS', 'C#', 'iOS', 'React', 'Angular', 'Bootstrap', 'CSS', 'HTML'],
        tickmarkPlacement: 'on',
        lineWidth: 0
    },

    yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0
    },

    tooltip: {
        shared: true,
        pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
    },

    legend: {
        enabled: false
    },

    exporting: {
        enabled: false
    },

    series: [{
        name: '',
        data: [43000, 19000, 60000, 35000, 17000, 10000, 9000, 12000, 4000, 6000, 7000, 13000],
        pointPlacement: 'on'
    }],

    credits: {
        enabled: false
    }
};

const highchartsConfig = {
    chart: {
        polar: true,
        height: 150,
        backgroundColor: '#f5f5f5',
        plotBackgroundColor: '#f5f5f5',
        plotBorderColor: '#f5f5f5',
    },
    backgroundColor: '#f5f5f5',
    borderColor: '#f5f5f5',
    title: null,
    xAxis: {
        categories: ['C', 'C++', 'Java', 'Python', 'JS', 'C#', 'iOS', 'React', 'Angular', 'Bootstrap', 'CSS', 'HTML']
    },
    series: [{
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
    }],
    credits: {
        enabled: false
    },
    legend: {
        enabled: false
    },
    exporting: {
        enabled: false
    },
    pane: {
        background: {
            backgroundColor: '#f5f5f5',
            borderColor: '#f5f5f5',
        }
    }
};

const skillSetGraphConfig = {
    chart: {
        type: 'column'
    },

    title: {
        text: ''
    },

    yAxis: {
        categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
    },

    xAxis: {
        allowDecimals: false,
        min: 0,
        title: {
            text: 'Number of fruits'
        }
    },
    //
    // tooltip: {
    //     formatter: function () {
    //         return '<b>' + this.x + '</b><br/>' +
    //             this.series.name + ': ' + this.y + '<br/>' +
    //             'Total: ' + this.point.stackTotal;
    //     }
    // },

    // plotOptions: {
    //     column: {
    //         stacking: 'normal'
    //     }
    // },

    series: [{
        name: 'John',
        data: [5, 3, 4, 7, 2],
        // stack: 'male'
    }
    ]
};


class CandidateDetail extends React.Component {
    //noinspection JSUnusedGlobalSymbols
    static propTypes = {
        user: React.PropTypes.object.isRequired,
        job: React.PropTypes.object.isRequired,
        relay: React.PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.props.relay.setVariables({userId: this.props.params.userId, jobId: this.props.params.jobId});
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
        const hackerRankInfo = JSON.parse(this.props.user.hackerRankInfo || "{}");
        const hackerRankEventCount = hackerRankInfo.profile ? hackerRankInfo.profile.model.event_count : 'N/A';

        // Set HackerRank scores
        let hackerRankGeneralScorePercentile = 0;
        let hackerRankPercentileDescription = "No HackerRank profile";
        if (hackerRankInfo.scoresElo) {
            hackerRankGeneralScorePercentile = hackerRankInfo.scoresElo.filter(scoreElo => scoreElo.slug === "general").map(scoreElo => scoreElo.contest.percentile);
            hackerRankGeneralScorePercentile = parseInt(hackerRankGeneralScorePercentile.length ? hackerRankGeneralScorePercentile[0] : 0);
            hackerRankPercentileDescription = hackerRankGeneralScorePercentile ? hackerRankGeneralScorePercentile + ' percentile' : "General percentile N/A";
        }

        // Github information
        const numGithubRepos = this.props.user.candidateInfo.githubRepoInfos ? this.props.user.candidateInfo.githubRepoInfos.length : 'N/A';
        const githubRepoProgressBarDescription = this.props.user.candidateInfo.githubRepoInfos ? (numGithubRepos + " repos") : "No Github profile";
        const githubEventLength = this.props.user.candidateInfo.githubEventInfos ? this.props.user.candidateInfo.githubEventInfos.length : "N/A";
        const githubEventProgressBarDescription = this.props.user.candidateInfo.githubEventInfos ? this.props.user.candidateInfo.githubEventInfos.length + " activities" : "No Github activities";

        // TODO ideas for charts: http://www.highcharts.com/demo/polar (area graphs for GH + CF + etc, with particular language/skill for each axis)
        // OR: http://www.highcharts.com/demo/polar-spider
        // Also, graph of activity over time for each service: http://www.highcharts.com/demo/line-basic

        const isLiked = false;
        const isHidden = false;

        return (
            <Row>
                <Header />
                <Row className="content-wrapper" style={{marginLeft: 0}}>
                    <section className="content-header">
                        <h1>
                            <span>{this.props.user.fullName || this.props.user.username}</span>
                            <small>Joined {joinedDate}</small>
                            <a className={"btn btn-app" + (isLiked ? " bg-green" : "")} style={styles.topButtons}>
                                <i className="fa fa-heart-o" />
                                { isLiked ? "Liked": "Like" }
                            </a>
                            <a className={"btn btn-app" + (isLiked ? " bg-gray" : "")} style={styles.topButtons}>
                                <i className="fa fa-archive"/>
                                {isHidden ? "Hidden" : "Don't show"}
                            </a>
                            <a className="btn btn-app" style={styles.topButtons}>
                                <i className="fa fa-phone"/> Call Padawan
                            </a>
                            <a className="btn btn-app" style={styles.topButtons}>
                                <i className="fa fa-calendar-plus-o"/> Schedule Call
                            </a> {/* fa-calendar-check-o is for "Call Scheduled */}
                        </h1>
                    </section>
                    <section className="content">
                        <Row>
                            <StatTile
                                width={3}
                                icon='fa-bullseye'
                                stats={ "20" }
                                subject='Relevancy Score'
                                theme='bg-red'>
                            </StatTile>
                            <StatTile
                                width={3}
                                icon='fa-bolt'
                                stats={ "0" }
                                subject='Overall Tech Skill'
                                theme='bg-yellow'>

                            </StatTile>
                            <StatTile
                                width={3}
                                icon='fa-university'
                                stats={ "3.5" }
                                subject='GPA'
                                theme='bg-green'>

                                {/*<ProgressBar percent={githubEventLength / 100} description={githubEventProgressBarDescription} color='white' />*/}
                            </StatTile>
                            <StatTile
                                width={3}
                                icon='fa-bookmark'
                                stats={ "0" }
                                subject='Reference Score'
                                theme='bg-blue'>

                            </StatTile>
                        </Row>

                        <Row>
                            <Col md={4}>
                                <div className="box">
                                    <div className="box-header with-border">
                                        <h3 className="box-title">Relevancy Graph</h3>

                                        <div className="box-tools pull-right">
                                            <button type="button" className="btn btn-box-tool"><i className="fa fa-minus"/>
                                            </button>
                                            <div className="btn-group">
                                                <button type="button" className="btn btn-box-tool dropdown-toggle">
                                                    <i className="fa fa-wrench"/></button>
                                                <ul className="dropdown-menu" role="menu">
                                                    <li><a href="#">Action</a></li>
                                                    <li><a href="#">Another action</a></li>
                                                    <li><a href="#">Something else here</a></li>
                                                    <li className="divider"/>
                                                    <li><a href="#">Separated link</a></li>
                                                </ul>
                                            </div>
                                            <button type="button" className="btn btn-box-tool"><i className="fa fa-times"/></button>
                                        </div>
                                    </div>
                                    <div className="box-body" style={{display: "block"}}>
                                        <div className="row">
                                            <div className="col-md-12">
                                                {/*<p className="text-center">*/}
                                                {/*<strong>Sales: 1 Jan, 2014 - 30 Jul, 2014</strong>*/}
                                                {/*</p>*/}

                                                <ReactHighcharts config={spiderGraphConfig} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="box">
                                    <div className="box-header with-border">
                                        <h3 className="box-title">Skill Graph</h3>

                                        <div className="box-tools pull-right">
                                            <button type="button" className="btn btn-box-tool"><i className="fa fa-minus"/>
                                            </button>
                                            <div className="btn-group">
                                                <button type="button" className="btn btn-box-tool dropdown-toggle">
                                                    <i className="fa fa-wrench"/></button>
                                                <ul className="dropdown-menu" role="menu">
                                                    <li><a href="#">Action</a></li>
                                                    <li><a href="#">Another action</a></li>
                                                    <li><a href="#">Something else here</a></li>
                                                    <li className="divider"/>
                                                    <li><a href="#">Separated link</a></li>
                                                </ul>
                                            </div>
                                            <button type="button" className="btn btn-box-tool"><i className="fa fa-times"/></button>
                                        </div>
                                    </div>
                                    <div className="box-body" style={{display: "block"}}>
                                        <div className="row">
                                            <div className="col-md-12">
                                                {/*<p className="text-center">*/}
                                                {/*<strong>Sales: 1 Jan, 2014 - 30 Jul, 2014</strong>*/}
                                                {/*</p>*/}

                                                <ReactHighcharts config={spiderGraphConfig} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="box">
                                    <div className="box-header with-border">
                                        <h3 className="box-title">Skill Chart</h3>

                                        <div className="box-tools pull-right">
                                            <button type="button" className="btn btn-box-tool"><i className="fa fa-minus"/>
                                            </button>
                                            <div className="btn-group">
                                                <button type="button" className="btn btn-box-tool dropdown-toggle">
                                                    <i className="fa fa-wrench"/></button>
                                                <ul className="dropdown-menu" role="menu">
                                                    <li><a href="#">Action</a></li>
                                                    <li><a href="#">Another action</a></li>
                                                    <li><a href="#">Something else here</a></li>
                                                    <li className="divider"/>
                                                    <li><a href="#">Separated link</a></li>
                                                </ul>
                                            </div>
                                            <button type="button" className="btn btn-box-tool"><i className="fa fa-times"/></button>
                                        </div>
                                    </div>
                                    <div className="box-body" style={{display: "block"}}>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <ReactHighcharts config={skillSetGraphConfig} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>


                        <Row>
                            <div className="col-md-12">

                                <div className="box box-warning direct-chat direct-chat-warning">
                                    <div className="box-header with-border">
                                        <h3 className="box-title">Notes</h3>

                                        <div className="box-tools pull-right">
                                            <span title="3 New Messages" className="badge bg-yellow">3</span>
                                            <button type="button" className="btn btn-box-tool"><i className="fa fa-minus"/>
                                            </button>
                                            <button type="button" className="btn btn-box-tool"><i className="fa fa-times"/>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="box-body">
                                        <div className="direct-chat-messages">
                                            <div className="direct-chat-msg">
                                                <div className="direct-chat-info clearfix">
                                                    <span className="direct-chat-name pull-left">Alexander Pierce</span>
                                                    <span className="direct-chat-timestamp pull-right">23 Jan 2:00 pm</span>
                                                </div>

                                                <img className="direct-chat-img" src="http://lorempixel.com/128/128/" alt="message user image" />
                                                <div className="direct-chat-text">
                                                    Is this template really for free? That's unbelievable!
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="box-footer">
                                        <form action="#" method="post">
                                            <div className="input-group">
                                                <input type="text" name="message" placeholder="Type Message ..." className="form-control" />
                                                <span className="input-group-btn">
                                                            <button type="button" className="btn btn-warning btn-flat">Save</button>
                                                        </span>
                                            </div>
                                        </form>
                                    </div>

                                </div>

                            </div>
                        </Row>



                        <Row>
                            <div className="col-md-12">

                                <div className="box box-warning direct-chat direct-chat-warning">
                                    <div className="box-header with-border">
                                        <h3 className="box-title">Direct Chat</h3>

                                        <div className="box-tools pull-right">
                                            <span title="3 New Messages" className="badge bg-yellow">3</span>
                                            <button type="button" className="btn btn-box-tool"><i className="fa fa-minus"/>
                                            </button>
                                            <button type="button" className="btn btn-box-tool"><i className="fa fa-times"/>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="box-body">
                                        <div className="direct-chat-messages">
                                            <div className="direct-chat-msg">
                                                <div className="direct-chat-info clearfix">
                                                    <span className="direct-chat-name pull-left">Alexander Pierce</span>
                                                    <span className="direct-chat-timestamp pull-right">23 Jan 2:00 pm</span>
                                                </div>

                                                <img className="direct-chat-img" src="http://lorempixel.com/128/128/" alt="message user image" />
                                                <div className="direct-chat-text">
                                                    Is this template really for free? That's unbelievable!
                                                </div>
                                            </div>
                                            <div className="direct-chat-msg right">
                                                <div className="direct-chat-info clearfix">
                                                    <span className="direct-chat-name pull-right">Sarah Bullock</span>
                                                    <span className="direct-chat-timestamp pull-left">23 Jan 2:05 pm</span>
                                                </div>

                                                <img className="direct-chat-img" src="http://lorempixel.com/128/128/" alt="message user image" />
                                                <div className="direct-chat-text">
                                                    You better believe it!
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="box-footer">
                                        <form action="#" method="post">
                                            <div className="input-group">
                                                <input type="text" name="message" placeholder="Type Message ..." className="form-control" />
                                                <span className="input-group-btn">
                                                            <button type="button" className="btn btn-warning btn-flat">Save</button>
                                                        </span>
                                            </div>
                                        </form>
                                    </div>

                                </div>

                            </div>
                        </Row>


                        <div className="row">

                            <div className="col-md-6">

                                <div className="box box-info">
                                    <div className="box-header with-border">
                                        <h3 className="box-title">Padawan Activity</h3>

                                        <div className="box-tools pull-right">
                                            <button type="button" className="btn btn-box-tool"><i className="fa fa-minus"/>
                                            </button>
                                            <button type="button" className="btn btn-box-tool"><i className="fa fa-times"/></button>
                                        </div>
                                    </div>

                                    <div className="box-body">
                                        <div className="table-responsive">
                                            <table className="table no-margin">
                                                <thead>
                                                <tr>
                                                    <th>Order ID</th>
                                                    <th>Item</th>
                                                    <th>Status</th>
                                                    <th>Popularity</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td><a href="pages/examples/invoice.html">OR9842</a></td>
                                                    <td>Call of Duty IV</td>
                                                    <td><span className="label label-success">Shipped</span></td>
                                                    <td>
                                                        <div className="sparkbar">
                                                            {/*<canvas width="34" height="20" style={{display: "inline-block", width: 34, height: 20, verticalAlign: "top"}}></canvas>*/}
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><a href="pages/examples/invoice.html">OR1848</a></td>
                                                    <td>Samsung Smart TV</td>
                                                    <td><span className="label label-warning">Pending</span></td>
                                                    <td>
                                                        <div className="sparkbar">
                                                            {/*<canvas width="34" height="20" style="display: inline-block; width: 34px; height: 20px; vertical-align: top;"></canvas>*/}
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><a href="pages/examples/invoice.html">OR7429</a></td>
                                                    <td>iPhone 6 Plus</td>
                                                    <td><span className="label label-danger">Delivered</span></td>
                                                    <td>
                                                        <div className="sparkbar">
                                                            {/*<canvas width="34" height="20" style="display: inline-block; width: 34px; height: 20px; vertical-align: top;"></canvas>*/}
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><a href="pages/examples/invoice.html">OR7429</a></td>
                                                    <td>Samsung Smart TV</td>
                                                    <td><span className="label label-info">Processing</span></td>
                                                    <td>
                                                        <div className="sparkbar">
                                                            {/*<canvas width="34" height="20" style="display: inline-block; width: 34px; height: 20px; vertical-align: top;"></canvas>*/}
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><a href="pages/examples/invoice.html">OR1848</a></td>
                                                    <td>Samsung Smart TV</td>
                                                    <td><span className="label label-warning">Pending</span></td>
                                                    <td>
                                                        <div className="sparkbar">
                                                            {/*<canvas width="34" height="20" style="display: inline-block; width: 34px; height: 20px; vertical-align: top;"></canvas>*/}
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><a href="pages/examples/invoice.html">OR7429</a></td>
                                                    <td>iPhone 6 Plus</td>
                                                    <td><span className="label label-danger">Delivered</span></td>
                                                    <td>
                                                        <div className="sparkbar">
                                                            {/*<canvas width="34" height="20" style="display: inline-block; width: 34px; height: 20px; vertical-align: top;"></canvas>*/}
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><a href="pages/examples/invoice.html">OR9842</a></td>
                                                    <td>Call of Duty IV</td>
                                                    <td><span className="label label-success">Shipped</span></td>
                                                    <td>
                                                        <div className="sparkbar">
                                                            {/*<canvas width="34" height="20" style="display: inline-block; width: 34px; height: 20px; vertical-align: top;"></canvas>*/}
                                                        </div>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>

                                    <div className="box-footer clearfix">
                                        <a href="javascript:void(0)" className="btn btn-sm btn-info btn-flat pull-left">Place New Order</a>
                                        <a href="javascript:void(0)" className="btn btn-sm btn-default btn-flat pull-right">View All Orders</a>
                                    </div>

                                </div>

                            </div>


                            <div className="col-md-6">

                                <div className="box box-info">
                                    <div className="box-header with-border">
                                        <h3 className="box-title">Hiring Manager Activity</h3>

                                        <div className="box-tools pull-right">
                                            <button type="button" className="btn btn-box-tool"><i className="fa fa-minus"/>
                                            </button>
                                            <button type="button" className="btn btn-box-tool"><i className="fa fa-times"/></button>
                                        </div>
                                    </div>

                                    <div className="box-body">
                                        <div className="table-responsive">
                                            <table className="table no-margin">
                                                <thead>
                                                <tr>
                                                    <th>Order ID</th>
                                                    <th>Item</th>
                                                    <th>Status</th>
                                                    <th>Popularity</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td><a href="pages/examples/invoice.html">OR9842</a></td>
                                                    <td>Call of Duty IV</td>
                                                    <td><span className="label label-success">Shipped</span></td>
                                                    <td>
                                                        <div className="sparkbar">
                                                            {/*<canvas width="34" height="20" style={{display: "inline-block", width: 34, height: 20, verticalAlign: "top"}}></canvas>*/}
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><a href="pages/examples/invoice.html">OR1848</a></td>
                                                    <td>Samsung Smart TV</td>
                                                    <td><span className="label label-warning">Pending</span></td>
                                                    <td>
                                                        <div className="sparkbar">
                                                            {/*<canvas width="34" height="20" style="display: inline-block; width: 34px; height: 20px; vertical-align: top;"></canvas>*/}
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><a href="pages/examples/invoice.html">OR7429</a></td>
                                                    <td>iPhone 6 Plus</td>
                                                    <td><span className="label label-danger">Delivered</span></td>
                                                    <td>
                                                        <div className="sparkbar">
                                                            {/*<canvas width="34" height="20" style="display: inline-block; width: 34px; height: 20px; vertical-align: top;"></canvas>*/}
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><a href="pages/examples/invoice.html">OR7429</a></td>
                                                    <td>Samsung Smart TV</td>
                                                    <td><span className="label label-info">Processing</span></td>
                                                    <td>
                                                        <div className="sparkbar">
                                                            {/*<canvas width="34" height="20" style="display: inline-block; width: 34px; height: 20px; vertical-align: top;"></canvas>*/}
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><a href="pages/examples/invoice.html">OR1848</a></td>
                                                    <td>Samsung Smart TV</td>
                                                    <td><span className="label label-warning">Pending</span></td>
                                                    <td>
                                                        <div className="sparkbar">
                                                            {/*<canvas width="34" height="20" style="display: inline-block; width: 34px; height: 20px; vertical-align: top;"></canvas>*/}
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><a href="pages/examples/invoice.html">OR7429</a></td>
                                                    <td>iPhone 6 Plus</td>
                                                    <td><span className="label label-danger">Delivered</span></td>
                                                    <td>
                                                        <div className="sparkbar">
                                                            {/*<canvas width="34" height="20" style="display: inline-block; width: 34px; height: 20px; vertical-align: top;"></canvas>*/}
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><a href="pages/examples/invoice.html">OR9842</a></td>
                                                    <td>Call of Duty IV</td>
                                                    <td><span className="label label-success">Shipped</span></td>
                                                    <td>
                                                        <div className="sparkbar">
                                                            {/*<canvas width="34" height="20" style="display: inline-block; width: 34px; height: 20px; vertical-align: top;"></canvas>*/}
                                                        </div>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>

                                    <div className="box-footer clearfix">
                                        <a href="javascript:void(0)" className="btn btn-sm btn-info btn-flat pull-left">Place New Order</a>
                                        <a href="javascript:void(0)" className="btn btn-sm btn-default btn-flat pull-right">View All Orders</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Row>
            </Row>
        );
    }
}

export default Relay.createContainer(CandidateDetail, {
    initialVariables: {userId: "", jobId: ""},
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
                    githubEventInfos
                    hackerRankUsername
                    hackerRankInfo
                    codeFightsUsername
                    modifiedAt
                    createdAt
                }
            }`,
        job: () => Relay.QL`
            fragment on Job {
                id
                description
                user
            }`
    }});

const styles = {
    topButtons: {
        marginLeft: "3%"
    }
};

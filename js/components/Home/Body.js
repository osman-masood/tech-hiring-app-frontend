import React from 'react';
import axios from 'axios';
import Relay from 'react-relay';
import {Link} from 'react-router';
import {Row, Col, Button, FormControl, FormGroup, ControlLabel, Well, Image} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import CreateJobMutation from "../../mutations/CreateJobMutation";
import ReactHighcharts from './highchartsLoader';

const SEARCH_CANDIDATES_URL = 'https://padawanhire.herokuapp.com/get-candidates';
const TEXTAREA_PLACEHOLDER = `Web Developer

San Jose, CA

Responsibilities

• Collaborate with internal teams to identify system requirements
• Integrate back-end data
• Design user interface and web layout using HTML/CSS practices
• Upgrade and repair existing programs
• Perform periodical tests and debugging to maximize program efficiency
• Follow security principles
• Stay up-to-date with industry developments

Requirements

• Proven work experience as Web programmer or developer
• Hands on experience with various programing languages, like PHP, ASP.NET, Javascript and Ruby on Rails
• Familiarity working with HTML/CSS
• Knowledge of Object Oriented Programming and web application development
• Project management skills within a fast-paced work environment
• BSc degree in Computer Science or relevant field`;


const spiderChartConfig = {
    chart: {
        polar: true,
        type: 'line',
        height: 150,
        backgroundColor: '#f5f5f5',
        plotBackgroundColor: '#f5f5f5',
        plotBorderColor: '#f5f5f5'
    },

    backgroundColor: '#f5f5f5',
    borderColor: '#f5f5f5',

    title: {
        text: '',
        x: -80
    },

    xAxis: {
        categories: [],
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
        pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
    },

    legend: {
        enabled: false
    },

    exporting: {
        enabled: false
    },

    series: [{
        name: 'Skills Relevancy',
        data: [],
        pointPlacement: 'on'
    }],

    credits: {
        enabled: false
    },

    pane: {
        background: {
            backgroundColor: '#f5f5f5',
            borderColor: '#f5f5f5',
        }
    }
};

const activityChartConfig = {

    chart: {
        type: 'solidgauge',
        backgroundColor: null,
        height: 160
    },
    title: null,
    credits: {
        enabled: false
    },
    legend: {
        enabled: false
    },
    exporting: {
        enabled: false
    },
    tooltip: {
        enabled: false
    },
    pane: {
        startAngle: 0,
        endAngle: 360,
        background: [{
            outerRadius: '112%',
            innerRadius: '80%',
            backgroundColor: ReactHighcharts.Highcharts.Color(ReactHighcharts.Highcharts.getOptions().colors[0]).setOpacity(0.25).get(),
            borderWidth: 0
        }]
    },

    yAxis: {
        min: 0,
        max: 100,
        lineWidth: 0,
        tickPositions: []
    },

    plotOptions: {
        solidgauge: {
            dataLabels: {
                enabled: true,
                borderWidth: 0,
                y: -15,
                backgroundColor: 'none',
                useHTML: true,
                shadow: false,
                formatter: function() {
                    return '<div style="width:100%;text-align:center;"><span style="font-size:2em;color:' + ReactHighcharts.Highcharts.getOptions().colors[0] + ';font-weight:bold;">' + this.y + '%</span>';
                }
            },
            linecap: 'round',
            stickyTracking: false,
            rounded: true
        }
    },

    series: [{
        name: '',
        borderColor: ReactHighcharts.Highcharts.getOptions().colors[0],
        data: [{
            color: ReactHighcharts.Highcharts.getOptions().colors[0],
            radius: '112%',
            innerRadius: '80%',
            y: 60
        }]
    }]
};

const solidGaugeFormatter =  (y) => {
    return () => {
        return '<div style="width:100%;text-align:center;"><span style="font-size:2em;color:' + ReactHighcharts.Highcharts.getOptions().colors[0] + ';font-weight:bold;">' + y + '%</span>';
    };
}

class Body extends React.Component {
    constructor(props) {
        super(props);
        this.allCandidates = {};
        this.props.allCandidateInfos.edges.forEach((edge) => {
            this.allCandidates[edge.node.id] = edge.node;
        });
        this.state = {
            jobDescription: '',
            createdJobId: null,
            isSearching: false,
            candidates: [],
            errors: []
        };
    }

    render() {
        console.log("Body called with props=", this.props);
        const user = JSON.parse(localStorage.getItem('user'));
        const loggedInUser = user ? user.username : '';

        return (
            <div>
                <Row style={styles.heading}>
                    <p>Padawan you will find. Paste in your job description you must.</p>
                </Row>
                <Row style={styles.subheading}>
                    <Col smOffset={2} sm={8}>
                        <div style={styles.subheading.section}>
                            <form>
                                <FormGroup
                                    controlId="formBasicText"
                                    bsSize="lg"
                                >
                                    {/*<ControlLabel> Working example with validation</ControlLabel>*/}
                                    <FormControl
                                        componentClass="textarea"
                                        placeholder={TEXTAREA_PLACEHOLDER}
                                        value={this.state.jobDescription}
                                        rows={25}
                                        onKeyPress={(event) => {
                                            if (event.key === 'Enter' && (event.ctrlKey || event.altKey)) {
                                                this.onClickSearch(user.id)
                                            }
                                        }}
                                        onChange={(e) => this.setState({jobDescription: e.target.value})}
                                    />
                                </FormGroup>
                                <Button bsStyle="primary" bsSize="large" block style={{padding: 20}}
                                        disabled={!this.state.jobDescription || this.state.isSearching }
                                        onClick={() => this.onClickSearch(user.id)}
                                >{this.state.isSearching ? "Searching..." : "Search"}
                                </Button>
                            </form>
                        </div>
                    </Col>
                </Row>

                <Row style={styles.subheading}>
                    <Col smOffset={2} sm={8}>
                        { this.state.candidates.map(candidate => this.renderCandidateRow(candidate)) }
                    </Col>
                </Row>
            </div>
        );
    }

    //noinspection JSMethodCanBeStatic
    renderCandidateRow(candidateInfoObj) {
        const profileUrl = `/profile/${this.state.createdJobId}/${candidateInfoObj.user.id}/${btoa(candidateInfoObj.relevancyScore)}`;
        var activityConfig = JSON.parse(JSON.stringify(activityChartConfig));
        activityConfig.series[0].data[0].y = parseInt(candidateInfoObj.relevancyScore);
        activityConfig.plotOptions.solidgauge.dataLabels.formatter = solidGaugeFormatter(parseInt(candidateInfoObj.relevancyScore));

        var skillsGraph = '';
        const skillsCategories = candidateInfoObj.skills.map((data) => data[0]);
        const skillsData = candidateInfoObj.skills.map((data) => data[1]);

        if (skillsCategories.length) {
            var spiderConfig = JSON.parse(JSON.stringify(spiderChartConfig));
            spiderConfig.xAxis.categories = skillsCategories;
            spiderConfig.series[0].data = skillsData;
            skillsGraph = <ReactHighcharts config={spiderConfig} />;
        } else {
            skillsGraph = <span></span>
        }

        return <Row key={candidateInfoObj.id} className="well">
            <Col sm={3}>
                <div className="solid-gauge-relevancy">
                    <ReactHighcharts config={activityConfig} />
                </div>
            </Col>
            <Col sm={5} className="name-area">
                <Row>
                    <Link to={profileUrl}>
                        <Col>
                            <h2>{candidateInfoObj.user.fullName || "Unknown Warrior"}</h2>
                        </Col>
                    </Link>
                </Row>
                <Row>
                    <Col sm={4}>
                        { candidateInfoObj.githubUsername ?
                            <a target="_blank" href={"https://github.com/" + candidateInfoObj.githubUsername}>Github</a>
                            : "Github"
                        }
                    </Col>
                    <Col sm={4}>
                        { candidateInfoObj.hackerRankUsername ?
                            <a target="_blank"
                                href={"https://www.hackerrank.com/" + candidateInfoObj.hackerRankUsername}>HackerRank</a>
                            : "HackerRank"
                        }
                    </Col>
                    <Col sm={4}>
                        { candidateInfoObj.codeFightsUsername ?
                            <a target="_blank"
                                href={"https://codefights.com/profile/" + candidateInfoObj.codeFightsUsername}>CodeFights</a>
                            : "CodeFight"
                        }
                    </Col>
                </Row>
            </Col>
            <Col sm={4}>
                { skillsGraph }
            </Col>
        </Row>;
    }

    onClickSearch(userId) {
        this.setState({isSearching: true});
        console.log(`onClickSearch: jobDescription: ${this.state.jobDescription}, userId: ${userId}`);

        // Create the Job Description and then search candidates w/ Python API
        createJobWithDescriptionAndUserId(this.state.jobDescription, userId).then(data => {
            console.log("onClickSearch => createJobWithDescriptionAndUserId => data: ", data);
            if (!data.errors) {
                this.setState({ errors: [], createdJobId: data.createJob.changedJob.id}, () => {
                    this.searchCandidates(this.state.jobDescription)
                });
            } else {
                this.setState({ errors: data.errors, isSearching: false });
            }
        }).catch(errors => {
            console.error("createJobWithDescriptionAndUserId threw errors", errors);
            this.setState({ errors });
        });
    }

    searchCandidates(query) {
        axios.post(SEARCH_CANDIDATES_URL, {
            'query': query
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.info("searchCandidates query:", query, "response:", response);
            const candidates = response.data.candidates || [];
            const searchedCandidates = candidates.map((candidate) => {
                var newCandidate = this.allCandidates[candidate.id];
                newCandidate.relevancyScore = (parseFloat(candidate.score) * 100).toFixed(0);
                newCandidate.skills = candidate.skills;
                return newCandidate;
            });
            this.setState({candidates: searchedCandidates, isSearching: false});
        }).catch(errors => {
            console.error("Search Candidates threw errors", errors);
            this.setState({ errors });
        });
    }
}


function createJobWithDescriptionAndUserId(description, userId) {
    return new Promise((resolve, reject) => {
        Relay.Store.commitUpdate(new CreateJobMutation({
            input: {
                description: description,
                user: {id: userId}
            },
            job: null
        }), {
            onSuccess: (data) => {
                resolve(data);
            },
            onFailure: (transaction) => {
                reject(transaction.getError().message);
            }
        });
    });
}

export default Relay.createContainer(Body, {
    fragments: { }
});



const styles = {
    heading: {
        padding: '100px 0 50px 0',
        fontSize: '25px',
        textAlign: 'center'
    },
    subheading: {
        padding: '0 0 50px 0',
        fontSize: '18px',
        textAlign: 'center',
        section: {
            padding: '25px'
        }
    }
};

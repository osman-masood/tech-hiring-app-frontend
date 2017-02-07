import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import {Row, Col, Button, FormControl, FormGroup, ControlLabel, Well, Image} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import CreateJobMutation from "../../mutations/CreateJobMutation";
const ReactHighcharts = require('react-highcharts');
const HighchartsMore = require('highcharts-more');

HighchartsMore(ReactHighcharts.Highcharts);


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

class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobDescription: '',
            isSearching: false,
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
                                    <FormControl componentClass="textarea"
                                                 placeholder={TEXTAREA_PLACEHOLDER}
                                                 value={this.state.jobDescription}
                                                 rows={25}
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
                        { this.props.allCandidateInfos.edges.map(edge => this.renderCandidateRow(edge.node)) }
                    </Col>
                </Row>
            </div>
        );
    }

    //noinspection JSMethodCanBeStatic
    renderCandidateRow(candidateInfoObj) {
        return <Row key={candidateInfoObj.id} className="well">
            <Col sm={2}>
                <Link to={`/profile/${candidateInfoObj.user.id}`}>
                    <Image src={candidateInfoObj.thumbnailUrl || "http://lorempixel.com/75/75/people/"} circle />
                </Link>
            </Col>
            <Col sm={6}>
                <Row>
                    <Link to={`/profile/${candidateInfoObj.user.id}`}>
                        <Col>
                            <h2>{candidateInfoObj.user.fullName || "Unknown Warrior"}</h2>
                        </Col>
                    </Link>
                </Row>
                <Row>
                    <Col sm={3}>
                        { candidateInfoObj.githubUsername ?
                            <a target="_blank" href={"https://github.com/" + candidateInfoObj.githubUsername}>Github</a>
                            : "Github"
                        }
                    </Col>
                    <Col sm={3}>
                        { candidateInfoObj.hackerRankUsername ?
                            <a target="_blank"
                               href={"https://www.hackerrank.com/" + candidateInfoObj.hackerRankUsername}>HackerRank</a>
                            : "HackerRank"
                        }
                    </Col>
                    <Col sm={3}>
                        { candidateInfoObj.codeFightsUsername ?
                            <a target="_blank"
                               href={"https://codefights.com/profile/" + candidateInfoObj.codeFightsUsername}>CodeFights</a>
                            : "CodeFight"
                        }
                    </Col>
                </Row>
            </Col>
            <Col sm={4}>
                <ReactHighcharts config={highchartsConfig} />
            </Col>
        </Row>;
    }

    onClickSearch(userId) {
        this.setState({isSearching: true});
        console.log(`onClickSearch: jobDescription: ${this.state.jobDescription}, userId: ${userId}`);

        createJobWithDescriptionAndUserId(this.state.jobDescription, userId).then(data => {
            if (!data.errors) {
                this.setState({ errors: [], isSearching: false});
            } else {
                this.setState({ errors: data.errors, isSearching: false });
            }
        }).catch(errors => {
            console.error("createJobWithDescriptionAndUserId threw errors", errors);
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

import React, { Component } from 'react';
import { Container, Row, Col, Image, Table } from 'react-bootstrap';
import fetchHelper from "../utils/fetchHelper";

class OrganizationCommits extends Component {
    constructor(props) {
        super(props);
        this.state = {
            organization: {},
            repo: this.props.org_repo,
            commits: []
        }
    }

    UNSAFE_componentWillMount() {
        let promise = fetchHelper(`https://api.github.com/orgs/${ this.props.org_login }`);
        promise
            .then(result => { this.setState({ organization: result }) });

        promise = fetchHelper(`https://api.github.com/repos/${ this.props.org_login }/${ this.props.org_repo }/commits`);
        promise
            .then(result => { this.setState({ commits: result }) });
    }

    render() {
        const { organization, repo, commits } = this.state;

        return (
            <Container className="padding-vertical organization-single">
                <Row>
                    <Col>
                        <h2 className="title">
                            <Image src={ organization.avatar_url }/>
                            <span>{ organization.login }</span>
                            <span className="sub-title"><span className="light">repo:</span> { repo }</span>
                        </h2>

                        <Table className="table-details">
                            <thead>
                            <tr>
                                <th>Commit</th>
                                <th>Message</th>
                                <th>Author</th>
                                <th className="center">Date</th>
                            </tr>
                            </thead>
                            { commits !== [] &&
                            <tbody>
                            { commits.map(commit =>
                                <tr key={ commit.sha }>
                                    <td>
                                        <a href={ commit.url ? commit.url : "#"}
                                           target="_blank"
                                           rel="noopener noreferrer">
                                            { commit.sha }
                                        </a>
                                    </td>
                                    <td>
                                        { commit.commit.message }
                                    </td>
                                    <td>
                                        <a href={ commit.author ? commit.author.url : "#"  }
                                           target="_blank"
                                           rel="noopener noreferrer">
                                            { commit.commit.author.name }
                                        </a>
                                    </td>
                                    <td className="center">
                                        { (commit.commit.author.date).substring(0, 10) }
                                    </td>
                                </tr>
                            )}
                            </tbody>
                            }
                        </Table>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default OrganizationCommits;
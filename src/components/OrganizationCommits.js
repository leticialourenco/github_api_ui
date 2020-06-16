import React, { Component } from 'react';
import { Container, Row, Col, Image, Table } from 'react-bootstrap';
import fetchHelper from '../utils/fetchHelper';

class OrganizationCommits extends Component {
    constructor(props) {
        super(props);
        this.state = {
            organization: {},
            repo: this.props.org_repo,
            commits: []
        }

        let promise = fetchHelper(`https://api.github.com/orgs/${ this.props.org_login }`);
        promise
            .then(result => { this.setState({ organization: result }) });

        promise = fetchHelper(`https://api.github.com/repos/${ this.props.org_login }/${ this.props.org_repo }/commits`);
        promise
            .then(result => { this.setState({ commits: result }) });
    }

    render() {
        const { organization, repo, commits } = this.state;

        if (!commits || !commits.map) {
            return (
                <Container className="padding-vertical organization-single">
                    <h2 className="title">
                        <Image src={ organization.avatar_url }/>
                        <span>{ organization.login }</span>
                        <span className="sub-title"><span className="light">repo:</span> { repo }</span>
                    </h2>

                    <div className="alert alert-secondary">
                        <h3 className="list-label">Empty Repository</h3>
                        <span>
                            No commits to display
                        </span>
                    </div>
                </Container>
        )}

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
                                <th className="center">Commit</th>
                                <th>Message</th>
                                <th className="center">Author</th>
                                <th className="center">Date</th>
                            </tr>
                            </thead>
                            <tbody>
                            { commits.map(commit =>
                                <tr key={ commit.sha }>
                                    <td className="commit-container">
                                        <a href={ commit.html_url ? commit.html_url : "#"}
                                           target="_blank"
                                           rel="noopener noreferrer">
                                            { (commit.sha).substring(0, 7) }
                                        </a>
                                    </td>
                                    <td>
                                        { commit.commit.message }
                                    </td>
                                    <td className="center no-break">
                                        <a href={ commit.author ? commit.author.html_url : "#"  }
                                           target="_blank"
                                           rel="noopener noreferrer">
                                            { commit.commit.author.name }
                                        </a>
                                    </td>
                                    <td className="center no-break">
                                        { new Date(commit.commit.author.date).toString().substring(4, 15) }
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default OrganizationCommits;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Image, Table } from 'react-bootstrap';
import fetchHelper from "../utils/fetchHelper";

class Organizations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            organization: {},
            repos: []
        }
    }

    UNSAFE_componentWillMount() {
        let promise = fetchHelper(`https://api.github.com/orgs/${ this.props.org_login }`);
        promise
            .then(result => { this.setState({ organization: result }) });

        promise = fetchHelper(`https://api.github.com/orgs/${ this.props.org_login }/repos`);
        promise
            .then(result => { this.setState({ repos: result }) });
    }

    render() {
        const { organization } = this.state
        const { repos } = this.state

        return (
            <Container className="padding-vertical organization-single">
                <Row>
                    <Col>
                        <h2 className="title">
                            <Image src={ organization.avatar_url }/>
                            <span>{ organization.login }</span>
                        </h2>

                        <Table className="table-details">
                            <thead>
                            <tr>
                                <th>Repositories</th>
                                <th>Description</th>
                                <th className="center">Forks</th>
                                <th className="center">Watchers</th>
                                <th className="center">Stars</th>
                            </tr>
                            </thead>

                            <tbody>
                            { repos.map( repo =>
                                <tr key={ repo.id }>
                                    <td>
                                        <Link to={`/${ organization.login }/repository/${ repo.name }`}>
                                            { repo.name }
                                        </Link>
                                    </td>
                                    <td><span>{ repo.description }</span></td>
                                    <td className="center"><span>{ repo.forks_count }</span></td>
                                    <td className="center"><span>{ repo.watchers_count }</span></td>
                                    <td className="center"><span>{ repo.stargazers_count }</span></td>
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

export default Organizations;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Image, Table, Dropdown, DropdownButton  } from 'react-bootstrap';
import fetchHelper from '../utils/fetchHelper';

class OrganizationSingle extends Component {
    state = {
        organization: {},
        repos: []
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
        const { organization, repos } = this.state
        let sorted_repos = repos

        const handleSortChange = (value, order) => {
            order === "asc" ?
                sorted_repos = repos.sort((a, b) => a[value] > b[value] ? 1 : -1)
                :
                sorted_repos = repos.sort((a, b) => a[value] < b[value] ? 1 : -1)

            this.setState({ sort: value })
        }

        return (
            <Container className="padding-vertical organization-single">
                <Row>
                    <Col>
                        <Row>
                            <Col>
                                <h2 className="title">
                                    <Image src={ organization.avatar_url }/>
                                    <span>{ organization.login }</span>
                                </h2>
                            </Col>

                            <Col>
                                <DropdownButton
                                    id="dropdown-basic-button"
                                    className="sort"
                                    title="Sort by"
                                >
                                    <Dropdown.Item
                                        onClick={ () => handleSortChange("forks_count", "asc") }
                                    >
                                        <small>(asc)</small> Forks
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={ () => handleSortChange("forks_count", "desc") }
                                    >
                                        <small>(des)</small> Forks
                                    </Dropdown.Item>

                                    <Dropdown.Item
                                        onClick={ () => handleSortChange("watchers_count", "asc") }
                                    >
                                        <small>(asc)</small> Watchers
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={ () => handleSortChange("watchers_count", "desc") }
                                    >
                                        <small>(des)</small> Watchers
                                    </Dropdown.Item>

                                    <Dropdown.Item
                                        onClick={ () => handleSortChange("stargazers_count", "asc") }
                                    >
                                        <small>(asc)</small> Stars
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={ () => handleSortChange("stargazers_count", "desc") }
                                    >
                                        <small>(des)</small> Stars
                                    </Dropdown.Item>
                                </DropdownButton>
                            </Col>
                        </Row>

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
                            { sorted_repos.map( repo =>
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

export default OrganizationSingle;
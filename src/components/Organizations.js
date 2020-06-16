import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Image, Form } from 'react-bootstrap';
import fetchHelper from '../utils/fetchHelper';

class Organizations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            organization: {},
            organizations: [],
            search_input: "",
            error: ""
        }

        const promise = fetchHelper("https://api.github.com/organizations");
        promise
            .then(result => { this.setState({ organizations: result }) });
    }

    fetchSearchResult = searchTerm => {
        const promise = fetchHelper(`https://api.github.com/orgs/${ searchTerm }`);
        promise
            .then(result => { this.setState({ organization: result }) })
            .catch(this.setState({ error: `No results found for '${ searchTerm }'` }))
    }

    render() {
        const { organizations, organization, search_input, error } = this.state

        const handleInputChange = event => {
            this.setState({ search_input: event.target.value })
        }

        const handleSearch = event => {
            event.preventDefault();
            this.fetchSearchResult(search_input);
            this.setState({ search_input: "" })
        }

        return (
            <Container className="padding-vertical list-all">
                <Row>
                    <Col>
                        <h3 className="list-label">Explore Organizations</h3>
                        <ListGroup className="organization-list">
                            { organizations.map(org =>
                                <Link
                                    className="list-group-item"
                                    key={ org.id }
                                    to={`/${ org.login }`}
                                >
                                    <Image rounded src={ org.avatar_url } />
                                    <span>{ org.login }</span>
                                </Link>
                            )}
                        </ListGroup>
                    </Col>
                    <Col>
                        <h3 className="list-label">Search for Organizations</h3>
                        <Form
                            className="search-form"
                            onSubmit={ handleSearch }
                        >
                            <Form.Group as={ Row }>
                                <Col sm="9" className="no-padding">
                                    <Form.Control
                                        type="text"
                                        placeholder="Find an organization..."
                                        onChange={ handleInputChange }
                                        value={ search_input }
                                        className="text-input"
                                    />
                                </Col>
                                <Col sm="3" className="no-padding">
                                    <Form.Control
                                        type="submit"
                                        value="Search"
                                        className="button"
                                    />
                                </Col>
                            </Form.Group>
                        </Form>

                        { organization.id ?
                            <div className="search-result">
                                <h3 className="list-label">Search Result</h3>
                                <ListGroup className="organization-list">
                                    <Link
                                        className="list-group-item"
                                        key={ organization.id }
                                        to={`/${ organization.login }`}
                                    >
                                        <Image rounded src={ organization.avatar_url } />
                                        <span>{ organization.login }</span>
                                    </Link>
                                </ListGroup>
                            </div> :
                            <div className="search-error">

                                { error !== "" &&
                                <div className="alert alert-secondary">
                                    <h3 className="list-label">{ error }</h3>

                                    <span>
                                    GitHub API doesn't support partial search,
                                    search term has to match the full name of an organization.
                                    Example: "netflix", "github", "nasa"
                                    </span>
                                </div>
                                }
                            </div>
                        }
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Organizations;
import React, { Component } from 'react';
import { Container, Row, Col, ListGroup, Image, Form } from 'react-bootstrap';
import fetchHelper from '../utils/fetchHelper';

class Organizations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            organizations: [],
            organization: {},
            search_input: "",
            error: ""
        }
    }

    UNSAFE_componentWillMount() {
        const promise = fetchHelper("https://api.github.com/organizations");
        promise
            .then(result => { this.setState({ organizations: result }) });
    }

    fetchData (searchTerm) {
        const promise = fetchHelper(`https://api.github.com/orgs/${ searchTerm }`);
        promise
            .then(result => { this.setState({ organization: result }) })
            .catch(this.setState({ error: `No results found for '${ searchTerm }'` }))
    }

    render() {
        const { organizations, search_input, organization, error } = this.state

        const handleInputChange = event => {
            this.setState({ search_input: event.target.value })
        }

        const handleSearch = event => {
            event.preventDefault();
            this.fetchData(search_input);
            this.setState({ search_input: "" })
        }

        return (
            <Container className="padding-vertical">
                <Row>
                    <Col>
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
                    </Col>
                </Row>
                <Row>
                    <Col>
                        { organization.id ?
                            <div className="search-result">
                                <h3 className="list-label">Search Result</h3>
                                <ListGroup className="organization-list">
                                    <a
                                        className="list-group-item"
                                        key={ organization.id }
                                        href="#"
                                    >
                                        <Image rounded src={ organization.avatar_url } />
                                        <span>{ organization.login }</span>
                                    </a>
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
                        <h3 className="list-label">Explore Organizations</h3>
                        <ListGroup className="organization-list">
                            { organizations.map(org =>
                                <a href="#" className="list-group-item" key={ org.id }>
                                <Image rounded src={ org.avatar_url } />
                                <span>{ org.login }</span>
                                </a>
                            )}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Organizations;
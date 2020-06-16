import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Image, Form } from 'react-bootstrap';
import Search from './Search';
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

    render() {
        const { organizations } = this.state

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
                        <Search />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Organizations;
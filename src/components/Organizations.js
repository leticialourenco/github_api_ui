import React, { Component } from 'react';
import { Container, Row, Col, ListGroup, Image } from 'react-bootstrap';
import fetchHelper from '../utils/fetchHelper';

class Organizations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            organizations: []
        }
    }

    UNSAFE_componentWillMount() {
        const promise = fetchHelper("https://api.github.com/organizations");
        promise
            .then(result => { this.setState({ organizations: result }) });
    }

    render() {
        const { organizations } = this.state

        return (
            <Container className="padding-vertical">
                <Row>
                    <Col>
                        <h3 className="list-label">Explore Organizations</h3>
                        <ListGroup className="organization-list">
                            { organizations.map(org =>
                                <a href="#" className="list-group-item">
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
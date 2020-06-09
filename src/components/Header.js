import React  from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Container } from 'react-bootstrap';

const Header = () => {
    return (
        <header className="blue-bg">
            <Container>
                <Row>
                    <Col>
                        <h3>
                            <Link to="/" className="logo">
                                github-api-app
                            </Link>
                        </h3>
                    </Col>
                </Row>
            </Container>
        </header>
    )
}

export default Header;
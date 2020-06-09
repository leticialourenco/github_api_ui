import React  from 'react';
import { Col, Row, Container } from 'react-bootstrap';

const Header = () => {
    return (
        <header className="blue-bg">
            <Container>
                <Row>
                    <Col>
                        <h3>
                            <a href="/" className="logo">
                                GitHub API UI
                            </a>
                        </h3>
                    </Col>
                </Row>
            </Container>
        </header>
    )
}

export default Header;
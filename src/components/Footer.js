import React  from 'react';
import { Col, Row, Container } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="dark-bg">
            <Container>
                <Row>
                    <Col>
                        <a href="https://github.com/leticialourenco/github_api_ui" target="_blank" rel="noopener noreferrer">
                            View Project on Github
                        </a>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer;
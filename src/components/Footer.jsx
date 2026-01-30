import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="py-4 mt-auto border-top position-relative" style={{ background: 'var(--navbar-bg)', backdropFilter: 'blur(10px)', borderColor: 'var(--navbar-border)' }}>
            <Container>
                <Row className="align-items-center justify-content-between">
                    <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
                        <small className="fw-medium text-main">
                            &copy; {new Date().getFullYear()} <span className="fw-bold">Harsh Jagtap</span>. All rights reserved.
                        </small>
                    </Col>
                    <Col md={6} className="text-center text-md-end">
                        <small className="text-muted" style={{ color: 'var(--text-muted)' }}>
                            Built with <span style={{ color: 'var(--primary-color)' }} className="fw-bold">Love ❤️</span> & <span style={{ color: 'var(--accent-blue)' }} className="fw-bold">Passion 🔥</span>
                        </small>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;

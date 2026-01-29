import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { experiencesData } from '../data';
import { motion } from 'framer-motion';

const Experience = () => {
    return (
        <Container>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="section-title">Experience</h2>
                <Row className="justify-content-center">
                    <Col lg={8}>
                        <div className="position-relative ps-4 ps-md-5">
                            {/* Vertical Line */}
                            <div className="position-absolute start-0 top-0 bottom-0 border-start border-2 border-primary ms-2 ms-md-0 opacity-25"></div>

                            {experiencesData.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 100 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: false, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                    className="mb-5 position-relative"
                                >
                                    {/* Timeline Dot */}
                                    <div className="position-absolute start-0 top-0 translate-middle rounded-circle border border-4 border-primary shadow-sm ms-2 ms-md-0" style={{ width: '20px', height: '20px', marginTop: '24px', zIndex: 1, backgroundColor: 'var(--card-bg)' }}></div>

                                    <motion.div
                                        className="custom-card p-4 ms-4 education-card"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
                                            <div>
                                                <h4 className="fw-bold mb-1 text-main">{item.title}</h4>
                                                <p className="text-primary-custom fw-medium mb-0">{item.company}</p>
                                            </div>
                                            <span className="badge border mt-2 mt-md-0 px-3 py-2 rounded-pill" style={{ backgroundColor: 'var(--glass-border)', color: 'var(--text-main)', borderColor: 'var(--glass-border)' }}>
                                                {item.date}
                                            </span>
                                        </div>
                                        <p className="text-muted mb-0 lh-lg">
                                            {item.description}
                                        </p>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </Col>
                </Row>
            </motion.div>
        </Container>
    );
};

export default Experience;

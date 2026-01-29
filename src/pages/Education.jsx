import React from 'react';
import { Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { educationData } from '../data';

const Education = () => {
    return (
        <Container>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6 }}
            >
                <div className="text-center mb-5">
                    <h2 className="section-title">My Education</h2>
                    <span className="position-absolute bg-primary bottom-0 start-50 translate-middle-x" style={{ width: '60px', height: '4px', borderRadius: '2px' }}></span>
                </div>

                <div className="timeline-section ps-2" style={{ maxWidth: '900px', margin: '0 auto' }}>
                    {educationData.map((edu, index) => (
                        <motion.div
                            key={index}
                            className="d-flex gap-4 mb-5 position-relative timeline-item-custom"
                            initial={{ opacity: 0, x: 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            {/* Custom Timeline Line */}
                            <div className="d-flex flex-column align-items-center" style={{ width: '40px' }}>
                                <div className="timeline-dot rounded-circle border border-4 shadow-sm" style={{ width: '20px', height: '20px', zIndex: 2, background: 'var(--card-bg)', borderColor: 'var(--primary-color)' }}></div>
                                {index !== educationData.length - 1 && (
                                    <div className="timeline-line position-absolute" style={{ width: '3px', top: '20px', bottom: '-48px', left: '19px', zIndex: 1, backgroundColor: 'var(--glass-border)' }}></div>
                                )}
                            </div>
                            <div className="flex-grow-1">
                                <motion.div
                                    className="p-4 rounded-4 shadow-sm custom-card education-card"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-2">
                                        <h5 className="fw-bold text-main mb-0">{edu.institution}</h5>
                                        <span className="badge border px-3 py-2 rounded-pill fw-medium" style={{ backgroundColor: 'var(--glass-border)', color: 'var(--accent-blue)', borderColor: 'var(--accent-blue)' }}>
                                            {edu.date}
                                        </span>
                                    </div>
                                    <h6 className="fw-bold mb-3" style={{ color: 'var(--accent-blue)' }}>{edu.degree}</h6>
                                    <div className="d-flex align-items-center text-secondary small mb-3">
                                        <i className="bi bi-geo-alt-fill me-2 text-muted"></i>
                                        {edu.location}
                                    </div>
                                    <p className="text-muted mb-0 lh-base border-top pt-3 mt-3 w-100" style={{ borderColor: 'var(--glass-border)' }}>
                                        {edu.description}
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </Container>
    );
};

export default Education;

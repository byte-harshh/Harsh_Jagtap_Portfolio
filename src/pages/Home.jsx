import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link as ScrollLink } from 'react-scroll';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import TechTitle from '../components/TechTitle';
import Hero3D from '../components/Hero3D';


const Home = () => {
    return (
        <section className="min-vh-100 d-flex align-items-center position-relative w-100 py-5 pt-5 mt-5 mt-lg-0">
            <Container>
                <Row className="align-items-center justify-content-between">
                    {/* Text Column (Left) - Kept first in DOM for mobile priority */}
                    <Col lg={6} className="mb-5 mb-lg-0">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <TechTitle text="Harsh Jagtap" />

                            <h3 className="h4 text-muted mb-4 fw-normal d-flex align-items-center gap-2">
                                I am a
                                <span className="fw-bold" style={{ color: 'var(--accent-blue)' }}>
                                    <Typewriter
                                        words={['Computer Science Engineer|', 'Full Stack Developer|', 'Passionate & Adaptable|', 'Eager to Learn|']}
                                        loop={0}
                                        cursor
                                        cursorStyle=''
                                        typeSpeed={80}
                                        deleteSpeed={50}
                                        delaySpeed={1000}
                                    />
                                </span>
                            </h3>

                            <p className="lead mb-4 lh-lg" style={{ fontSize: '1.1rem', color: 'var(--text-body-adaptive)', fontWeight: 400, textAlign: 'justify' }}>
                                Hello! I'm Harsh Jagtap, a passionate Computer Science Graduate exploring opportunities in Software Development.
                                I have a focus on IoT, Blockchain, and Machine Learning.
                                Eager to contribute my technical skills to meaningful initiatives.
                            </p>

                            <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
                                <a href="/Resume_HarshJagtap(NEW).pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary-custom cursor-pointer text-decoration-none">
                                    Check Resume
                                </a>
                                <ScrollLink to="contact" smooth={true} duration={500} offset={-80} className="btn btn-outline-custom cursor-pointer text-decoration-none">
                                    Contact Me
                                </ScrollLink>

                                {/* Social Icons - Now beside buttons */}
                                <div className="d-flex gap-3 ms-2">
                                    <a href="https://www.linkedin.com/in/myself-harshjagtap/" target="_blank" rel="noreferrer" className="social-icon-circle shadow-sm">
                                        <FaLinkedin size={20} />
                                    </a>
                                    <a href="https://github.com/byte-harshh" target="_blank" rel="noreferrer" className="social-icon-circle shadow-sm">
                                        <FaGithub size={20} />
                                    </a>
                                </div>
                            </div>

                        </motion.div>
                    </Col>

                    <Col lg={6} className="text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="d-flex justify-content-center"
                        >
                            <Hero3D />
                        </motion.div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Home;

import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';



const About = () => {
    return (
        <Container>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <div className="text-center mb-5">
                    <h6 className="text-primary-custom fw-bold text-uppercase letter-spacing-2 mb-2">My Story</h6>
                    <h2 className="display-5 fw-bold text-main">About Me</h2>
                </div>

                <Row className="justify-content-center align-items-center">
                    {/* Image Column */}
                    <Col lg={4} className="text-center mb-5 mb-lg-0">
                        <div className="position-relative d-inline-block" style={{ marginTop: '-250px' }}>
                            {/* Placeholder for Passport Size Photo */}
                            <motion.div
                                style={{
                                    width: '200px',
                                    height: '240px',
                                    overflow: 'hidden',
                                    borderRadius: '12px',
                                    backgroundColor: 'var(--secondary-color)',
                                    border: '2px solid var(--accent-blue)',
                                    boxShadow: '0 0 20px rgba(37, 99, 235, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                                }}
                                className="mx-auto"
                            >
                                <img
                                    src="/Profile.jpeg"
                                    alt="Harsh Jagtap"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </motion.div>
                            {/* Integrative decorative element */}
                            <motion.div
                                className="position-absolute rounded-circle"
                                style={{
                                    backgroundColor: 'var(--accent-blue)',
                                    width: '40px',
                                    height: '40px',
                                    top: '-15px',
                                    right: '-15px',
                                    zIndex: -1,
                                    opacity: 0.2
                                }}
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 90, 0]
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            ></motion.div>
                            <motion.div
                                className="position-absolute rounded-circle"
                                style={{
                                    backgroundColor: 'var(--text-main)',
                                    width: '60px',
                                    height: '60px',
                                    bottom: '-20px',
                                    left: '-20px',
                                    zIndex: -1,
                                    opacity: 0.1
                                }}
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, -45, 0]
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.5
                                }}
                            ></motion.div>
                        </div>
                    </Col>

                    {/* Text Column */}
                    <Col lg={8}>
                        <div className="p-2">
                            <p className="lead mb-4 lh-lg" style={{ color: 'var(--text-body-adaptive)', fontWeight: 400, textAlign: 'justify' }}>
                                I am a passionate <strong className="text-main">Computer Science Engineer</strong> with a keen interest in Full Stack Development. I love creating innovative solutions that solve real-world problems.
                            </p>
                            <p className="mb-5 lh-lg" style={{ maxWidth: '800px', color: 'var(--text-body-adaptive)', fontWeight: 400, textAlign: 'justify' }}>
                                I have completed my B.Tech in Computer Science and Engineering from G.H. Raisoni College of Engineering, Nagpur. Here are some highlights about me:
                                <br /><br />
                                ◽ Passionate about building scalable web applications and exploring Artificial Intelligence.
                                <br />
                                ◽ Proficient in C, C++ and Java programming languages.
                                <br />
                                ◽ Enjoy problem-solving and collaborating on innovative projects.
                                <br />
                                ◽ Eager to contribute my technical skills and adaptable nature to meaningful initiatives.
                                <br />
                                ◽ Keen to connect with fellow professionals in the dynamic world of technology. Let's explore opportunities together!
                            </p>

                            <Row className="mt-4">
                                <Col md={6} className="mb-4">
                                    <div className="d-flex gap-3 align-items-start p-3 hover-lift border-bottom" style={{ borderColor: 'var(--glass-border)' }}>
                                        <div className="mt-1">
                                            <i className="bi bi-code-square text-primary-custom fs-3"></i>
                                        </div>
                                        <div>
                                            <h5 className="fw-bold mb-2">Web Development</h5>
                                            <p className="text-muted small lh-base">Building responsive websites using modern technologies like React, HTML5, and CSS3.</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={6} className="mb-4">
                                    <div className="d-flex gap-3 align-items-start p-3 hover-lift border-bottom" style={{ borderColor: 'var(--glass-border)' }}>
                                        <div className="mt-1">
                                            <i className="bi bi-hdd-network text-primary-custom fs-3"></i>
                                        </div>
                                        <div>
                                            <h5 className="fw-bold mb-2">Backend Systems</h5>
                                            <p className="text-muted small lh-base">Developing scalable server-side logic and APIs using Java and Spring Boot.</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={6} className="mb-4">
                                    <div className="d-flex gap-3 align-items-start p-3 hover-lift border-bottom" style={{ borderColor: 'var(--glass-border)' }}>
                                        <div className="mt-1">
                                            <i className="bi bi-database text-primary-custom fs-3"></i>
                                        </div>
                                        <div>
                                            <h5 className="fw-bold mb-2">Database Design</h5>
                                            <p className="text-muted small lh-base">Structuring efficient databases with MySQL to ensure data integrity and speed.</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={6} className="mb-4">
                                    <div className="d-flex gap-3 align-items-start p-3 hover-lift border-bottom" style={{ borderColor: 'var(--glass-border)' }}>
                                        <div className="mt-1">
                                            <i className="bi bi-cloud text-primary-custom fs-3"></i>
                                        </div>
                                        <div>
                                            <h5 className="fw-bold mb-2">Deployment</h5>
                                            <p className="text-muted small lh-base">Experience with version control (Git) and deploying applications to the cloud.</p>
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                        </div>
                    </Col>
                </Row>
            </motion.div>
        </Container>
    );
};

export default About;

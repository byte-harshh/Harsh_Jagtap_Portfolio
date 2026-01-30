import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { skillsData } from '../data';
import { motion } from 'framer-motion';
import SkillSphere from '../components/SkillSphere';

const Skills = () => {
    const fadeInAnimationVariants = {
        initial: { opacity: 0, y: 20 },
        animate: (index) => ({
            opacity: 1,
            y: 0,
            transition: { delay: 0.05 * index },
        }),
    };

    return (
        <Container className="text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="section-title fw-bold text-main">Technical Skills</h2>
                <p className="mb-5 w-75 mx-auto" style={{ color: 'var(--text-body-adaptive)', opacity: 0.9 }}>
                    A comprehensive list of the technologies and tools I've worked with throughout my journey.
                </p>
                <Row className="justify-content-center">
                    <Col lg={12}>
                        <SkillSphere />
                    </Col>
                </Row>
            </motion.div>
        </Container>
    );
};

export default Skills;

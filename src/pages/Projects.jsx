import React from 'react';
import { Container } from 'react-bootstrap';
import { projectsData } from '../data';
import { motion } from 'framer-motion';
import { HoverEffect } from '../ui/card-hover-effect';

const Projects = () => {
    return (
        <Container>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-50px" }}
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.2
                        }
                    }
                }}
            >
                <h2 className="section-title fw-bold text-main text-center mb-5">Featured Projects</h2>
                <HoverEffect items={projectsData} />
            </motion.div>
        </Container>
    );
};

export default Projects;

import React from 'react';
import { Container } from 'react-bootstrap';
import { certificationsData } from '../data';
import { motion } from 'framer-motion';
import { HoverEffect } from '../ui/card-hover-effect';

const Certifications = () => {
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
                <div className="text-center mb-5">
                    <h2 className="section-title fw-bold text-main">Certifications</h2>
                </div>

                <HoverEffect items={certificationsData} className="small-card" />
            </motion.div>
        </Container>
    );
};

export default Certifications;

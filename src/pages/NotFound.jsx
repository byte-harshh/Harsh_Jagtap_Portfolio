import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaRocket } from 'react-icons/fa';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100 text-center position-relative" style={{ zIndex: 10 }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div style={{ fontSize: '150px', fontWeight: 'bold', lineHeight: '1', color: 'rgba(255,255,255,0.1)' }}>
                    404
                </div>
                <h2 className="display-4 fw-bold mb-4 gradient-text" style={{ color: 'var(--accent-blue)' }}>
                    Lost in Space
                </h2>
                <p className="lead mb-5" style={{ color: 'var(--text-muted)', maxWidth: '500px' }}>
                    Houston, we have a problem. The page you are looking for has drifted into a black hole or never existed.
                </p>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button
                        onClick={() => navigate('/')}
                        className="btn btn-primary-custom rounded-pill px-5 py-3 d-flex align-items-center gap-2 mx-auto"
                        style={{ fontSize: '1.2rem' }}
                    >
                        <FaRocket /> Return to Base
                    </Button>
                </motion.div>
            </motion.div>

            {/* Optional: Floating Astronaut or Elements could go here if we had assets */}
        </Container>
    );
};

export default NotFound;

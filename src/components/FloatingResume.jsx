import React, { useState } from 'react';
import { FaFileDownload } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingResume = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="position-fixed bottom-0 start-0 m-4 z-3"
            style={{ zIndex: 1000 }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }} // Delay entry slightly to not clutter start
        >
            <a
                href="/Resume_HarshJagtap(NEW).pdf"
                download="Harsh_Jagtap_Resume.pdf" // Force download
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary rounded-pill d-flex align-items-center justify-content-center shadow-lg text-decoration-none gap-2"
                style={{
                    height: '45px',
                    width: isHovered ? '175px' : '45px',
                    background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.9), rgba(124, 58, 237, 0.9))', // More defined gradient
                    backdropFilter: 'blur(8px)', // Glass effect
                    border: '1px solid rgba(255, 255, 255, 0.3)', // Subtle border
                    boxShadow: '0 4px 15px rgba(37, 99, 235, 0.4)', // Glowing shadow
                    transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)', // Smoother easing
                    overflow: 'hidden',
                    whiteSpace: 'nowrap'
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <FaFileDownload size={20} color="#fff" className="flex-shrink-0" />

                <AnimatePresence>
                    {isHovered && (
                        <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 5 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                            className="fw-bold text-white"
                            style={{ fontSize: '0.8rem', paddingTop: '2px' }}
                        >
                            Download Resume
                        </motion.span>
                    )}
                </AnimatePresence>
            </a>
        </motion.div>
    );
};

export default FloatingResume;

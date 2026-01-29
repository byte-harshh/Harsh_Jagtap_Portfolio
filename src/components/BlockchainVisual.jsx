import React from 'react';
import { motion } from 'framer-motion';

const BlockchainVisual = () => {
    return (
        <motion.div
            className="d-flex align-items-center justify-content-center bg-card-custom backdrop-blur"
            style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                border: '1px solid var(--accent-blue)',
                boxShadow: '0 4px 15px rgba(34, 211, 238, 0.2)',
                background: 'rgba(15, 23, 42, 0.8)',
                cursor: 'pointer'
            }}
            animate={{
                y: [0, -8, 0],
                rotate: [0, 5, -5, 0],
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            whileHover={{ scale: 1.1 }}
            title="Blockchain Enthusiast"
        >
            <i className="bi bi-link-45deg fs-2 text-gradient"></i>

            {/* Pulsing Dot */}
            <motion.div
                className="position-absolute rounded-circle"
                style={{
                    width: '8px',
                    height: '8px',
                    background: 'var(--accent-blue)',
                    top: '-2px',
                    right: '-2px'
                }}
                animate={{
                    opacity: [1, 0, 1],
                    scale: [1, 1.5, 1]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity
                }}
            />
        </motion.div>
    );
};

export default BlockchainVisual;

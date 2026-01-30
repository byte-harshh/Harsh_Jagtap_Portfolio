import React from 'react';
import { motion } from 'framer-motion';

const Preloader = ({ loading }) => {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="preloader-container"
        >
            <div className="cube-wrapper">
                <div className="cube-spinner">
                    <div className="face front"></div>
                    <div className="face back"></div>
                    <div className="face right"></div>
                    <div className="face left"></div>
                    <div className="face top"></div>
                    <div className="face bottom"></div>
                </div>
            </div>
            <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="loading-text"
            >
                Harsh Jagtap | Portfolio
            </motion.h3>
        </motion.div>
    );
};

export default Preloader;

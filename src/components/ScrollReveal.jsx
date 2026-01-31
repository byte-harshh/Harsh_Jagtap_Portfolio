import React from 'react';
import { motion } from 'framer-motion';

const ScrollReveal = ({ children, className }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ willChange: "opacity, transform" }} // Hint to browser for optimization
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;

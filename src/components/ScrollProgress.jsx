import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed-top"
            style={{
                scaleX,
                height: '4px',
                background: 'linear-gradient(90deg, var(--primary-color), var(--accent-purple), var(--accent-blue))',
                transformOrigin: '0%',
                zIndex: 9999
            }}
        />
    );
};

export default ScrollProgress;

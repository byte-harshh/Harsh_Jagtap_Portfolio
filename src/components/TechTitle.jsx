import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TechTitle = ({ text }) => {
    const [displayText, setDisplayText] = useState('');
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    useEffect(() => {
        let iterations = 0;

        const interval = setInterval(() => {
            setDisplayText(
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iterations) {
                            return text[index];
                        }
                        return letters[Math.floor(Math.random() * 26)];
                    })
                    .join("")
            );

            if (iterations >= text.length) {
                clearInterval(interval);
            }

            iterations += 1 / 3;
        }, 30);

        return () => clearInterval(interval);
    }, [text]);

    return (
        <motion.h1
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="display-3 fw-bolder mb-2 text-main tracking-tight tech-title"
            style={{ fontFamily: 'monospace' }} // Monospace looks more "tech" for decoding
        >
            {displayText}
        </motion.h1>
    );
};

export default TechTitle;

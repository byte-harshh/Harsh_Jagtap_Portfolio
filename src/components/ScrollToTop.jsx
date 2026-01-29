import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { FaArrowUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled upto given distance
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set the top cordinate to 0
    // make scrolling smooth
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="position-fixed bottom-0 end-0 m-4"
                    style={{ zIndex: 1000 }}
                >
                    <Button
                        onClick={scrollToTop}
                        variant="primary"
                        className="rounded-circle d-flex align-items-center justify-content-center shadow-lg"
                        style={{
                            width: "40px",
                            height: "40px",
                            backgroundColor: "var(--primary-color)",
                            border: "none",
                            color: "var(--btn-text)"
                        }}
                    >
                        <FaArrowUp />
                    </Button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ScrollToTop;

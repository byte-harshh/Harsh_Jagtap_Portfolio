import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { FaArrowUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useScroll } from "./SmoothScroll";

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { lenis } = useScroll();

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
        const isMobile = window.innerWidth < 992; // Use bootstrap lg breakpoint or verified mobile check

        if (isMobile) {
            // Native smooth scroll is often smoother on mobile than JS libraries
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        } else if (lenis) {
            // Use Lenis for desktop consistency
            lenis.scrollTo(0);
        } else {
            // Fallback
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
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
                            width: "45px",
                            height: "45px",
                            background: "linear-gradient(135deg, var(--primary-color), var(--accent-purple))",
                            border: "none",
                            color: "white",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
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

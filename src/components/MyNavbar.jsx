import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link as ScrollLink } from 'react-scroll';
import { links } from '../data';
import { FaSun, FaMoon } from 'react-icons/fa';

const MyNavbar = ({ theme, toggleTheme }) => {
    const [scrolled, setScrolled] = useState(false);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Navbar
            expand="lg"
            fixed="top"
            className={`navbar-custom ${scrolled ? 'shadow-sm' : ''}`}
            expanded={expanded}
            variant={theme}
            onToggle={(val) => setExpanded(val)}
        >
            <Container>
                {/* Wrapped Brand in a div to ensure z-index in flex container on mobile */}
                <div className="d-flex align-items-center">
                    <Navbar.Brand
                        as={ScrollLink}
                        to="home"
                        smooth={true}
                        duration={500}
                        onClick={() => setExpanded(false)}
                    >
                        {/* Animated Logo */}
                        {/* 3D Rotating Cube Logo */}
                        <div style={{ perspective: '1000px', width: '50px', height: '50px' }}>
                            <motion.div
                                animate={{
                                    rotateX: [0, 360],
                                    rotateY: [0, 360]
                                }}
                                transition={{
                                    duration: 10,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                whileHover={{ scale: 1.1, rotateX: 0, rotateY: 0 }} // Pause and face front on hover
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    position: 'relative',
                                    transformStyle: 'preserve-3d',
                                    cursor: 'pointer'
                                }}
                            >
                                {/* Front Face */}
                                <div style={{
                                    position: 'absolute',
                                    width: '50px',
                                    height: '50px',
                                    background: 'rgba(59, 130, 246, 0.2)',
                                    border: '2px solid var(--accent-blue)',
                                    transform: 'translateZ(25px)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 0 15px var(--accent-blue)'
                                }}>
                                    <span className="fw-bold text-white small">HJ</span>
                                </div>
                                {/* Back Face */}
                                <div style={{
                                    position: 'absolute',
                                    width: '50px',
                                    height: '50px',
                                    background: 'rgba(99, 102, 241, 0.2)',
                                    border: '2px solid var(--accent-purple)',
                                    transform: 'rotateY(180deg) translateZ(25px)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}></div>
                                {/* Right Face */}
                                <div style={{
                                    position: 'absolute',
                                    width: '50px',
                                    height: '50px',
                                    background: 'rgba(59, 130, 246, 0.2)',
                                    border: '2px solid var(--accent-blue)',
                                    transform: 'rotateY(90deg) translateZ(25px)'
                                }}></div>
                                {/* Left Face */}
                                <div style={{
                                    position: 'absolute',
                                    width: '50px',
                                    height: '50px',
                                    background: 'rgba(99, 102, 241, 0.2)',
                                    border: '2px solid var(--accent-purple)',
                                    transform: 'rotateY(-90deg) translateZ(25px)'
                                }}></div>
                                {/* Top Face */}
                                <div style={{
                                    position: 'absolute',
                                    width: '50px',
                                    height: '50px',
                                    background: 'rgba(59, 130, 246, 0.2)',
                                    border: '2px solid var(--accent-blue)',
                                    transform: 'rotateX(90deg) translateZ(25px)'
                                }}></div>
                                {/* Bottom Face */}
                                <div style={{
                                    position: 'absolute',
                                    width: '50px',
                                    height: '50px',
                                    background: 'rgba(99, 102, 241, 0.2)',
                                    border: '2px solid var(--accent-purple)',
                                    transform: 'rotateX(-90deg) translateZ(25px)'
                                }}></div>
                            </motion.div>
                        </div>
                    </Navbar.Brand>
                </div>

                <div className="d-flex align-items-center order-lg-3 ms-lg-3 gap-3">
                    <Button
                        variant="link"
                        onClick={toggleTheme}
                        className="p-2 rounded-circle border-0 d-flex align-items-center justify-content-center"
                        style={{
                            background: 'var(--card-bg)',
                            color: 'var(--text-main)',
                            width: '40px',
                            height: '40px',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                        }}
                    >
                        {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
                    </Button>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                </div>


                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto text-center mt-3 mt-lg-0 rounded p-3 p-lg-0 d-lg-flex">
                        {links.map((link) => (
                            <Nav.Link
                                key={link.hash}
                                as={ScrollLink}
                                to={link.hash.replace('#', '')}
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}
                                className="mx-2 py-2 py-lg-0"
                                style={{ cursor: 'pointer' }}
                                activeClass="active"
                                onClick={() => setExpanded(false)}
                            >
                                {link.name}
                            </Nav.Link>
                        ))}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
};

export default MyNavbar;

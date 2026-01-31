import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Routes, Route } from 'react-router-dom'; // Import Routes
import MyNavbar from './components/MyNavbar';
import Home from './pages/Home';
import About from './pages/About';
import Education from './pages/Education';
import Certifications from './pages/Certifications';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Experience from './pages/Experience';
import Volunteer from './pages/Volunteer';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ThreeBackground from './components/ThreeBackground';
import ScrollReveal from './components/ScrollReveal';
import ScrollProgress from './components/ScrollProgress';
import Preloader from './components/Preloader';
import FloatingResume from './components/FloatingResume';
import SmoothScroll from './components/SmoothScroll';
import NotFound from './pages/NotFound'; // Import NotFound
import { Toaster } from 'react-hot-toast';

function App() {
    const [theme, setTheme] = useState('dark');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);

        // Simulate Loading Time
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2500); // 2.5s for a good effect

        return () => clearTimeout(timer);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    return (
        <div className="d-flex flex-column min-vh-100 overflow-hidden position-relative">
            <AnimatePresence mode="wait">
                {loading && <Preloader loading={loading} />}
            </AnimatePresence>

            {/* Global Decorative Blobs */}
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="blob blob-3"></div>

            <ThreeBackground theme={theme} />

            <Routes>
                <Route path="/" element={
                    <SmoothScroll>
                        <ScrollProgress />
                        <MyNavbar theme={theme} toggleTheme={toggleTheme} />
                        <main className="flex-grow-1">
                            <div id="home" className="w-100">
                                <Home />
                            </div>

                            <section id="about" className="section-padding">
                                <ScrollReveal>
                                    <About />
                                </ScrollReveal>
                            </section>

                            <section id="education" className="section-padding">
                                <ScrollReveal>
                                    <Education />
                                </ScrollReveal>
                            </section>

                            <section id="certifications" className="section-padding">
                                <ScrollReveal>
                                    <Certifications />
                                </ScrollReveal>
                            </section>

                            <section id="projects" className="section-padding">
                                <ScrollReveal>
                                    <Projects />
                                </ScrollReveal>
                            </section>

                            <section id="skills" className="section-padding">
                                <ScrollReveal>
                                    <Skills />
                                </ScrollReveal>
                            </section>

                            <section id="experience" className="section-padding">
                                <ScrollReveal>
                                    <Experience />
                                </ScrollReveal>
                            </section>

                            <section id="volunteer" className="section-padding">
                                <ScrollReveal>
                                    <Volunteer />
                                </ScrollReveal>
                            </section>

                            <section id="contact" className="section-padding">
                                <ScrollReveal>
                                    <Contact />
                                </ScrollReveal>
                            </section>
                        </main>
                        <Footer />
                        <FloatingResume />
                        <ScrollToTop />
                    </SmoothScroll>
                } />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster position="top-right" />
        </div>
    );
}

export default App;

import React, { createContext, useContext, useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';

const ScrollContext = createContext({ lenis: null });

export const useScroll = () => useContext(ScrollContext);

const SmoothScroll = ({ children }) => {
    const [lenis, setLenis] = useState(null);

    // Lenis removed for native performance
    useEffect(() => {
        // Native scroll behavior cleanup if needed
        document.documentElement.style.scrollBehavior = 'smooth';
        return () => {
            document.documentElement.style.scrollBehavior = '';
        };
    }, []);

    return (
        <ScrollContext.Provider value={{ lenis }}>
            {children}
        </ScrollContext.Provider>
    );
};

export default SmoothScroll;

import React, { useEffect, useState, useRef } from 'react';
import { skillsData } from '../data';

const SkillSphere = () => {
    const containerRef = useRef(null);
    const [points, setPoints] = useState([]);

    // Responsive Configuration
    const [dimensions, setDimensions] = useState({ width: 500, height: 500, radius: 250 });
    const dragSpeed = 0.05;

    useEffect(() => {
        const handleResize = () => {
            const width = Math.min(window.innerWidth - 40, 500); // Max 500px, subtract padding
            const height = width;
            const radius = width / 2;
            setDimensions({ width, height, radius });
        };

        handleResize(); // Initial call
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Auto-rotation state
    const rotationRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        // Initial point distribution (Fibonacci Sphere)
        const entries = skillsData;
        const count = entries.length;
        const offset = 2 / count;
        const increment = Math.PI * (3 - Math.sqrt(5));

        const initialPoints = entries.map((skill, i) => {
            const y = ((i * offset) - 1) + (offset / 2);
            const r = Math.sqrt(1 - Math.pow(y, 2));
            const phi = ((i + 1) % count) * increment;

            const x = Math.cos(phi) * r;
            const z = Math.sin(phi) * r;

            return { x, y, z, content: skill };
        });

        setPoints(initialPoints);

        // Animation Loop
        let animationFrameId;

        const animate = () => {
            // Constant slow rotation
            rotationRef.current.x += 0.005;
            rotationRef.current.y += 0.005;

            // Apply rotation to points for rendering (pseudo-3D projection)
            setPoints(prevPoints => {
                const rx = 0.005; // rotation speed x
                const ry = 0.005; // rotation speed y

                return prevPoints.map(p => {
                    // Rotate around Y
                    let x1 = p.x * Math.cos(ry) - p.z * Math.sin(ry);
                    let z1 = p.z * Math.cos(ry) + p.x * Math.sin(ry);

                    // Rotate around X
                    let y1 = p.y * Math.cos(rx) - z1 * Math.sin(rx);
                    let z2 = z1 * Math.cos(rx) + p.y * Math.sin(rx);

                    return { ...p, x: x1, y: y1, z: z2 };
                });
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <div
            className="position-relative d-flex justify-content-center align-items-center mx-auto"
            style={{
                width: `${dimensions.width}px`,
                height: `${dimensions.height}px`,
                perspective: '1000px'
            }}
            ref={containerRef}
        >
            {points.map((point, index) => {
                // Project 3D to 2D
                // Simple weak perspective projection
                // Simple weak perspective projection - Adjusted for less aggressive zoom
                const scale = (2.2 / (2.6 - point.z)); // Max scale ~1.37 (was 2.0), Min scale ~0.61
                const alpha = (point.z + 1.5) / 2.5; // Adjusted alpha for better visibility

                const left = (point.x * dimensions.radius * scale) + dimensions.radius; // Center offset X
                const top = (point.y * dimensions.radius * scale) + dimensions.radius;  // Center offset Y

                const Icon = point.content.icon;

                return (
                    <div
                        key={index}
                        className="position-absolute d-flex align-items-center justify-content-center"
                        style={{
                            left: `${left}px`,
                            top: `${top}px`,
                            transform: `translate(-50%, -50%) scale(${scale})`,
                            opacity: Math.max(0.6, alpha),
                            zIndex: Math.floor(scale * 100),
                            fontSize: '1rem',
                            pointerEvents: 'auto', // Allow hover
                            cursor: 'default'
                        }}
                    >
                        <span
                            className="px-3 py-1 rounded-pill fw-bold text-nowrap transition-all"
                            style={{
                                background: 'var(--glass-pill-bg)',
                                border: '1px solid var(--glass-pill-border)',
                                boxShadow: point.z > 0 ? '0 0 15px rgba(6, 182, 212, 0.2)' : 'none',
                                color: point.z > 0 ? 'var(--glass-pill-text-active)' : 'var(--glass-pill-text-inactive)',
                                backdropFilter: 'blur(4px)',
                                textShadow: point.z > 0 ? '0 0 10px rgba(6, 182, 212, 0.3)' : 'none'
                            }}
                        >
                            <div className="d-flex align-items-center gap-2">
                                <span className="fs-5"><Icon /></span>
                                <span>{point.content.name}</span>
                            </div>
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default SkillSphere;

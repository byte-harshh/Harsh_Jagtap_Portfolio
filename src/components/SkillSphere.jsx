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
                const scale = (2.2 / (2.6 - point.z)); // Max scale ~1.37 (was 2.0), Min scale ~0.61
                const alpha = (point.z + 1.5) / 2.5; // Adjusted alpha for better visibility
                const blur = point.z < 0 ? Math.abs(point.z) * 4 : 0; // Blur items in back

                const left = (point.x * dimensions.radius * scale) + dimensions.radius; // Center offset X
                const top = (point.y * dimensions.radius * scale) + dimensions.radius;  // Center offset Y

                const Icon = point.content.icon;
                const itemColor = point.content.color || '#06b6d4'; // Fallback to cyan

                return (
                    <div
                        key={index}
                        className="position-absolute d-flex align-items-center justify-content-center"
                        style={{
                            left: 0,
                            top: 0,
                            transform: `translate3d(${left}px, ${top}px, 0) translate(-50%, -50%) scale(${scale})`,
                            opacity: Math.max(0.3, alpha), // Lower minimum opacity for depth
                            zIndex: Math.floor(scale * 100),
                            fontSize: '1rem',
                            pointerEvents: 'auto', // Allow hover
                            cursor: 'pointer',
                            filter: `blur(${blur}px)`, // Apply blur based on depth
                            willChange: 'transform, opacity, filter'
                        }}
                    >
                        <span
                            className="px-3 py-1 rounded-pill fw-bold text-nowrap transition-all"
                            style={{
                                background: `rgba(${parseInt(itemColor.slice(1, 3), 16)}, ${parseInt(itemColor.slice(3, 5), 16)}, ${parseInt(itemColor.slice(5, 7), 16)}, 0.15)`, // Low opacity background of item color
                                border: `1px solid ${itemColor}`,
                                boxShadow: point.z > 0 ? `0 0 20px ${itemColor}66` : 'none', // Glow with item color
                                color: 'white', // White text for better contrast
                                backdropFilter: 'blur(4px)',
                                textShadow: point.z > 0 ? `0 0 10px ${itemColor}` : 'none'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = itemColor;
                                e.currentTarget.style.color = 'black';
                                e.currentTarget.style.boxShadow = `0 0 30px ${itemColor}`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = `rgba(${parseInt(itemColor.slice(1, 3), 16)}, ${parseInt(itemColor.slice(3, 5), 16)}, ${parseInt(itemColor.slice(5, 7), 16)}, 0.15)`;
                                e.currentTarget.style.color = 'white';
                                e.currentTarget.style.boxShadow = point.z > 0 ? `0 0 20px ${itemColor}66` : 'none';
                            }}
                        >
                            <div className="d-flex align-items-center gap-2">
                                <span className="fs-5" style={{ color: itemColor }}><Icon /></span>
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

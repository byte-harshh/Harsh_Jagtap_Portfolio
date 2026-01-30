import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground = ({ theme }) => {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene Setup
        const scene = new THREE.Scene();
        // Fog for depth fading - color matches the theme background
        scene.fog = new THREE.FogExp2(theme === 'dark' ? 0x000000 : 0xf0f9ff, 0.002);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 20;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        mountRef.current.appendChild(renderer.domElement);

        // Particles System (Starfield)
        const geometry = new THREE.BufferGeometry();
        const count = 2000;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        // Theme Colors
        const color1 = new THREE.Color(theme === 'dark' ? 0x60a5fa : 0x3b82f6); // Blue
        const color2 = new THREE.Color(theme === 'dark' ? 0x22d3ee : 0x06b6d4); // Cyan

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 100; // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 100; // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 100; // z

            // Randomly assign one of the theme colors
            const mixedColor = Math.random() > 0.5 ? color1 : color2;
            colors[i * 3] = mixedColor.r;
            colors[i * 3 + 1] = mixedColor.g;
            colors[i * 3 + 2] = mixedColor.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.15, // Adjusted for balanced visibility
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        // Blockchain Object
        // Animation Loop
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const handleMouseMove = (event) => {
            mouseX = event.clientX - window.innerWidth / 2;
            mouseY = event.clientY - window.innerHeight / 2;
        };
        document.addEventListener('mousemove', handleMouseMove);

        const clock = new THREE.Clock();

        const animate = () => {
            requestAnimationFrame(animate);

            targetX = mouseX * 0.001;
            targetY = mouseY * 0.001;

            const elapsedTime = clock.getElapsedTime();

            // Continuous rotation
            particles.rotation.y += 0.0005;
            particles.rotation.x += 0.0002;

            // Mouse interaction easing
            particles.rotation.y += 0.05 * (targetX - particles.rotation.y);
            particles.rotation.x += 0.05 * (targetY - particles.rotation.x);

            // Pulse/Breath effect
            const scale = 1 + Math.sin(elapsedTime * 0.5) * 0.05;
            particles.scale.set(scale, scale, scale);

            renderer.render(scene, camera);
        };

        animate();

        // Handle Resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('mousemove', handleMouseMove);
            if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
                mountRef.current.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
        };
    }, [theme]);

    return (
        <div
            ref={mountRef}
            className="position-fixed top-0 start-0 w-100 h-100"
            style={{
                zIndex: -1,
                pointerEvents: 'none',
            }}
        />
    );
};

export default ThreeBackground;

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

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
        renderer.setSize(window.innerWidth, window.innerHeight);
        // PERFORMANCE FIX: Cap pixel ratio to 1.5 to prevent lag on high-res screens
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        mountRef.current.appendChild(renderer.domElement);

        // --- 1. Background Starfield (Static/Slow) ---
        const starGeometry = new THREE.BufferGeometry();
        // RESPONSIVE: Reduce count on mobile/tablet for performance
        const isMobile = window.innerWidth < 768;
        const starCount = isMobile ? 400 : 1200;

        const starPositions = new Float32Array(starCount * 3);
        const starColors = new Float32Array(starCount * 3);

        const color1 = new THREE.Color(theme === 'dark' ? 0x60a5fa : 0x3b82f6); // Blue
        const color2 = new THREE.Color(theme === 'dark' ? 0x22d3ee : 0x06b6d4); // Cyan

        for (let i = 0; i < starCount; i++) {
            starPositions[i * 3] = (Math.random() - 0.5) * 200; // Wider spread X
            starPositions[i * 3 + 1] = (Math.random() - 0.5) * 120; // Spread Y
            starPositions[i * 3 + 2] = (Math.random() * 25) - 10; // FIXED: Range -10 to 15 (Stops before camera at 20)

            const mixedColor = Math.random() > 0.5 ? color1 : color2;
            starColors[i * 3] = mixedColor.r;
            starColors[i * 3 + 1] = mixedColor.g;
            starColors[i * 3 + 2] = mixedColor.b;
        }

        starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
        starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

        const starMaterial = new THREE.PointsMaterial({
            size: 0.18, // Increased size slightly
            vertexColors: true,
            transparent: true,
            opacity: 0.9, // Higher opacity
            sizeAttenuation: true
        });

        const stars = new THREE.Points(starGeometry, starMaterial);
        scene.add(stars);


        // --- 2. Network / Constellation Effect (Active Blockchain Visual) ---
        const nodeCount = isMobile ? 15 : 40; // Reduced on mobile for CPU safety

        const nodes = [];
        const nodeGeometry = new THREE.BufferGeometry();
        const nodePositions = new Float32Array(nodeCount * 3);

        // Initialize Nodes
        for (let i = 0; i < nodeCount; i++) {
            const x = (Math.random() - 0.5) * 160; // Spread X (Much wider)
            const y = (Math.random() - 0.5) * 100;
            const z = (Math.random() * 20) - 5; // FIXED: Range -5 to 15

            nodes.push({
                x, y, z,
                vx: (Math.random() - 0.5) * 0.04, // Velocity
                vy: (Math.random() - 0.5) * 0.04,
                vz: (Math.random() - 0.5) * 0.04
            });

            nodePositions[i * 3] = x;
            nodePositions[i * 3 + 1] = y;
            nodePositions[i * 3 + 2] = z;
        }

        nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
        const nodeMaterial = new THREE.PointsMaterial({
            color: theme === 'dark' ? 0x22d3ee : 0x2563eb,
            size: 0.45, // Larger nodes
            transparent: true,
            opacity: 1.0 // Fully visible
        });
        const nodePoints = new THREE.Points(nodeGeometry, nodeMaterial);
        scene.add(nodePoints);

        // Lines for connections
        const lineMaterial = new THREE.LineBasicMaterial({
            color: theme === 'dark' ? 0x22d3ee : 0x2563eb,
            transparent: true,
            opacity: 0.15, // Almost double opacity (was 0.08)
            vertexColors: false
        });

        // OPTIMIZATION: Pre-allocate line geometry
        const lineGeometry = new THREE.BufferGeometry();
        // Max possible lines = n * (n-1) / 2. For 60 nodes ~ 1770 lines. 
        // 2 points per line * 3 coords per point = 6 floats per line.
        // 1770 * 6 = 10620 floats. Safe to allocate 15000 or dynamically.
        // Let's go with a safe upper bound.
        const maxLines = nodeCount * (nodeCount - 1) / 2;
        const linePositions = new Float32Array(maxLines * 6);
        lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

        const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
        scene.add(lines);


        // Animation Loop
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const handleMouseMove = (event) => {
            mouseX = (event.clientX - window.innerWidth / 2) * 0.60; // Extreme sensitivity
            mouseY = (event.clientY - window.innerHeight / 2) * 0.60;
        };
        // Throttle? For now standard listener is okay if logic inside is light, 
        // but let's add a small check if needed. 
        // Actually, logic is just updating 2 vars, it's fine.
        document.addEventListener('mousemove', handleMouseMove);

        const clock = new THREE.Clock();

        const animate = () => {
            requestAnimationFrame(animate);

            // Cap elapsed time to prevent huge jumps if tab is inactive
            const delta = Math.min(clock.getDelta(), 0.1);
            const elapsedTime = clock.getElapsedTime();

            targetX = mouseX * 0.001;
            targetY = mouseY * 0.001;

            // Rotate starfield (slower, fluid)
            stars.rotation.y += 0.0002;
            stars.rotation.x = Math.sin(elapsedTime * 0.1) * 0.05; // Gentle rocking

            // Interactive Rotation (Stars + Network)
            // Stronger response
            stars.rotation.y += 0.08 * (targetX - stars.rotation.y);
            stars.rotation.x += 0.08 * (targetY - stars.rotation.x);

            nodePoints.rotation.y += 0.08 * (targetX - nodePoints.rotation.y);
            nodePoints.rotation.x += 0.08 * (targetY - nodePoints.rotation.x);

            lines.rotation.y += 0.08 * (targetX - lines.rotation.y);
            lines.rotation.x += 0.08 * (targetY - lines.rotation.x);

            // Parallax Movement (Camera shift)
            // Increased parallax effect
            camera.position.x += (mouseX * 0.01 - camera.position.x) * 0.08;
            camera.position.y += (-mouseY * 0.01 - camera.position.y) * 0.08;
            camera.lookAt(scene.position);


            // Update Nodes & Draw Lines (Adding Flow)
            const positions = nodePoints.geometry.attributes.position.array;
            const connectionDistance = 15; // Increased distance for far nodes to connect

            let lineIdx = 0;

            for (let i = 0; i < nodeCount; i++) {
                const node = nodes[i];

                // Standard Movement
                node.x += node.vx;
                node.y += node.vy;
                node.z += node.vz;

                // Add Fluid Wave Motion
                // A vertical offset based on time and x-position
                const waveY = Math.sin(elapsedTime * 0.5 + node.x * 0.1) * 0.02;
                node.y += waveY;

                // Bounce off boundaries (soft)
                if (node.x > 80 || node.x < -80) node.vx *= -1; // Wider boundary
                if (node.y > 25 || node.y < -25) node.vy *= -1;
                if (node.z > 15 || node.z < -25) node.vz *= -1;

                positions[i * 3] = node.x;
                positions[i * 3 + 1] = node.y;
                positions[i * 3 + 2] = node.z;

                // Check connections
                for (let j = i + 1; j < nodeCount; j++) {
                    const nodeB = nodes[j];
                    const distSq = (node.x - nodeB.x) ** 2 + (node.y - nodeB.y) ** 2 + (node.z - nodeB.z) ** 2;

                    if (distSq < connectionDistance ** 2) {
                        // OPTIMIZATION: Write directly to pre-allocated buffer
                        linePositions[lineIdx++] = node.x;
                        linePositions[lineIdx++] = node.y;
                        linePositions[lineIdx++] = node.z;

                        linePositions[lineIdx++] = nodeB.x;
                        linePositions[lineIdx++] = nodeB.y;
                        linePositions[lineIdx++] = nodeB.z;
                    }
                }
            }

            nodePoints.geometry.attributes.position.needsUpdate = true;

            // Updated Lines
            // Only update the range of used vertices
            lines.geometry.setDrawRange(0, lineIdx / 3);
            lines.geometry.attributes.position.needsUpdate = true;

            renderer.render(scene, camera);
        };

        animate();

        // Handle Resize with Debounce
        let resizeTimeout;
        const handleResize = () => {
            if (resizeTimeout) clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
                // Maintain pixel ratio cap on resize
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
            }, 100);
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('mousemove', handleMouseMove);
            if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
                mountRef.current.removeChild(renderer.domElement);
            }
            starGeometry.dispose();
            starMaterial.dispose();
            nodeGeometry.dispose();
            nodeMaterial.dispose();
            lineGeometry.dispose();
            lineMaterial.dispose();
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

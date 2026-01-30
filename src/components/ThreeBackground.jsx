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

        // --- 1. Background Starfield (Static/Slow) ---
        const starGeometry = new THREE.BufferGeometry();
        const starCount = 1500;
        const starPositions = new Float32Array(starCount * 3);
        const starColors = new Float32Array(starCount * 3);

        const color1 = new THREE.Color(theme === 'dark' ? 0x60a5fa : 0x3b82f6); // Blue
        const color2 = new THREE.Color(theme === 'dark' ? 0x22d3ee : 0x06b6d4); // Cyan

        for (let i = 0; i < starCount; i++) {
            starPositions[i * 3] = (Math.random() - 0.5) * 120;
            starPositions[i * 3 + 1] = (Math.random() - 0.5) * 120;
            starPositions[i * 3 + 2] = (Math.random() * 80) - 60;

            const mixedColor = Math.random() > 0.5 ? color1 : color2;
            starColors[i * 3] = mixedColor.r;
            starColors[i * 3 + 1] = mixedColor.g;
            starColors[i * 3 + 2] = mixedColor.b;
        }

        starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
        starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

        const starMaterial = new THREE.PointsMaterial({
            size: 0.1,
            vertexColors: true,
            transparent: true,
            opacity: 0.8, // Increased for "alive" feel
            sizeAttenuation: true
        });

        const stars = new THREE.Points(starGeometry, starMaterial);
        scene.add(stars);


        // --- 2. Network / Constellation Effect (Active Blockchain Visual) ---
        const nodeCount = 35; // Reduced from 70 to be "little bit"
        const nodes = [];
        const nodeGeometry = new THREE.BufferGeometry();
        const nodePositions = new Float32Array(nodeCount * 3);

        // Initialize Nodes
        for (let i = 0; i < nodeCount; i++) {
            const x = (Math.random() - 0.5) * 50;
            const y = (Math.random() - 0.5) * 50;
            const z = (Math.random() - 0.5) * 30;

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
            size: 0.3,
            transparent: true,
            opacity: 0.8
        });
        const nodePoints = new THREE.Points(nodeGeometry, nodeMaterial);
        scene.add(nodePoints);

        // Lines for connections
        const lineMaterial = new THREE.LineBasicMaterial({
            color: theme === 'dark' ? 0x22d3ee : 0x2563eb,
            transparent: true,
            opacity: 0.12 // Reduced opacity for subtlety
        });
        const lineGeometry = new THREE.BufferGeometry();
        const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
        scene.add(lines);


        // Animation Loop
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const handleMouseMove = (event) => {
            mouseX = (event.clientX - window.innerWidth / 2) * 0.1; // Restored sensitivity
            mouseY = (event.clientY - window.innerHeight / 2) * 0.1;
        };
        document.addEventListener('mousemove', handleMouseMove);

        const clock = new THREE.Clock();

        const animate = () => {
            requestAnimationFrame(animate);

            targetX = mouseX * 0.001;
            targetY = mouseY * 0.001;

            // Rotate starfield
            stars.rotation.y += 0.0003;
            stars.rotation.x += 0.0001;

            // Interactive Rotation (Stars + Network)
            // Soft easing towards mouse position
            stars.rotation.y += 0.05 * (targetX - stars.rotation.y);
            stars.rotation.x += 0.05 * (targetY - stars.rotation.x);

            nodePoints.rotation.y += 0.05 * (targetX - nodePoints.rotation.y);
            nodePoints.rotation.x += 0.05 * (targetY - nodePoints.rotation.x);

            lines.rotation.y += 0.05 * (targetX - lines.rotation.y);
            lines.rotation.x += 0.05 * (targetY - lines.rotation.x);


            // Update Nodes & Draw Lines
            const positions = nodePoints.geometry.attributes.position.array;
            const linePositions = [];
            const connectionDistance = 9;

            for (let i = 0; i < nodeCount; i++) {
                const node = nodes[i];

                // Move
                node.x += node.vx;
                node.y += node.vy;
                node.z += node.vz;

                // Bounce off boundaries (soft)
                if (node.x > 25 || node.x < -25) node.vx *= -1;
                if (node.y > 25 || node.y < -25) node.vy *= -1;
                if (node.z > 15 || node.z < -15) node.vz *= -1;

                // Mouse Interaction (repel slightly)
                // const dx = node.x - mouseX; // Can add complexity here if needed

                positions[i * 3] = node.x;
                positions[i * 3 + 1] = node.y;
                positions[i * 3 + 2] = node.z;

                // Check connections
                for (let j = i + 1; j < nodeCount; j++) {
                    const nodeB = nodes[j];
                    const distSq = (node.x - nodeB.x) ** 2 + (node.y - nodeB.y) ** 2 + (node.z - nodeB.z) ** 2;

                    if (distSq < connectionDistance ** 2) {
                        linePositions.push(node.x, node.y, node.z);
                        linePositions.push(nodeB.x, nodeB.y, nodeB.z);
                    }
                }
            }

            nodePoints.geometry.attributes.position.needsUpdate = true;

            // Update Lines
            lines.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

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

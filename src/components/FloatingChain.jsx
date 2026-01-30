import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const FloatingChain = () => {
    const mountRef = useRef(null);
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene Setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 400 / 600, 0.1, 1000); // Approximate aspect ratio or dynamic
        camera.position.z = 15;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight); // Use full window for absolute positioning
        renderer.setPixelRatio(window.devicePixelRatio);
        mountRef.current.appendChild(renderer.domElement);

        // Resize handler
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);


        // --- Blockchain Object ---
        const blockchainGroup = new THREE.Group();
        // Position heavily to the left
        blockchainGroup.position.set(-10, 0, -2); // Left side

        const blockGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);

        // Dynamic colors based on theme (read from attribute initially, might need Context for reactivity but this is simpler)
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

        const blockMat = new THREE.MeshBasicMaterial({
            color: isDark ? 0x60a5fa : 0x3b82f6,
            wireframe: true,
            transparent: true,
            opacity: 0.15
        });
        const edgeColor = isDark ? 0x22d3ee : 0x0891b2;
        const edgeMat = new THREE.LineBasicMaterial({ color: edgeColor, transparent: true, opacity: 0.4 });

        const linkColor = isDark ? 0x7c3aed : 0x6d28d9;

        // Create longer, complex chain
        const numBlocks = 12; // "Add more blocks"

        for (let i = 0; i < numBlocks; i++) {
            const mesh = new THREE.Mesh(blockGeo, blockMat);

            // Create a winding S-shape or spiral
            const t = i * 0.5;
            const xPos = Math.sin(t) * 2; // Winding X
            const yPos = (i - numBlocks / 2) * 1.5; // Vertical stack spread
            const zPos = Math.cos(t) * 2; // Winding Z

            mesh.position.set(xPos, yPos, zPos);

            const edges = new THREE.EdgesGeometry(blockGeo);
            const line = new THREE.LineSegments(edges, edgeMat);
            mesh.add(line);

            const coreGeo = new THREE.BoxGeometry(0.4, 0.4, 0.4);
            const coreMat = new THREE.MeshBasicMaterial({ color: linkColor, transparent: true, opacity: 0.8 });
            const core = new THREE.Mesh(coreGeo, coreMat);
            mesh.add(core);

            blockchainGroup.add(mesh);

            // Links
            if (i < numBlocks - 1) {
                const nextT = (i + 1) * 0.5;
                const nextX = Math.sin(nextT) * 2;
                const nextY = ((i + 1) - numBlocks / 2) * 1.5;
                const nextZ = Math.cos(nextT) * 2;

                const dist = Math.sqrt(Math.pow(nextX - xPos, 2) + Math.pow(nextY - yPos, 2) + Math.pow(nextZ - zPos, 2));
                const midX = (xPos + nextX) / 2;
                const midY = (yPos + nextY) / 2;
                const midZ = (zPos + nextZ) / 2;

                const linkGeo = new THREE.CylinderGeometry(0.05, 0.05, dist, 6);
                const linkMesh = new THREE.Mesh(linkGeo, new THREE.MeshBasicMaterial({ color: edgeColor, opacity: 0.3, transparent: true }));

                linkMesh.position.set(midX, midY, midZ);
                linkMesh.lookAt(nextX, nextY, nextZ);
                linkMesh.rotateX(Math.PI / 2); // Cylinder default is Y-axis alignment

                blockchainGroup.add(linkMesh);
            }
        }

        blockchainGroup.scale.set(1.2, 1.2, 1.2); // Bigger
        scene.add(blockchainGroup);
        // -------------------------

        const clock = new THREE.Clock();

        const animate = () => {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            // Float & Rotate
            blockchainGroup.rotation.y = elapsedTime * 0.1;
            blockchainGroup.rotation.z = Math.sin(elapsedTime * 0.2) * 0.1;
            blockchainGroup.position.y = Math.sin(elapsedTime * 0.3) * 0.5;

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
                mountRef.current.removeChild(renderer.domElement);
            }
            // Dispose geometries/materials ideally
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className="position-absolute start-0 top-0 w-100 h-100"
            style={{
                zIndex: 0,
                pointerEvents: 'none',
                overflow: 'hidden' // Ensure it doesn't cause scrolling
            }}
        />
    );
};

export default FloatingChain;

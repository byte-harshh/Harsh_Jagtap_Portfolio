import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Hero3D = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.z = 2.5;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(400, 400); // Fixed size container
        mountRef.current.appendChild(renderer.domElement);

        // Geometry - Techy Icosahedron
        const geometry = new THREE.IcosahedronGeometry(1.2, 0); // Low poly for tech look

        // Material 1: Wireframe
        const wireframeMaterial = new THREE.MeshBasicMaterial({
            color: 0x22d3ee, // Cyan
            wireframe: true,
            transparent: true,
            opacity: 0.5
        });
        const wireframeMesh = new THREE.Mesh(geometry, wireframeMaterial);
        scene.add(wireframeMesh);

        // Material 2: Inner Fill (Slightly visible)
        const fillMaterial = new THREE.MeshBasicMaterial({
            color: 0x3b82f6, // Blue
            transparent: true,
            opacity: 0.1
        });
        const fillMesh = new THREE.Mesh(geometry, fillMaterial);
        scene.add(fillMesh);

        // Particles removed for cleaner look

        // Animation State
        let mouseX = 0;
        let mouseY = 0;
        let targetTiltX = 0;
        let targetTiltY = 0;
        let currentTiltX = 0;
        let currentTiltY = 0;
        let baseRotation = 0;

        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        const onDocumentMouseMove = (event) => {
            mouseX = (event.clientX - windowHalfX);
            mouseY = (event.clientY - windowHalfY);
        };

        document.addEventListener('mousemove', onDocumentMouseMove);

        const animate = () => {
            requestAnimationFrame(animate);

            // 1. Accumulate Base Rotation (Constant Auto-Rotation)
            // Slower constant rotation
            baseRotation += 0.002;

            // 2. Calculate Tilt Targets based on mouse position
            targetTiltX = mouseX * 0.001;
            targetTiltY = mouseY * 0.001;

            // 3. Smoothly Interpolate Current Tilt towards Target Tilt
            currentTiltX += 0.02 * (targetTiltX - currentTiltX);
            currentTiltY += 0.02 * (targetTiltY - currentTiltY);

            // 4. Apply Combined Rotation (Base + Tilt)
            // Note: We apply tilt to specific axes to keep it feeling natural

            // X-Axis Rotation: Constant base speed + Mouse Y tilt
            const totalRotationX = baseRotation + currentTiltY;

            // Y-Axis Rotation: Constant base speed + Mouse X tilt
            const totalRotationY = baseRotation + currentTiltX;

            wireframeMesh.rotation.x = totalRotationX;
            wireframeMesh.rotation.y = totalRotationY;

            fillMesh.rotation.x = totalRotationX;
            fillMesh.rotation.y = totalRotationY;

            // Rotate Particles Opposite (Remove)

            renderer.render(scene, camera);
        };
        animate();

        // Cleanup
        return () => {
            document.removeEventListener('mousemove', onDocumentMouseMove);
            if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
                mountRef.current.removeChild(renderer.domElement);
            }
            geometry.dispose();
            wireframeMaterial.dispose();
            fillMaterial.dispose();
            // particlesGeometry.dispose();
            // particlesMaterial.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className="d-flex justify-content-center align-items-center animate-float"
            style={{ width: '400px', height: '400px' }}
        />
    );
};

export default Hero3D;

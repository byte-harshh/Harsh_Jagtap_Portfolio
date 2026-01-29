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

        // Particles around it
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 50;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 4;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.05,
            color: 0x6366f1, // Indigo
            transparent: true,
            opacity: 0.8
        });
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // Animation
        const animate = () => {
            requestAnimationFrame(animate);

            // Rotate Main Object
            wireframeMesh.rotation.x += 0.005;
            wireframeMesh.rotation.y += 0.005;
            fillMesh.rotation.x += 0.005;
            fillMesh.rotation.y += 0.005;

            // Rotate Particles Opposite
            particlesMesh.rotation.y -= 0.002;

            renderer.render(scene, camera);
        };
        animate();

        // Cleanup
        return () => {
            if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
                mountRef.current.removeChild(renderer.domElement);
            }
            geometry.dispose();
            wireframeMaterial.dispose();
            fillMaterial.dispose();
            particlesGeometry.dispose();
            particlesMaterial.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className="d-flex justify-content-center align-items-center"
            style={{ width: '400px', height: '400px' }}
        />
    );
};

export default Hero3D;

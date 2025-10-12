'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Particle system (reduced for better readability)
    const isMobile = window.innerWidth < 640;
    const particleCount = isMobile ? 800 : 1500; // Reduced from 2500/5000
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Position (more spread out)
      positions[i] = (Math.random() - 0.5) * 25;
      positions[i + 1] = (Math.random() - 0.5) * 25;
      positions[i + 2] = (Math.random() - 0.5) * 25;

      // Rainbow colors (HSL: 0.5-0.8 hue range)
      const hue = 0.5 + Math.random() * 0.3;
      const color = new THREE.Color().setHSL(hue, 1, 0.6);
      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.12, // Smaller particles
      vertexColors: true,
      transparent: true,
      opacity: 0.4, // Much more subtle (reduced from 0.8)
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // Geometric shapes (more subtle and pushed back)
    // 1. Torus Knot (Cyan)
    const torusKnot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1.5, 0.4, 100, 16),
      new THREE.MeshBasicMaterial({
        color: 0x00f3ff,
        wireframe: true,
        transparent: true,
        opacity: 0.15, // More subtle
      })
    );
    torusKnot.position.set(-4, 0, -8); // Pushed further back
    scene.add(torusKnot);

    // 2. Icosahedron (Magenta)
    const icosahedron = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.5, 0),
      new THREE.MeshBasicMaterial({
        color: 0xff00ff,
        wireframe: true,
        transparent: true,
        opacity: 0.15, // More subtle
      })
    );
    icosahedron.position.set(4, 0, -8); // Pushed further back
    scene.add(icosahedron);

    // 3. Octahedron (Purple)
    const octahedron = new THREE.Mesh(
      new THREE.OctahedronGeometry(1.2, 0),
      new THREE.MeshBasicMaterial({
        color: 0x7b2ff7,
        wireframe: true,
        transparent: true,
        opacity: 0.15, // More subtle
      })
    );
    octahedron.position.set(0, 3, -10); // Pushed further back
    scene.add(octahedron);

    // Mouse interaction
    const mouse = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Rotate particles (slower for less distraction)
      particleSystem.rotation.y += 0.0002;
      particleSystem.rotation.x += 0.0001;

      // Rotate and float geometric shapes
      torusKnot.rotation.x += 0.003;
      torusKnot.rotation.y += 0.004;
      torusKnot.position.y = Math.sin(time * 0.5) * 0.5;

      icosahedron.rotation.x += 0.004;
      icosahedron.rotation.y += 0.005;
      icosahedron.position.y = Math.sin(time * 0.7) * 0.5;

      octahedron.rotation.x += 0.005;
      octahedron.rotation.y += 0.003;
      octahedron.position.y = 3 + Math.sin(time * 0.6) * 0.5;

      // Camera follows mouse (parallax effect with smooth lerp)
      targetRotation.x = mouse.y * 0.3;
      targetRotation.y = mouse.x * 0.3;

      camera.rotation.x += (targetRotation.x - camera.rotation.x) * 0.05;
      camera.rotation.y += (targetRotation.y - camera.rotation.y) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ background: '#000000' }}
    />
  );
}


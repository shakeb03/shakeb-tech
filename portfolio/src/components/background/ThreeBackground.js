import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Subtle Particle System - Much More Elegant
const Particles = () => {
  const particlesRef = useRef();
  const particleCount = 800; // Reduced from 5000 to 800

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Random positions in a larger space
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

      // Subtle brand colors only (cyan/purple/pink)
      const brandColors = [
        new THREE.Color('#06b6d4'), // Cyan
        new THREE.Color('#a855f7'), // Purple
        new THREE.Color('#ec4899')  // Pink
      ];
      const color = brandColors[Math.floor(Math.random() * 3)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Smaller, more subtle sizes
      sizes[i] = Math.random() * 0.8 + 0.3; // Smaller particles
    }

    return { positions, colors, sizes };
  }, [particleCount]);

  // Animate particles
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0002;
      particlesRef.current.rotation.x += 0.0001;

      const positions = particlesRef.current.geometry.attributes.position.array;
      const time = state.clock.elapsedTime;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        // Add floating animation
        positions[i3 + 1] += Math.sin(time + i) * 0.001;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={particles.colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particleCount}
          array={particles.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.3}
        vertexColors
        transparent
        opacity={0.25} // Much more subtle (was 0.6)
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Torus Knot
const TorusKnotShape = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={[-15, 10, -30]}>
      <torusKnotGeometry args={[3, 1, 128, 16]} />
      <meshStandardMaterial
        color="#06b6d4"
        transparent
        opacity={0.15} // More subtle (was 0.3)
        wireframe
        emissive="#06b6d4"
        emissiveIntensity={0.3} // Less glow (was 0.5)
      />
    </mesh>
  );
};

// Icosahedron
const IcosahedronShape = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.25;
    }
  });

  return (
    <mesh ref={meshRef} position={[15, -10, -25]}>
      <icosahedronGeometry args={[4, 0]} />
      <meshStandardMaterial
        color="#a855f7"
        transparent
        opacity={0.15} // More subtle (was 0.3)
        wireframe
        emissive="#a855f7"
        emissiveIntensity={0.3} // Less glow (was 0.5)
      />
    </mesh>
  );
};

// Octahedron
const OctahedronShape = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 15, -35]}>
      <octahedronGeometry args={[5, 0]} />
      <meshStandardMaterial
        color="#ec4899"
        transparent
        opacity={0.15} // More subtle (was 0.3)
        wireframe
        emissive="#ec4899"
        emissiveIntensity={0.3} // Less glow (was 0.5)
      />
    </mesh>
  );
};

// Mouse-Reactive Camera - More Subtle Movement
const MouseCamera = () => {
  useFrame((state) => {
    const { mouse, camera } = state;
    // Very subtle camera movement - less distracting
    camera.position.x += (mouse.x * 1 - camera.position.x) * 0.02; // Reduced movement
    camera.position.y += (-mouse.y * 1 - camera.position.y) * 0.02; // Reduced movement
    camera.lookAt(0, 0, 0);
  });

  return null;
};

// Main 3D Scene - Subtle and Elegant
const ThreeBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" style={{ opacity: 0.7 }}>
      <Canvas
        camera={{ position: [0, 0, 30], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        {/* Subtle Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#06b6d4" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#a855f7" />
        <pointLight position={[0, 10, -10]} intensity={0.3} color="#ec4899" />

        {/* Mouse-reactive camera */}
        <MouseCamera />

        {/* Particles */}
        <Particles />

        {/* 3D Shapes */}
        <TorusKnotShape />
        <IcosahedronShape />
        <OctahedronShape />

        {/* Optional: Allow subtle rotation control */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          autoRotate
          autoRotateSpeed={0.2}
        />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;


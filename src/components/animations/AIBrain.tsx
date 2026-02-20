"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Brain() {
    const groupRef = useRef<THREE.Group>(null);
    const particlesRef = useRef<THREE.Points>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
        }
        if (particlesRef.current) {
            particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
        }
    });

    // Create brain-like structure with particles
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        // Create brain-like shape (two hemispheres)
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const radius = 0.8 + Math.random() * 0.4;

        let x = radius * Math.sin(phi) * Math.cos(theta);
        let y = radius * Math.sin(phi) * Math.sin(theta);
        let z = radius * Math.cos(phi);

        // Add some noise for organic look
        x += (Math.random() - 0.5) * 0.3;
        y += (Math.random() - 0.5) * 0.3;
        z += (Math.random() - 0.5) * 0.3;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        // Color gradient
        colors[i * 3] = 0; // R
        colors[i * 3 + 1] = 0.94; // G (cyan)
        colors[i * 3 + 2] = 1; // B
    }

    return (
        <group ref={groupRef}>
            {/* Main brain structure */}
            <mesh>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial
                    color="#00f0ff"
                    emissive="#00f0ff"
                    emissiveIntensity={0.3}
                    wireframe
                    transparent
                    opacity={0.4}
                />
            </mesh>

            {/* Particles */}
            <points ref={particlesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[positions, 3]}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        args={[colors, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.04}
                    vertexColors
                    transparent
                    opacity={0.8}
                    sizeAttenuation
                />
            </points>

            {/* Pulsing core */}
            <mesh>
                <sphereGeometry args={[0.3, 16, 16]} />
                <meshStandardMaterial
                    color="#b000ff"
                    emissive="#b000ff"
                    emissiveIntensity={1}
                />
            </mesh>

            <pointLight position={[0, 0, 0]} intensity={2} color="#00f0ff" />
        </group>
    );
}

export default function AIBrain() {
    return (
        <Canvas camera={{ position: [0, 0, 3.5] }}>
            <ambientLight intensity={0.3} />
            <Brain />
        </Canvas>
    );
}

"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Sphere() {
    const meshRef = useRef<THREE.Mesh>(null);
    const particlesRef = useRef<THREE.Points>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
        }
        if (particlesRef.current) {
            particlesRef.current.rotation.y = state.clock.elapsedTime * 0.2;
        }
    });

    // Create particles around sphere
    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const radius = 2 + Math.random() * 0.5;

        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    return (
        <group>
            <mesh ref={meshRef}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial
                    color="#b000ff"
                    emissive="#b000ff"
                    emissiveIntensity={0.5}
                    metalness={0.9}
                    roughness={0.1}
                    wireframe
                />
            </mesh>
            <points ref={particlesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[positions, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial size={0.05} color="#00f0ff" transparent opacity={0.6} />
            </points>
            <pointLight position={[0, 0, 0]} intensity={1} color="#b000ff" />
        </group>
    );
}

export default function FloatingSphere() {
    return (
        <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.3} />
            <Sphere />
        </Canvas>
    );
}

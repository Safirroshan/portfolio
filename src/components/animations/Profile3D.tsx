"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import Image from "next/image";
import { motion } from "framer-motion";

function ProfileCard() {
    const meshRef = useRef<THREE.Mesh>(null);
    const groupRef = useRef<THREE.Group>(null);
    const particlesRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            // Gentle floating animation
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
        }

        // Animate particles
        if (particlesRef.current) {
            particlesRef.current.rotation.z = state.clock.elapsedTime * 0.3;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Main Card */}
            <mesh ref={meshRef} position={[0, 0, 0]}>
                <boxGeometry args={[3, 4, 0.1]} />
                <meshStandardMaterial
                    color="#0a0a0f"
                    metalness={0.8}
                    roughness={0.2}
                    emissive="#00f0ff"
                    emissiveIntensity={0.2}
                />
            </mesh>

            {/* Glowing Border */}
            <mesh position={[0, 0, -0.06]}>
                <boxGeometry args={[3.1, 4.1, 0.05]} />
                <meshStandardMaterial
                    color="#00f0ff"
                    emissive="#00f0ff"
                    emissiveIntensity={0.5}
                    transparent
                    opacity={0.6}
                />
            </mesh>

            {/* Corner Accents */}
            {[
                [-1.4, 1.9, 0.1],
                [1.4, 1.9, 0.1],
                [-1.4, -1.9, 0.1],
                [1.4, -1.9, 0.1],
            ].map((pos, i) => (
                <mesh key={i} position={pos as [number, number, number]}>
                    <boxGeometry args={[0.3, 0.3, 0.05]} />
                    <meshStandardMaterial
                        color="#b000ff"
                        emissive="#b000ff"
                        emissiveIntensity={0.8}
                    />
                </mesh>
            ))}

            {/* Floating Particles */}
            <group ref={particlesRef}>
                {[...Array(8)].map((_, i) => {
                    const angle = (i / 8) * Math.PI * 2;
                    const radius = 2.5;
                    return (
                        <mesh
                            key={i}
                            position={[
                                Math.cos(angle) * radius,
                                Math.sin(angle) * radius * 0.5,
                                0.5,
                            ]}
                        >
                            <sphereGeometry args={[0.05, 16, 16]} />
                            <meshStandardMaterial
                                color="#00f0ff"
                                emissive="#00f0ff"
                                emissiveIntensity={1}
                            />
                        </mesh>
                    );
                })}
            </group>

            {/* Lights */}
            <pointLight position={[0, 0, 2]} intensity={1} color="#00f0ff" />
            <pointLight position={[2, 2, 1]} intensity={0.5} color="#b000ff" />
        </group>
    );
}

export default function Profile3D() {
    return (
        <div className="relative w-full h-full">
            {/* 3D Canvas */}
            <Canvas className="absolute inset-0">
                <PerspectiveCamera makeDefault position={[0, 0, 8]} />
                <ambientLight intensity={0.3} />
                <ProfileCard />
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                />
            </Canvas>

            {/* 2D Profile Image Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="relative"
                >
                    <div className="relative w-64 h-64 rounded-2xl overflow-hidden border-4 border-neon-blue/50 shadow-[0_0_50px_rgba(0,240,255,0.6)]">
                        <Image
                            src="/profile.jpeg"
                            alt="Safir Profile"
                            fill
                            className="object-cover"
                            style={{
                                mixBlendMode: 'lighten',
                                filter: 'contrast(1.2) brightness(1.1) saturate(1.1)'
                            }}
                            priority
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-background/40 pointer-events-none" />
                        
                        {/* Scan Line Effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-blue/20 to-transparent"
                            animate={{ y: ['-100%', '200%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

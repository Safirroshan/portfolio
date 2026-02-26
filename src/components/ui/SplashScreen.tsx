"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// 3D Scene — Floating geometric shapes
function Scene() {
    const torusRef = useRef<THREE.Mesh>(null);
    const octa1Ref = useRef<THREE.Mesh>(null);
    const octa2Ref = useRef<THREE.Mesh>(null);
    const ico1Ref = useRef<THREE.Mesh>(null);
    const ico2Ref = useRef<THREE.Mesh>(null);
    const ringRef = useRef<THREE.Mesh>(null);
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const t = state.clock.elapsedTime;

        if (torusRef.current) {
            torusRef.current.rotation.x = t * 0.15;
            torusRef.current.rotation.y = t * 0.25;
        }
        if (octa1Ref.current) {
            octa1Ref.current.rotation.x = t * 0.3;
            octa1Ref.current.rotation.z = t * 0.2;
            octa1Ref.current.position.y = Math.sin(t * 0.5) * 0.5 + 1.5;
        }
        if (octa2Ref.current) {
            octa2Ref.current.rotation.y = t * 0.4;
            octa2Ref.current.position.y = Math.sin(t * 0.6 + 1) * 0.4 - 1;
        }
        if (ico1Ref.current) {
            ico1Ref.current.rotation.y = t * 0.3;
            ico1Ref.current.rotation.x = t * 0.15;
            ico1Ref.current.position.y = Math.sin(t * 0.4 + 2) * 0.3;
        }
        if (ico2Ref.current) {
            ico2Ref.current.rotation.z = t * 0.25;
            ico2Ref.current.position.y = Math.sin(t * 0.5 + 3) * 0.4 + 0.5;
        }
        if (ringRef.current) {
            ringRef.current.rotation.x = Math.PI * 0.5 + Math.sin(t * 0.2) * 0.1;
            ringRef.current.rotation.z = t * 0.1;
        }
        if (groupRef.current) {
            groupRef.current.rotation.y = t * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Center Torus Knot — wireframe */}
            <mesh ref={torusRef} position={[0, 0, 0]}>
                <torusKnotGeometry args={[1.6, 0.4, 128, 32]} />
                <meshStandardMaterial
                    color="#1e40af"
                    wireframe
                    transparent
                    opacity={0.35}
                />
            </mesh>

            {/* Solid Octahedron — top right */}
            <mesh ref={octa1Ref} position={[3, 1.5, -2]}>
                <octahedronGeometry args={[0.6]} />
                <meshStandardMaterial
                    color="#6366f1"
                    metalness={0.9}
                    roughness={0.15}
                    emissive="#4338ca"
                    emissiveIntensity={0.2}
                />
            </mesh>

            {/* Solid Octahedron — bottom left */}
            <mesh ref={octa2Ref} position={[-3.5, -1, -1]}>
                <octahedronGeometry args={[0.4]} />
                <meshStandardMaterial
                    color="#0ea5e9"
                    metalness={0.8}
                    roughness={0.2}
                    emissive="#0284c7"
                    emissiveIntensity={0.15}
                />
            </mesh>

            {/* Icosahedron — left */}
            <mesh ref={ico1Ref} position={[-2.5, 0, -1.5]}>
                <icosahedronGeometry args={[0.5]} />
                <meshStandardMaterial
                    color="#7c3aed"
                    metalness={0.7}
                    roughness={0.25}
                    emissive="#6d28d9"
                    emissiveIntensity={0.15}
                />
            </mesh>

            {/* Small Icosahedron — right */}
            <mesh ref={ico2Ref} position={[2.5, 0.5, -0.5]}>
                <icosahedronGeometry args={[0.35]} />
                <meshStandardMaterial
                    color="#06b6d4"
                    metalness={0.8}
                    roughness={0.2}
                    emissive="#0891b2"
                    emissiveIntensity={0.2}
                />
            </mesh>

            {/* Large Ring */}
            <mesh ref={ringRef} position={[0, 0, -1]}>
                <torusGeometry args={[3.5, 0.02, 16, 100]} />
                <meshStandardMaterial
                    color="#3b82f6"
                    emissive="#2563eb"
                    emissiveIntensity={0.5}
                    transparent
                    opacity={0.3}
                />
            </mesh>

            {/* Scattered Particles */}
            {[...Array(30)].map((_, i) => {
                const theta = (i / 30) * Math.PI * 2;
                const r = 2.5 + Math.sin(i * 1.7) * 1.5;
                return (
                    <mesh key={i} position={[Math.cos(theta) * r, Math.sin(theta) * r * 0.4, Math.sin(i) * -1]}>
                        <sphereGeometry args={[0.025, 8, 8]} />
                        <meshStandardMaterial color="#60a5fa" emissive="#3b82f6" emissiveIntensity={2} />
                    </mesh>
                );
            })}

            {/* Lighting */}
            <ambientLight intensity={0.3} />
            <pointLight position={[5, 5, 5]} intensity={0.8} color="#3b82f6" />
            <pointLight position={[-5, -3, 3]} intensity={0.5} color="#7c3aed" />
            <pointLight position={[0, 0, 5]} intensity={0.4} color="#f0f0ff" />
        </group>
    );
}

interface SplashScreenProps {
    onEnter: () => void;
}

export default function SplashScreen({ onEnter }: SplashScreenProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if mobile
        setIsMobile(window.innerWidth < 768);

        // Auto-transition after 3.5 seconds
        const timer = setTimeout(() => {
            onEnter();
        }, 3500);

        return () => clearTimeout(timer);
    }, [onEnter]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#020617] overflow-hidden"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
        >
            {/* 3D Background */}
            <div className="absolute inset-0 z-0">
                <Suspense fallback={null}>
                    <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
                        <Scene />
                    </Canvas>
                </Suspense>
            </div>

            {/* Soft vignette */}
            <div className="absolute inset-0 z-10 pointer-events-none" style={{
                background: 'radial-gradient(ellipse at center, transparent 40%, rgba(2,6,23,0.7) 100%)'
            }} />

            {/* Bottom — Desktop Notice (only on mobile) */}
            {isMobile && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="absolute bottom-12 z-20 text-center px-4"
                >
                    <p className="text-[11px] text-gray-400 font-mono tracking-wider">
                        Use desktop for the best experience
                    </p>
                </motion.div>
            )}

            {/* Loading Progress Bar */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-32 h-[2px] bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-[#3b82f6] to-[#7c3aed] rounded-full"
                />
            </div>
        </motion.div>
    );
}

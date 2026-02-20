"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface ModelProps {
    type: "brain" | "chip" | "network" | "ai-core";
}

function InteractiveModel({ type }: ModelProps) {
    const meshRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (meshRef.current) {
            if (hovered) {
                meshRef.current.rotation.y += 0.02;
                meshRef.current.rotation.x += 0.01;
            } else {
                meshRef.current.rotation.y += 0.005;
            }
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
        }
    });

    const renderModel = () => {
        switch (type) {
            case "brain":
                return (
                    <group ref={meshRef}>
                        {/* Brain structure */}
                        <mesh>
                            <sphereGeometry args={[2, 32, 32]} />
                            <meshStandardMaterial
                                color="#00f0ff"
                                emissive="#00f0ff"
                                emissiveIntensity={hovered ? 0.6 : 0.3}
                                wireframe
                                transparent
                                opacity={0.6}
                            />
                        </mesh>
                        {/* Inner core */}
                        <mesh>
                            <sphereGeometry args={[1, 16, 16]} />
                            <meshStandardMaterial
                                color="#b000ff"
                                emissive="#b000ff"
                                emissiveIntensity={hovered ? 1 : 0.5}
                            />
                        </mesh>
                        {/* Orbiting particles */}
                        {[...Array(20)].map((_, i) => {
                            const angle = (i / 20) * Math.PI * 2;
                            return (
                                <mesh
                                    key={i}
                                    position={[
                                        Math.cos(angle) * 2.5,
                                        Math.sin(angle * 2) * 0.5,
                                        Math.sin(angle) * 2.5
                                    ]}
                                >
                                    <sphereGeometry args={[0.1, 8, 8]} />
                                    <meshStandardMaterial
                                        color="#00ff88"
                                        emissive="#00ff88"
                                        emissiveIntensity={1}
                                    />
                                </mesh>
                            );
                        })}
                    </group>
                );

            case "chip":
                return (
                    <group ref={meshRef}>
                        {/* Main chip */}
                        <mesh>
                            <boxGeometry args={[3, 0.4, 3]} />
                            <meshStandardMaterial
                                color="#0a0a0f"
                                metalness={0.9}
                                roughness={0.1}
                                emissive="#00f0ff"
                                emissiveIntensity={hovered ? 0.4 : 0.2}
                            />
                        </mesh>
                        {/* Circuit lines */}
                        {[-1, -0.5, 0, 0.5, 1].map((pos, i) => (
                            <group key={i}>
                                <mesh position={[pos, 0.21, 0]}>
                                    <boxGeometry args={[0.05, 0.05, 2.5]} />
                                    <meshStandardMaterial
                                        color="#00f0ff"
                                        emissive="#00f0ff"
                                        emissiveIntensity={hovered ? 1 : 0.6}
                                    />
                                </mesh>
                                <mesh position={[0, 0.21, pos]}>
                                    <boxGeometry args={[2.5, 0.05, 0.05]} />
                                    <meshStandardMaterial
                                        color="#b000ff"
                                        emissive="#b000ff"
                                        emissiveIntensity={hovered ? 1 : 0.6}
                                    />
                                </mesh>
                            </group>
                        ))}
                        {/* Central processor */}
                        <mesh position={[0, 0.3, 0]}>
                            <boxGeometry args={[1, 0.2, 1]} />
                            <meshStandardMaterial
                                color="#00f0ff"
                                emissive="#00f0ff"
                                emissiveIntensity={hovered ? 1.5 : 0.8}
                            />
                        </mesh>
                    </group>
                );

            case "network":
                return (
                    <group ref={meshRef}>
                        {/* Network nodes */}
                        {[
                            [-2, 1, 0], [-2, 0, 0], [-2, -1, 0],
                            [0, 1.5, 0], [0, 0.5, 0], [0, -0.5, 0], [0, -1.5, 0],
                            [2, 1, 0], [2, 0, 0], [2, -1, 0]
                        ].map((pos, i) => (
                            <mesh key={i} position={pos as [number, number, number]}>
                                <sphereGeometry args={[0.2, 16, 16]} />
                                <meshStandardMaterial
                                    color={i < 3 ? "#00f0ff" : i < 7 ? "#b000ff" : "#00ff88"}
                                    emissive={i < 3 ? "#00f0ff" : i < 7 ? "#b000ff" : "#00ff88"}
                                    emissiveIntensity={hovered ? 1.2 : 0.8}
                                />
                            </mesh>
                        ))}
                        {/* Connection lines */}
                        {hovered && (
                            <>
                                {/* Input to hidden */}
                                {[0, 1, 2].map(i => (
                                    [3, 4, 5, 6].map(j => (
                                        <mesh key={`${i}-${j}`} position={[
                                            (-2 + 2) / 2,
                                            ([1, 0, -1][i] + [1.5, 0.5, -0.5, -1.5][j - 3]) / 2,
                                            0
                                        ]}>
                                            <boxGeometry args={[2, 0.02, 0.02]} />
                                            <meshStandardMaterial
                                                color="#00f0ff"
                                                emissive="#00f0ff"
                                                emissiveIntensity={0.5}
                                                transparent
                                                opacity={0.6}
                                            />
                                        </mesh>
                                    ))
                                ))}
                            </>
                        )}
                    </group>
                );

            case "ai-core":
                return (
                    <group ref={meshRef}>
                        {/* AI Text Display */}
                        <mesh position={[0, 2.5, 0]}>
                            <boxGeometry args={[4, 0.6, 0.1]} />
                            <meshStandardMaterial
                                color="#0a0a0f"
                                emissive="#00f0ff"
                                emissiveIntensity={hovered ? 0.8 : 0.4}
                            />
                        </mesh>
                        
                        {/* Central AI Core - Rotating cube */}
                        <mesh>
                            <boxGeometry args={[1.5, 1.5, 1.5]} />
                            <meshStandardMaterial
                                color="#00f0ff"
                                emissive="#00f0ff"
                                emissiveIntensity={hovered ? 1 : 0.5}
                                wireframe
                            />
                        </mesh>
                        
                        {/* Inner glowing core */}
                        <mesh>
                            <octahedronGeometry args={[0.8, 0]} />
                            <meshStandardMaterial
                                color="#b000ff"
                                emissive="#b000ff"
                                emissiveIntensity={hovered ? 1.5 : 0.8}
                            />
                        </mesh>
                        
                        {/* Data flow rings */}
                        {[0, 45, 90].map((angle, i) => (
                            <mesh 
                                key={i} 
                                rotation={[(angle * Math.PI) / 180, (angle * Math.PI) / 180, 0]}
                            >
                                <torusGeometry args={[2, 0.08, 16, 100]} />
                                <meshStandardMaterial
                                    color="#00f0ff"
                                    emissive="#00f0ff"
                                    emissiveIntensity={hovered ? 1 : 0.6}
                                    transparent
                                    opacity={0.7}
                                />
                            </mesh>
                        ))}
                        
                        {/* Processing nodes around the core */}
                        {[...Array(8)].map((_, i) => {
                            const angle = (i / 8) * Math.PI * 2;
                            const radius = 2.5;
                            return (
                                <group key={i}>
                                    <mesh position={[
                                        Math.cos(angle) * radius,
                                        Math.sin(angle * 2) * 0.5,
                                        Math.sin(angle) * radius
                                    ]}>
                                        <boxGeometry args={[0.3, 0.3, 0.3]} />
                                        <meshStandardMaterial
                                            color="#00ff88"
                                            emissive="#00ff88"
                                            emissiveIntensity={hovered ? 1.2 : 0.8}
                                        />
                                    </mesh>
                                    {/* Connection lines to core */}
                                    {hovered && (
                                        <mesh position={[
                                            Math.cos(angle) * radius / 2,
                                            Math.sin(angle * 2) * 0.25,
                                            Math.sin(angle) * radius / 2
                                        ]}>
                                            <cylinderGeometry args={[0.02, 0.02, radius, 8]} />
                                            <meshStandardMaterial
                                                color="#00f0ff"
                                                emissive="#00f0ff"
                                                emissiveIntensity={0.6}
                                                transparent
                                                opacity={0.4}
                                            />
                                        </mesh>
                                    )}
                                </group>
                            );
                        })}
                        
                        {/* Orbiting data packets */}
                        {[...Array(12)].map((_, i) => {
                            const angle = (i / 12) * Math.PI * 2;
                            const radius = 3;
                            return (
                                <mesh 
                                    key={`packet-${i}`}
                                    position={[
                                        Math.cos(angle + Date.now() * 0.001) * radius,
                                        Math.sin(angle * 3) * 0.3,
                                        Math.sin(angle + Date.now() * 0.001) * radius
                                    ]}
                                >
                                    <sphereGeometry args={[0.08, 8, 8]} />
                                    <meshStandardMaterial
                                        color="#ffffff"
                                        emissive="#ffffff"
                                        emissiveIntensity={1}
                                    />
                                </mesh>
                            );
                        })}
                    </group>
                );
        }
    };

    return (
        <group
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            {renderModel()}
            <pointLight position={[5, 5, 5]} intensity={hovered ? 2 : 1} color="#00f0ff" />
            <pointLight position={[-5, -5, -5]} intensity={hovered ? 1.5 : 0.8} color="#b000ff" />
        </group>
    );
}

export default function Interactive3DModel({ type }: ModelProps) {
    return (
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <InteractiveModel type={type} />
            <OrbitControls
                enableZoom={true}
                enablePan={true}
                minDistance={5}
                maxDistance={15}
            />
        </Canvas>
    );
}

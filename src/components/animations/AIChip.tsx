"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Chip() {
    const groupRef = useRef<THREE.Group>(null);
    const circuitRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.4;
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
        }
        
        if (circuitRef.current) {
            circuitRef.current.rotation.z = state.clock.elapsedTime * 0.2;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Main chip body */}
            <mesh>
                <boxGeometry args={[1.5, 0.2, 1.5]} />
                <meshStandardMaterial
                    color="#0a0a0f"
                    metalness={0.9}
                    roughness={0.1}
                    emissive="#00f0ff"
                    emissiveIntensity={0.2}
                />
            </mesh>
            
            {/* Circuit patterns */}
            <group ref={circuitRef}>
                {/* Horizontal lines */}
                {[-0.5, -0.25, 0, 0.25, 0.5].map((y, i) => (
                    <mesh key={`h-${i}`} position={[0, 0.11, y]}>
                        <boxGeometry args={[1.2, 0.02, 0.02]} />
                        <meshStandardMaterial
                            color="#00f0ff"
                            emissive="#00f0ff"
                            emissiveIntensity={0.8}
                        />
                    </mesh>
                ))}
                
                {/* Vertical lines */}
                {[-0.5, -0.25, 0, 0.25, 0.5].map((x, i) => (
                    <mesh key={`v-${i}`} position={[x, 0.11, 0]}>
                        <boxGeometry args={[0.02, 0.02, 1.2]} />
                        <meshStandardMaterial
                            color="#b000ff"
                            emissive="#b000ff"
                            emissiveIntensity={0.8}
                        />
                    </mesh>
                ))}
            </group>
            
            {/* Corner pins */}
            {[
                [-0.7, -0.1, -0.7],
                [0.7, -0.1, -0.7],
                [-0.7, -0.1, 0.7],
                [0.7, -0.1, 0.7]
            ].map((pos, i) => (
                <mesh key={`pin-${i}`} position={pos as [number, number, number]}>
                    <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
                    <meshStandardMaterial
                        color="#888888"
                        metalness={1}
                        roughness={0.2}
                    />
                </mesh>
            ))}
            
            {/* Central processor core */}
            <mesh position={[0, 0.15, 0]}>
                <boxGeometry args={[0.5, 0.1, 0.5]} />
                <meshStandardMaterial
                    color="#00f0ff"
                    emissive="#00f0ff"
                    emissiveIntensity={1}
                    metalness={0.8}
                />
            </mesh>
            
            {/* Pulsing data points */}
            {[...Array(8)].map((_, i) => {
                const angle = (i / 8) * Math.PI * 2;
                return (
                    <mesh 
                        key={`data-${i}`} 
                        position={[
                            Math.cos(angle) * 0.6,
                            0.2,
                            Math.sin(angle) * 0.6
                        ]}
                    >
                        <sphereGeometry args={[0.03, 8, 8]} />
                        <meshStandardMaterial
                            color="#00ff88"
                            emissive="#00ff88"
                            emissiveIntensity={1}
                        />
                    </mesh>
                );
            })}
            
            <pointLight position={[0, 1, 0]} intensity={1} color="#00f0ff" />
        </group>
    );
}

export default function AIChip() {
    return (
        <Canvas camera={{ position: [0, 2, 3] }}>
            <ambientLight intensity={0.4} />
            <Chip />
        </Canvas>
    );
}

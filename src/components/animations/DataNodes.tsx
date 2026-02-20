"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function DataCloud() {
    const groupRef = useRef<THREE.Group>(null);
    const nodesRef = useRef<THREE.Group[]>([]);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
        }
        
        // Animate individual nodes
        nodesRef.current.forEach((node, i) => {
            if (node) {
                node.position.y = Math.sin(state.clock.elapsedTime + i) * 0.3;
                node.rotation.x = state.clock.elapsedTime * 0.5;
                node.rotation.z = state.clock.elapsedTime * 0.3;
            }
        });
    });

    // Create data nodes in a cloud formation
    const nodePositions = [];
    const nodeCount = 12;
    
    for (let i = 0; i < nodeCount; i++) {
        const angle = (i / nodeCount) * Math.PI * 2;
        const radius = 1.5;
        const height = (Math.random() - 0.5) * 2;
        
        nodePositions.push({
            x: Math.cos(angle) * radius,
            y: height,
            z: Math.sin(angle) * radius,
            color: i % 3 === 0 ? "#00f0ff" : i % 3 === 1 ? "#b000ff" : "#00ff88"
        });
    }

    return (
        <group ref={groupRef}>
            {nodePositions.map((pos, i) => (
                <group 
                    key={i} 
                    position={[pos.x, pos.y, pos.z]}
                    ref={(el) => {
                        if (el) nodesRef.current[i] = el;
                    }}
                >
                    {/* Outer ring */}
                    <mesh>
                        <torusGeometry args={[0.15, 0.03, 8, 16]} />
                        <meshStandardMaterial
                            color={pos.color}
                            emissive={pos.color}
                            emissiveIntensity={0.6}
                        />
                    </mesh>
                    
                    {/* Inner core */}
                    <mesh>
                        <sphereGeometry args={[0.08, 8, 8]} />
                        <meshStandardMaterial
                            color={pos.color}
                            emissive={pos.color}
                            emissiveIntensity={1}
                        />
                    </mesh>
                    
                    <pointLight position={[0, 0, 0]} intensity={0.5} color={pos.color} distance={2} />
                </group>
            ))}
            
            {/* Central hub */}
            <mesh>
                <octahedronGeometry args={[0.3, 0]} />
                <meshStandardMaterial
                    color="#ffffff"
                    emissive="#00f0ff"
                    emissiveIntensity={0.8}
                    wireframe
                />
            </mesh>
        </group>
    );
}

export default function DataNodes() {
    return (
        <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.3} />
            <DataCloud />
        </Canvas>
    );
}

"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function NetworkNodes() {
    const groupRef = useRef<THREE.Group>(null);
    const linesRef = useRef<THREE.LineSegments>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
        }
    });

    // Create neural network nodes
    const nodes = [
        // Input layer
        [-1.5, 1, 0], [-1.5, 0, 0], [-1.5, -1, 0],
        // Hidden layer 1
        [0, 1.5, 0], [0, 0.5, 0], [0, -0.5, 0], [0, -1.5, 0],
        // Hidden layer 2
        [1.5, 1, 0], [1.5, 0, 0], [1.5, -1, 0]
    ];

    // Create connections
    const linePositions: number[] = [];
    // Input to hidden1
    for (let i = 0; i < 3; i++) {
        for (let j = 3; j < 7; j++) {
            linePositions.push(...nodes[i], ...nodes[j]);
        }
    }
    // Hidden1 to hidden2
    for (let i = 3; i < 7; i++) {
        for (let j = 7; j < 10; j++) {
            linePositions.push(...nodes[i], ...nodes[j]);
        }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

    return (
        <group ref={groupRef}>
            {/* Nodes */}
            {nodes.map((pos, i) => (
                <mesh key={i} position={pos as [number, number, number]}>
                    <sphereGeometry args={[0.12, 16, 16]} />
                    <meshStandardMaterial
                        color={i < 3 ? "#00f0ff" : i < 7 ? "#b000ff" : "#00ff88"}
                        emissive={i < 3 ? "#00f0ff" : i < 7 ? "#b000ff" : "#00ff88"}
                        emissiveIntensity={0.8}
                    />
                </mesh>
            ))}
            
            {/* Connections */}
            <lineSegments ref={linesRef} geometry={lineGeometry}>
                <lineBasicMaterial color="#00f0ff" opacity={0.3} transparent />
            </lineSegments>
            
            <pointLight position={[0, 0, 2]} intensity={1} color="#00f0ff" />
        </group>
    );
}

export default function NeuralNetworkNodes() {
    return (
        <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.4} />
            <NetworkNodes />
        </Canvas>
    );
}

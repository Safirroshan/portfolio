"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Helix() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
        }
    });

    const spheres = [];
    const count = 20;
    
    for (let i = 0; i < count; i++) {
        const t = (i / count) * Math.PI * 4;
        const x1 = Math.cos(t) * 0.5;
        const y = (i / count) * 4 - 2;
        const z1 = Math.sin(t) * 0.5;
        
        const x2 = Math.cos(t + Math.PI) * 0.5;
        const z2 = Math.sin(t + Math.PI) * 0.5;
        
        spheres.push(
            <mesh key={`a-${i}`} position={[x1, y, z1]}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial
                    color="#00f0ff"
                    emissive="#00f0ff"
                    emissiveIntensity={0.8}
                />
            </mesh>
        );
        
        spheres.push(
            <mesh key={`b-${i}`} position={[x2, y, z2]}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial
                    color="#b000ff"
                    emissive="#b000ff"
                    emissiveIntensity={0.8}
                />
            </mesh>
        );
    }

    return (
        <group ref={groupRef}>
            {spheres}
            <pointLight position={[0, 0, 0]} intensity={1} color="#00f0ff" />
        </group>
    );
}

export default function DNAHelix() {
    return (
        <Canvas camera={{ position: [0, 0, 3] }}>
            <ambientLight intensity={0.3} />
            <Helix />
        </Canvas>
    );
}

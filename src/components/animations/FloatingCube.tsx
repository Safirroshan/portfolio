"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Cube({ position, color, speed }: { position: [number, number, number], color: string, speed: number }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * speed;
            meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.7;
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
        }
    });

    return (
        <mesh ref={meshRef} position={position}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.5}
                metalness={0.8}
                roughness={0.2}
                wireframe
            />
        </mesh>
    );
}

export default function FloatingCube() {
    return (
        <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Cube position={[0, 0, 0]} color="#00f0ff" speed={0.5} />
        </Canvas>
    );
}

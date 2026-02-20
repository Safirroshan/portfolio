"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Torus() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.4;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.6;
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.4;
        }
    });

    return (
        <group>
            <mesh ref={meshRef}>
                <torusGeometry args={[1, 0.4, 16, 100]} />
                <meshStandardMaterial
                    color="#00f0ff"
                    emissive="#00f0ff"
                    emissiveIntensity={0.6}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>
            <pointLight position={[2, 2, 2]} intensity={1} color="#00f0ff" />
        </group>
    );
}

export default function FloatingTorus() {
    return (
        <Canvas camera={{ position: [0, 0, 4] }}>
            <ambientLight intensity={0.4} />
            <Torus />
        </Canvas>
    );
}

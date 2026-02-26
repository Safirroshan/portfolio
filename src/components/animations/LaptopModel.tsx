"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, ContactShadows, PresentationControls, RoundedBox, Html } from "@react-three/drei";
import * as THREE from "three";

// A procedural, stylish 3D laptop constructed from basic shapes and Drei helpers
// This entirely removes the dependency on an external `.gltf` URL that might fail.
function ProceduralLaptop(props: any) {
    const screenRef = useRef<THREE.Group>(null);

    // Gently nod the screen based on mouse vertically, just a touch
    useFrame((state) => {
        if (screenRef.current) {
            screenRef.current.rotation.x = THREE.MathUtils.lerp(
                screenRef.current.rotation.x,
                -0.15 + state.mouse.y * 0.1,
                0.1
            );
        }
    });

    return (
        <group {...props}>
            {/* Lidar/Glow dot on back */}
            <pointLight position={[0, 1.5, -1.2]} intensity={2} color="#0066ff" distance={5} />

            {/* Base of the laptop */}
            <RoundedBox args={[3.2, 0.12, 2.2]} radius={0.05} smoothness={4} position={[0, 0, 0]}>
                <meshStandardMaterial color="#1a1a24" roughness={0.4} metalness={0.8} />
            </RoundedBox>

            {/* Keyboard Area (darker indented rectangle) */}
            <mesh position={[0, 0.061, -0.2]}>
                <boxGeometry args={[2.8, 0.01, 1.1]} />
                <meshStandardMaterial color="#0b0b12" roughness={0.8} />
            </mesh>

            {/* Trackpad */}
            <mesh position={[0, 0.061, 0.65]}>
                <boxGeometry args={[1.2, 0.01, 0.6]} />
                <meshStandardMaterial color="#11111a" roughness={0.6} metalness={0.2} />
            </mesh>

            {/* Screen Group (hinged at the back edge) */}
            <group position={[0, 0.06, -1.05]} ref={screenRef}>
                {/* The Screen Panel itself */}
                <RoundedBox args={[3.2, 2.2, 0.1]} radius={0.05} smoothness={4} position={[0, 1.1, 0]}>
                    <meshStandardMaterial color="#1a1a24" roughness={0.4} metalness={0.8} />
                </RoundedBox>

                {/* The Display (Black inner glass) */}
                <mesh position={[0, 1.1, 0.051]}>
                    <planeGeometry args={[3.0, 2.0]} />
                    <meshBasicMaterial color="#000000" />
                </mesh>

                {/* HTML Screen Content overlaying the Display */}
                <Html
                    transform
                    occlude
                    position={[0, 1.1, 0.052]}
                    style={{
                        width: "600px",
                        height: "400px",
                        backgroundColor: "#0a0a0f",
                        border: "1px solid rgba(59,130,246,0.3)",
                        boxShadow: "0 0 40px rgba(59,130,246,0.2) inset",
                        overflow: "hidden",
                    }}
                >
                    <div className="w-full h-full flex flex-col items-center justify-center relative p-8 cursor-default select-none">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15)_0%,transparent_70%)]" />
                        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--neon-blue)] to-transparent opacity-50" />

                        <h1 className="text-6xl font-black text-white tracking-widest mb-4 z-10" style={{ textShadow: "0 0 20px rgba(59,130,246,0.8)" }}>
                            SAFIR
                        </h1>
                        <p className="text-[var(--neon-blue)] font-mono text-xl z-10">AI SYSTEM ONLINE</p>

                        {/* Terminal decorative lines */}
                        <div className="absolute bottom-4 left-4 text-[#444] font-mono text-sm">
                            <p>&gt; load modules...</p>
                            <p>&gt; init computer_vision.ts</p>
                            <p>&gt; status: active</p>
                        </div>
                    </div>
                </Html>
            </group>
        </group>
    );
}

function Rig() {
    return useFrame((state) => {
        state.camera.position.lerp(new THREE.Vector3(state.mouse.x * 0.5, 1.5 + state.mouse.y * 0.5, 5.5), 0.05);
        state.camera.lookAt(0, 0, 0);
    });
}

export default function LaptopModel() {
    return (
        <div className="w-full h-full absolute inset-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, -5], fov: 45 }}>
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <ambientLight intensity={0.5} />

                {/* Make the model interactive but floating */}
                <Float rotationIntensity={0.6} floatIntensity={2.5} floatingRange={[0, 0.5]}>
                    <PresentationControls
                        global
                        rotation={[0.13, -0.3, 0]}
                        polar={[-0.4, 0.2]}
                        azimuth={[-1, 1]}
                        snap={true}
                    >
                        {/* Wrapper group to push everything down slightly so the camera looks at the laptop center */}
                        <group position-y={-0.8} scale={1.2}>
                            <ProceduralLaptop />
                        </group>
                    </PresentationControls>
                </Float>

                {/* Soft ground shadow mapping the float */}
                <ContactShadows position-y={-1.8} opacity={0.6} scale={20} blur={2.4} color="#000" />

                {/* Environment lighting to make metals reflect beautifully */}
                <Environment preset="city" />
                <Rig />
            </Canvas>
        </div>
    );
}

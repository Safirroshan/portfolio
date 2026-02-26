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

            {/* Screen glow onto the keyboard */}
            <pointLight position={[0, 1.2, 0.8]} intensity={3} color="#0088ff" distance={5} />

            {/* Neon underglow */}
            <pointLight position={[0, -0.5, 0]} intensity={2} color="#8a2be2" distance={8} />

            {/* Base of the laptop */}
            <RoundedBox args={[3.2, 0.12, 2.2]} radius={0.05} smoothness={4} position={[0, 0, 0]}>
                <meshStandardMaterial color="#1a1a24" roughness={0.4} metalness={0.8} />
            </RoundedBox>

            {/* Keyboard Area (simulating glowing keys base) */}
            <mesh position={[0, 0.061, -0.2]}>
                <boxGeometry args={[2.8, 0.01, 1.1]} />
                <meshStandardMaterial color="#0b0b12" roughness={0.6} metalness={0.4} emissive="#002244" emissiveIntensity={0.2} />
            </mesh>

            {/* Trackpad */}
            <mesh position={[0, 0.061, 0.65]}>
                <boxGeometry args={[1.2, 0.01, 0.6]} />
                <meshStandardMaterial color="#11111a" roughness={0.5} metalness={0.3} />
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
                    <div className="w-full h-full flex flex-col items-start justify-start relative p-8 cursor-default select-none bg-[#050508] font-mono text-sm md:text-base opacity-30">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.05)_0%,transparent_100%)] pointer-events-none" />
                        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--neon-blue)] to-transparent opacity-20" />

                        <div className="z-10 text-left text-gray-500 mt-2 ml-2 tracking-wide leading-relaxed">
                            <div className="text-gray-600 mb-4">{`// Initializing core AI systems`}</div>
                            <div className="mb-2">
                                <span className="text-[#ff7b72]">import</span> {`{ Network }`} <span className="text-[#ff7b72]">from</span> <span className="text-[#a5d6ff]">'@lib/neural'</span>;
                            </div>
                            <div className="mb-6">
                                <span className="text-[#ff7b72]">import</span> {`{ analyze }`} <span className="text-[#ff7b72]">from</span> <span className="text-[#a5d6ff]">'@core/vision'</span>;
                            </div>

                            <div className="mb-2">
                                <span className="text-[#ff7b72]">export const</span> <span className="text-[#79c0ff]">BootSequence</span> = <span className="text-[#ff7b72]">async</span> () <span className="text-[#ff7b72]">=&gt;</span> {`{`}
                            </div>
                            <div className="ml-4 mb-2">
                                <span className="text-[#ff7b72]">const</span> model = <span className="text-[#ff7b72]">await</span> Network.<span className="text-[#d2a8ff]">load</span>(<span className="text-[#a5d6ff]">'safir-v2'</span>);
                            </div>
                            <div className="ml-4 mb-2">
                                model.<span className="text-[#d2a8ff]">optimize</span>({`{ mode: `}<span className="text-[#a5d6ff]">'production'</span>{` }`});
                            </div>
                            <div className="ml-4 mb-2">
                                <span className="text-[#8b949e]">/* Ready for inference */</span>
                            </div>
                            <div className="ml-4 mb-2">
                                <span className="text-[#ff7b72]">return</span> model.<span className="text-[#d2a8ff]">serve</span>();
                            </div>
                            <div>{`};`}</div>
                        </div>

                        {/* Blinking cursor */}
                        <div className="z-10 absolute bottom-10 left-10 w-2.5 h-5 bg-[var(--neon-blue)] animate-pulse opacity-50" />
                    </div>
                </Html>
            </group>
        </group>
    );
}

function Rig() {
    return useFrame((state) => {
        // Zoom out significantly to make the laptop a small background element
        state.camera.position.lerp(new THREE.Vector3(state.mouse.x * 2.0, 3.0 + state.mouse.y * 1.5, 14.0), 0.05);
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
                        {/* Wrapper group. Scaled down to be small and centered behind text */}
                        <group position-y={-0.5} scale={0.8}>
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

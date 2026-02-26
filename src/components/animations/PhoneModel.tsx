"use client";

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, ContactShadows, PresentationControls, RoundedBox, Html } from "@react-three/drei";
import * as THREE from "three";

function ProceduralPhone({ children }: { children: React.ReactNode }) {
    const phoneRef = useRef<THREE.Group>(null);

    return (
        <group ref={phoneRef}>
            {/* Phone Body */}
            <RoundedBox args={[2.4, 4.8, 0.2]} radius={0.3} smoothness={4} position={[0, 0, 0]}>
                <meshStandardMaterial color="#1a1a24" roughness={0.4} metalness={0.8} />
            </RoundedBox>

            {/* Screen Bezel / Inner Glass */}
            <mesh position={[0, 0, 0.101]}>
                <planeGeometry args={[2.2, 4.6]} />
                <meshBasicMaterial color="#000" />
            </mesh>

            {/* Camera cutout (Dynamic Island / Notch) */}
            <RoundedBox args={[0.7, 0.15, 0.05]} radius={0.075} smoothness={4} position={[0, 2.15, 0.102]}>
                <meshBasicMaterial color="#050505" />
            </RoundedBox>

            {/* Content Screen */}
            <Html
                transform
                occlude="blending"
                position={[0, 0, 0.103]}
                style={{
                    width: "360px",
                    height: "750px",
                    backgroundColor: "#050508",
                    overflow: "hidden",
                    borderRadius: "16px",
                    border: "2px solid #222"
                }}
            >
                <div className="w-full h-full relative overflow-y-auto custom-scrollbar" style={{ pointerEvents: 'auto' }}>
                    {children}
                </div>
            </Html>
        </group>
    );
}

export default function PhoneModel({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
            <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} />

                <Float rotationIntensity={0.2} floatIntensity={1.5} floatingRange={[-0.1, 0.1]}>
                    <PresentationControls
                        global
                        rotation={[0, -0.1, 0]}
                        polar={[-0.1, 0.1]}
                        azimuth={[-0.5, 0.5]}
                        snap={true}
                    >
                        <ProceduralPhone>
                            {children}
                        </ProceduralPhone>
                    </PresentationControls>
                </Float>

                <ContactShadows position-y={-2.8} opacity={0.6} scale={15} blur={2.5} />
                <Environment preset="city" />
            </Canvas>
        </div>
    );
}

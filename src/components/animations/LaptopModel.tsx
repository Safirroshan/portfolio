"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Float, ContactShadows, Html, PresentationControls } from "@react-three/drei";

function Model(props: any) {
    // Using a public model from proper R3F examples (PMNDRS)
    const { scene } = useGLTF("https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf");
    return <primitive object={scene} {...props} />;
}

// Fallback geometry in case model fails to load
function FallbackLaptop() {
    return (
        <group>
            <mesh position={[0, -0.5, 0]}>
                <boxGeometry args={[3, 0.2, 2]} />
                <meshStandardMaterial color="#333" />
            </mesh>
            <mesh position={[0, 1, -1]} rotation={[-0.2, 0, 0]}>
                <boxGeometry args={[3, 2, 0.1]} />
                <meshStandardMaterial color="#111" />
            </mesh>
        </group>
    )
}

function Rig() {
    return useFrame((state) => {
        state.camera.position.lerp({ x: 0 + state.mouse.x / 4, y: 1.5 + state.mouse.y / 4, z: 5.5 }, 0.05)
        state.camera.lookAt(0, 0, 0)
    })
}

export default function LaptopModel() {
    return (
        <div className="w-full h-full absolute inset-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, -5], fov: 45 }}>
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <ambientLight intensity={0.5} />

                {/* Make the model interactive but floating */}
                <Float rotationIntensity={0.4} floatIntensity={2} floatingRange={[0, 0.5]}>
                    <PresentationControls
                        global
                        rotation={[0.13, 0.1, 0]}
                        polar={[-0.4, 0.2]}
                        azimuth={[-1, 1]}
                        snap={true}
                    >
                        <group position-y={-1.2} scale={1.2}>
                            <Suspense fallback={<FallbackLaptop />}>
                                <Model />
                            </Suspense>
                        </group>
                    </PresentationControls>
                </Float>

                <ContactShadows position-y={-2.0} opacity={0.4} scale={20} blur={2.4} />
                <Environment preset="city" />
                <Rig />
            </Canvas>
        </div>
    );
}

// Preload the model to avoid pop-in
useGLTF.preload("https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf");

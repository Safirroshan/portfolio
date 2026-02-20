"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import FloatingSphere from "../animations/FloatingSphere";
import AIChip from "../animations/AIChip";
import Interactive3DModel from "../animations/Interactive3DModel";
import {
    Code2,
    BrainCircuit,
    ScanFace,
    Server,
    Layout,
    Database,
    GitBranch,
    Terminal
} from "lucide-react";

export default function TechStack() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const technologies = [
        { name: "Python", icon: <Code2 />, level: 98, color: "text-yellow-400" },
        { name: "PyTorch", icon: <BrainCircuit />, level: 92, color: "text-orange-500" },
        { name: "TensorFlow", icon: <BrainCircuit />, level: 85, color: "text-orange-600" },
        { name: "YOLO / OpenCV", icon: <ScanFace />, level: 95, color: "text-blue-400" },
        { name: "S. Transformers", icon: <BrainCircuit />, level: 90, color: "text-yellow-500" },
        { name: "LangChain", icon: <Database />, level: 88, color: "text-green-400" },
        { name: "FastAPI", icon: <Server />, level: 90, color: "text-teal-400" },
        { name: "Docker/MLOps", icon: <Server />, level: 85, color: "text-blue-500" },
        { name: "Next.js", icon: <Layout />, level: 82, color: "text-white" },
        { name: "SQL / Vector DBs", icon: <Database />, level: 85, color: "text-purple-400" },
        { name: "Git", icon: <GitBranch />, level: 90, color: "text-red-400" },
        { name: "Streamlit", icon: <Terminal />, level: 95, color: "text-red-500" }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    return (
        <section id="tech-stack" className="py-20 px-4 bg-glass-bg relative overflow-hidden">
            {/* Floating Particles Animation */}
            {[...Array(15)].map((_, i) => {
                // Use stable values based on index to avoid hydration mismatch
                const positions = [
                    { left: 10, top: 20, duration: 15 },
                    { left: 25, top: 60, duration: 18 },
                    { left: 45, top: 15, duration: 20 },
                    { left: 60, top: 75, duration: 16 },
                    { left: 75, top: 30, duration: 22 },
                    { left: 85, top: 50, duration: 17 },
                    { left: 15, top: 80, duration: 19 },
                    { left: 35, top: 40, duration: 21 },
                    { left: 55, top: 90, duration: 14 },
                    { left: 70, top: 10, duration: 23 },
                    { left: 90, top: 65, duration: 16 },
                    { left: 20, top: 45, duration: 18 },
                    { left: 50, top: 25, duration: 20 },
                    { left: 80, top: 85, duration: 15 },
                    { left: 5, top: 55, duration: 19 }
                ];
                const pos = positions[i];
                
                return (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-neon-blue/30 rounded-full"
                        animate={{
                            x: [0, 50, -30, 0],
                            y: [0, -40, 30, 0],
                            opacity: [0.2, 0.5, 0.3, 0.2],
                            scale: [1, 1.5, 1.2, 1]
                        }}
                        transition={{
                            duration: pos.duration,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={{
                            left: `${pos.left}%`,
                            top: `${pos.top}%`
                        }}
                    />
                );
            })}
            
            {/* 3D Floating Sphere */}
            <div className="absolute bottom-10 left-10 w-40 h-40 opacity-30 pointer-events-none hidden lg:block">
                <FloatingSphere />
            </div>
            
            {/* Large Interactive AI Chip - Top Left */}
            <div className="absolute top-10 left-10 w-96 h-96 opacity-80 hidden lg:block">
                <Interactive3DModel type="chip" />
            </div>
            
            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={containerVariants}
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple"
                    >
                        Tech Stack
                    </motion.h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {technologies.map((tech, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ 
                                    y: -10, 
                                    boxShadow: "0 20px 40px -10px rgba(0, 240, 255, 0.4)",
                                    scale: 1.05
                                }}
                                className="p-6 rounded-xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm group hover:border-neon-blue/50 transition-colors relative overflow-hidden"
                            >
                                {/* Hover Glow Effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-neon-blue/0 to-neon-purple/0 opacity-0 group-hover:opacity-10 transition-opacity"
                                    initial={false}
                                />
                                
                                <motion.div 
                                    className={`mb-4 w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center ${tech.color} group-hover:scale-110 transition-transform relative z-10`}
                                    whileHover={{ 
                                        rotate: [0, -10, 10, -10, 0],
                                        y: [0, -5, 0]
                                    }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {tech.icon}
                                </motion.div>

                                <h3 className="text-xl font-bold text-white mb-3 relative z-10">{tech.name}</h3>

                                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden relative z-10">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={isInView ? { width: `${tech.level}%` } : { width: 0 }}
                                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                                        className="h-full bg-gradient-to-r from-neon-blue to-neon-purple relative"
                                    >
                                        <motion.div
                                            className="absolute inset-0 bg-white/30"
                                            animate={{ x: ['-100%', '100%'] }}
                                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                        />
                                    </motion.div>
                                </div>
                                <div className="mt-2 text-right text-xs text-gray-500 font-mono relative z-10">
                                    {tech.level}%
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

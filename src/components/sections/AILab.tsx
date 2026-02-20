"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import YOLODemo from "../ai-features/YOLODemo";
import AIBrain from "../animations/AIBrain";
import DataNodes from "../animations/DataNodes";

export default function AILab() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6 }
        }
    };

    return (
        <section id="ai-lab" className="py-20 px-4 relative overflow-hidden bg-glass-bg backdrop-blur-sm border-y border-glass-border">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <motion.div 
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, 50, 0],
                        y: [0, 30, 0]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.4, 1],
                        x: [0, -50, 0],
                        y: [0, -30, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            {/* AI Brain - Top Left */}
            <div className="absolute top-10 left-10 w-40 h-40 opacity-30 pointer-events-none hidden lg:block">
                <AIBrain />
            </div>
            
            {/* Data Nodes - Bottom Right */}
            <div className="absolute bottom-10 right-10 w-48 h-48 opacity-25 pointer-events-none hidden lg:block">
                <DataNodes />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="text-center mb-16"
                >
                    <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-4">
                        AI <span className="text-neon-blue">Lab</span> Playground
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-gray-400 max-w-2xl mx-auto">
                        Experience my AI capabilities firsthand. Interact with live demos powered by local LLMs, computer vision models, and automation scripts.
                    </motion.p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 items-start justify-center max-w-5xl mx-auto">
                    <motion.div 
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, y: -5 }}
                        className="h-full"
                    >
                        <YOLODemo />
                    </motion.div>

                    <motion.div 
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, y: -5 }}
                        className="h-full"
                    >
                        <div className="bg-glass-bg border border-glass-border rounded-2xl p-8 h-full flex flex-col items-center justify-center text-center relative overflow-hidden group hover:border-neon-purple/50 transition-all">
                            <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="text-6xl mb-6"
                            >
                                🚀
                            </motion.div>
                            
                            <h3 className="text-2xl font-bold text-white mb-3">
                                Real-Time <span className="text-neon-purple">Sentiment Analysis</span>
                            </h3>
                            
                            <p className="text-gray-400 mb-6 max-w-md">
                                Live sentiment detection from text input using NLP models. Analyze emotions and tone in real-time.
                            </p>
                            
                            <motion.div
                                className="px-6 py-3 rounded-full bg-neon-purple/20 border border-neon-purple text-neon-purple font-bold"
                                animate={{
                                    boxShadow: [
                                        '0 0 20px rgba(176, 0, 255, 0.3)',
                                        '0 0 30px rgba(176, 0, 255, 0.6)',
                                        '0 0 20px rgba(176, 0, 255, 0.3)'
                                    ]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                Coming Soon
                            </motion.div>
                            
                            <div className="mt-6 flex flex-wrap gap-2 justify-center">
                                {['NLP', 'Transformers', 'Real-time', 'FastAPI'].map((tech, i) => (
                                    <span key={i} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

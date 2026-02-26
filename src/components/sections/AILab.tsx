"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import YOLODemo from "../ai-features/YOLODemo";
import AIBrain from "../animations/AIBrain";
import DataNodes from "../animations/DataNodes";

export default function AILab() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-50px" });

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
            transition: { duration: 0.6, ease: "easeOut" as const }
        }
    };

    return (
        <section id="ai-lab" ref={ref} className="py-24 px-4 relative overflow-hidden" style={{ background: 'var(--section-alt)' }}>
            {/* Subtle gradient background */}
            <div className="absolute inset-0 gradient-mesh opacity-40" />

            {/* AI Brain - Top Left (only rendered when section is in view) */}
            {isInView && (
                <div className="absolute top-10 left-10 w-40 h-40 opacity-20 pointer-events-none hidden lg:block">
                    <AIBrain />
                </div>
            )}

            {/* Data Nodes - Bottom Right (only rendered when section is in view) */}
            {isInView && (
                <div className="absolute bottom-10 right-10 w-48 h-48 opacity-15 pointer-events-none hidden lg:block">
                    <DataNodes />
                </div>
            )}

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="text-center mb-14"
                >
                    <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-3">
                        AI <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-purple)]">Lab</span> Playground
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-gray-400 max-w-lg mx-auto text-sm">
                        Experience my AI capabilities firsthand. Interact with live demos powered by local LLMs, computer vision models, and automation scripts.
                    </motion.p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-6 items-start justify-center max-w-5xl mx-auto">
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ y: -4 }}
                        className="h-full"
                    >
                        <YOLODemo />
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        whileHover={{ y: -4 }}
                        className="h-full"
                    >
                        <div className="premium-card p-8 h-full flex flex-col items-center justify-center text-center">
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    y: [0, -5, 0]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="text-5xl mb-6"
                            >
                                🚀
                            </motion.div>

                            <h3 className="text-xl font-bold text-white mb-2">
                                Real-Time <span className="text-[var(--neon-purple)]">Sentiment Analysis</span>
                            </h3>

                            <p className="text-gray-400 mb-6 max-w-md text-sm leading-relaxed">
                                Live sentiment detection from text input using NLP models. Analyze emotions and tone in real-time.
                            </p>

                            <div className="px-5 py-2.5 rounded-full bg-[var(--neon-purple)]/10 border border-[var(--neon-purple)]/30 text-[var(--neon-purple)] font-bold text-sm">
                                Coming Soon
                            </div>

                            <div className="mt-6 flex flex-wrap gap-2 justify-center">
                                {['NLP', 'Transformers', 'Real-time', 'FastAPI'].map((tech, i) => (
                                    <span key={i} className="text-xs px-3 py-1 rounded-full bg-white/5 text-gray-400 font-medium">
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

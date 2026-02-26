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
        { name: "Python", icon: <Code2 />, level: 98, color: "text-yellow-400", bg: "bg-yellow-500/10" },
        { name: "PyTorch", icon: <BrainCircuit />, level: 92, color: "text-orange-400", bg: "bg-orange-500/10" },
        { name: "TensorFlow", icon: <BrainCircuit />, level: 85, color: "text-orange-500", bg: "bg-orange-500/10" },
        { name: "YOLO / OpenCV", icon: <ScanFace />, level: 95, color: "text-blue-400", bg: "bg-blue-500/10" },
        { name: "S. Transformers", icon: <BrainCircuit />, level: 90, color: "text-amber-400", bg: "bg-amber-500/10" },
        { name: "LangChain", icon: <Database />, level: 88, color: "text-emerald-400", bg: "bg-emerald-500/10" },
        { name: "FastAPI", icon: <Server />, level: 90, color: "text-teal-400", bg: "bg-teal-500/10" },
        { name: "Docker/MLOps", icon: <Server />, level: 85, color: "text-blue-400", bg: "bg-blue-500/10" },
        { name: "Next.js", icon: <Layout />, level: 82, color: "text-white", bg: "bg-white/5" },
        { name: "SQL / Vector DBs", icon: <Database />, level: 85, color: "text-purple-400", bg: "bg-purple-500/10" },
        { name: "Git", icon: <GitBranch />, level: 90, color: "text-red-400", bg: "bg-red-500/10" },
        { name: "Streamlit", icon: <Terminal />, level: 95, color: "text-rose-400", bg: "bg-rose-500/10" }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.06 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" as const }
        }
    };

    return (
        <section id="tech-stack" className="py-24 px-4 relative overflow-hidden" style={{ background: 'var(--section-alt)' }}>
            {/* 3D Floating Sphere */}
            <div className="absolute bottom-10 left-10 w-40 h-40 opacity-20 pointer-events-none hidden lg:block">
                <FloatingSphere />
            </div>

            {/* Large Interactive AI Chip */}
            <div className="absolute top-10 left-10 w-96 h-96 opacity-40 hidden lg:block">
                <Interactive3DModel type="chip" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={containerVariants}
                >
                    <motion.div variants={itemVariants} className="text-center mb-14">
                        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-purple)] mb-3 gradient-strike">
                            Tech Stack
                        </h2>
                        <p className="text-gray-400 max-w-lg mx-auto text-sm">Technologies and frameworks I work with daily</p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {technologies.map((tech, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.05, type: "spring", bounce: 0.3 }}
                                viewport={{ once: true, margin: "-30px" }}
                                whileHover={{ y: -6, boxShadow: "var(--card-shadow-hover)" }}
                                className="premium-card p-5 group cursor-default"
                            >
                                <div className={`mb-3 w-10 h-10 rounded-xl ${tech.bg} ${tech.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                    {tech.icon}
                                </div>

                                <h3 className="text-sm font-bold text-white mb-2">{tech.name}</h3>

                                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={isInView ? { width: `${tech.level}%` } : { width: 0 }}
                                        transition={{ duration: 1, delay: 0.3 + index * 0.05, ease: "easeOut" }}
                                        className="h-full bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-purple)] rounded-full"
                                    />
                                </div>
                                <div className="mt-1.5 text-right text-[11px] text-gray-400 font-mono">
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

"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Code, Cpu, Database, Briefcase } from "lucide-react";
import FloatingCube from "../animations/FloatingCube";
import NeuralNetworkNodes from "../animations/NeuralNetworkNodes";
import Interactive3DModel from "../animations/Interactive3DModel";

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const timeline = [
        {
            company: "Caze Labs",
            role: "Software Engineer",
            period: "Present",
            description: "Leading AI automation and backend development.",
            icon: <Cpu className="w-4 h-4" />,
            color: "bg-[var(--neon-blue)]"
        },
        {
            company: "Caze Labs",
            role: "Software Intern",
            period: "Past",
            description: "Contributed to core product features and testing.",
            icon: <Code className="w-4 h-4" />,
            color: "bg-[var(--neon-purple)]"
        },
        {
            company: "TAP Academy",
            role: "Full Stack Intern",
            period: "Past",
            description: "Learned full-stack application development principles.",
            icon: <Database className="w-4 h-4" />,
            color: "bg-emerald-500"
        }
    ];

    const stats = [
        { label: "AI Projects Built", value: "10+", icon: <Cpu className="w-5 h-5" />, color: "text-[var(--neon-blue)]", bg: "bg-blue-500/10" },
        { label: "Automation Systems", value: "5+", icon: <Briefcase className="w-5 h-5" />, color: "text-[var(--neon-purple)]", bg: "bg-purple-500/10" },
        { label: "Models Integrated", value: "8+", icon: <Database className="w-5 h-5" />, color: "text-emerald-400", bg: "bg-emerald-500/10" },
        { label: "APIs Developed", value: "15+", icon: <Code className="w-5 h-5" />, color: "text-orange-400", bg: "bg-orange-500/10" }
    ];

    return (
        <section id="about" className="py-24 px-4 relative overflow-hidden">
            {/* Subtle gradient background */}
            <div className="absolute inset-0 gradient-mesh opacity-60" />

            {/* 3D Floating Cube */}
            <div className="absolute top-10 right-10 w-32 h-32 opacity-30 pointer-events-none hidden lg:block">
                <FloatingCube />
            </div>

            {/* Large Interactive Neural Network - Bottom Right */}
            <div className="absolute bottom-10 right-10 w-96 h-96 opacity-40 hidden lg:block">
                <Interactive3DModel type="network" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div
                    ref={ref}
                    className="grid md:grid-cols-2 gap-16 items-start"
                >
                    {/* Timeline Column — Floating in from left */}
                    <div className="space-y-8">
                        <motion.h2
                            initial={{ opacity: 0, x: -60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, ease: "easeOut" as const }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-purple)] gradient-strike"
                        >
                            Experience
                        </motion.h2>

                        <div className="relative ml-3 space-y-6">
                            {/* Vertical Line — Draws in */}
                            <motion.div
                                initial={{ scaleY: 0 }}
                                whileInView={{ scaleY: 1 }}
                                transition={{ duration: 1.2, ease: "easeOut" as const }}
                                viewport={{ once: true, margin: "-50px" }}
                                className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-[var(--neon-blue)]/30 to-transparent origin-top"
                            />

                            {timeline.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -60, y: 30, scale: 0.9 }}
                                    whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                                    transition={{
                                        duration: 0.7,
                                        delay: 0.15 + index * 0.2,
                                        type: "spring",
                                        bounce: 0.4
                                    }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    whileHover={{ scale: 1.05, x: 12, rotate: index % 2 === 0 ? 1 : -1, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
                                    className="relative pl-10 group"
                                >
                                    {/* Timeline Dot — Appears with pop */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        transition={{ duration: 0.4, delay: 0.3 + index * 0.2, type: "spring", bounce: 0.5 }}
                                        viewport={{ once: true }}
                                        className={`absolute left-0 top-1.5 w-4 h-4 rounded-full ${item.color} flex items-center justify-center text-white shadow-md`}
                                    >
                                        <div className="w-2 h-2 rounded-full bg-white" />
                                    </motion.div>

                                    <div className="premium-card p-5">
                                        <h3 className="text-lg font-bold text-white">{item.role}</h3>
                                        <p className="text-[var(--neon-blue)] font-mono text-sm mt-0.5">{item.company} · {item.period}</p>
                                        <p className="text-gray-400 text-sm mt-2 leading-relaxed">{item.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Bio & Stats Column — Floating in from right */}
                    <div className="space-y-10">
                        <motion.div
                            initial={{ opacity: 0, x: 60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, ease: "easeOut" as const }}
                            viewport={{ once: true, margin: "-50px" }}
                        >
                            <h2 className="text-4xl font-bold text-white mb-5">
                                About <span className="text-[var(--neon-purple)]">Me</span>
                            </h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="text-gray-300 leading-relaxed text-lg"
                            >
                                I am a Software Engineer passionate about bridging the gap between <span className="text-[var(--neon-blue)] font-medium">AI research</span> and <span className="text-[var(--neon-blue)] font-medium">production systems</span>.
                                My expertise lies in building scalable automation workflows, real-time computer vision systems using YOLO, and integrating Large Language Models locally.
                            </motion.p>
                        </motion.div>

                        {/* Stats Grid — Stagger float up */}
                        <div className="grid grid-cols-2 gap-4">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{
                                        duration: 0.6,
                                        delay: 0.3 + index * 0.12,
                                        type: "spring",
                                        bounce: 0.5
                                    }}
                                    viewport={{ once: true, margin: "-30px" }}
                                    whileHover={{ scale: 1.08, y: -10, rotateZ: index % 2 === 0 ? 2 : -2, boxShadow: "0 15px 35px rgba(59,130,246,0.2)" }}
                                    className="premium-card p-5 flex flex-col items-center justify-center text-center"
                                >
                                    <motion.div
                                        initial={{ scale: 0, rotate: -30 }}
                                        whileInView={{ scale: 1, rotate: 0 }}
                                        transition={{ duration: 0.4, delay: 0.5 + index * 0.12, type: "spring", bounce: 0.4 }}
                                        viewport={{ once: true }}
                                        className={`mb-3 p-2.5 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-125 group-hover:rotate-12 transition-all duration-300`}
                                    >
                                        {stat.icon}
                                    </motion.div>
                                    <motion.h4
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ duration: 0.3, delay: 0.6 + index * 0.12 }}
                                        viewport={{ once: true }}
                                        className="text-3xl font-bold text-white mb-0.5"
                                    >
                                        {stat.value}
                                    </motion.h4>
                                    <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

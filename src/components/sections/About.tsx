"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Calendar, Briefcase, Award, Code, Cpu, Database } from "lucide-react";
import Image from "next/image";
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
            icon: <Cpu className="w-5 h-5 text-neon-blue" />
        },
        {
            company: "Caze Labs",
            role: "Software Intern",
            period: "Past",
            description: "Contributed to core product features and testing.",
            icon: <Code className="w-5 h-5 text-neon-purple" />
        },
        {
            company: "TAP Academy",
            role: "Full Stack Intern",
            period: "Past",
            description: "Learned full-stack application development principles.",
            icon: <Database className="w-5 h-5 text-green-400" />
        }
    ];

    const stats = [
        { label: "AI Projects Built", value: "10+", icon: <Cpu /> },
        { label: "Automation Systems", value: "5+", icon: <Briefcase /> },
        { label: "Models Integrated", value: "8+", icon: <Database /> },
        { label: "APIs Developed", value: "15+", icon: <Code /> }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6
            }
        }
    };

    return (
        <section id="about" className="py-20 px-4 relative overflow-hidden">
            {/* Animated Background Elements */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                    opacity: [0.03, 0.06, 0.03]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, -90, 0],
                    opacity: [0.03, 0.06, 0.03]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple rounded-full blur-3xl"
            />
            
            {/* 3D Floating Cube */}
            <div className="absolute top-10 right-10 w-32 h-32 opacity-40 pointer-events-none hidden lg:block">
                <FloatingCube />
            </div>
            
            {/* Large Interactive Neural Network - Bottom Right */}
            <div className="absolute bottom-10 right-10 w-96 h-96 opacity-80 hidden lg:block">
                <Interactive3DModel type="network" />
            </div>
            
            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="grid md:grid-cols-2 gap-12 items-center"
                >
                    {/* Timeline Column */}
                    <div className="space-y-8">
                        <motion.h2 variants={itemVariants} className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple">
                            Experience
                        </motion.h2>

                        <div className="relative border-l border-gray-800 ml-3 space-y-8">
                            {timeline.map((item, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{ x: 10, scale: 1.02 }}
                                    className="relative pl-8 group"
                                >
                                    <motion.div 
                                        className="absolute -left-[9px] top-1 bg-background p-1 rounded-full border border-gray-700"
                                        whileHover={{ 
                                            scale: 1.3, 
                                            rotate: 360, 
                                            borderColor: "rgba(0, 240, 255, 0.8)",
                                            boxShadow: "0 0 20px rgba(0, 240, 255, 0.6)"
                                        }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        {item.icon}
                                    </motion.div>
                                    
                                    {/* Connecting Line Glow on Hover */}
                                    <motion.div
                                        className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-neon-blue to-transparent opacity-0 group-hover:opacity-100"
                                        initial={{ scaleY: 0 }}
                                        whileHover={{ scaleY: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                    
                                    <h3 className="text-xl font-bold text-white">{item.role}</h3>
                                    <p className="text-neon-blue font-mono text-sm mb-1">{item.company} | {item.period}</p>
                                    <p className="text-gray-400">{item.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Bio & Stats Column */}
                    <div className="space-y-12">
                        <motion.div variants={itemVariants}>
                            <h2 className="text-4xl font-bold text-white mb-6">
                                About <span className="text-neon-purple">Me</span>
                            </h2>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                I am a Software Engineer passionate about bridging the gap between <span className="text-neon-blue">AI research</span> and <span className="text-neon-blue">production systems</span>.
                                My expertise lies in building scalable automation workflows, real-time computer vision systems using YOLO, and integrating Large Language Models locally.
                            </p>
                        </motion.div>

                        {/* Stats Grid */}
                        <motion.div
                            variants={containerVariants}
                            className="grid grid-cols-2 gap-6"
                        >
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{ 
                                        scale: 1.05, 
                                        borderColor: "rgba(0, 240, 255, 0.5)",
                                        boxShadow: "0 0 30px rgba(0, 240, 255, 0.3)"
                                    }}
                                    className="p-6 rounded-xl bg-glass-bg border border-glass-border backdrop-blur-sm shadow-lg flex flex-col items-center justify-center text-center group transition-colors hover:bg-white/5"
                                >
                                    <motion.div 
                                        className="mb-2 p-3 rounded-full bg-neon-blue/10 text-neon-blue group-hover:bg-neon-blue/20 transition-colors"
                                        whileHover={{ rotate: 360, scale: 1.2 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        {stat.icon}
                                    </motion.div>
                                    <motion.h4 
                                        className="text-3xl font-bold text-white mb-1"
                                        initial={{ scale: 1 }}
                                        whileInView={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        {stat.value}
                                    </motion.h4>
                                    <p className="text-gray-400 text-sm">{stat.label}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

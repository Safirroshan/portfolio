"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { useInView } from "framer-motion";
import { X, Github, ExternalLink, Code2, Cpu, Eye, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import FloatingTorus from "../animations/FloatingTorus";
import DataNodes from "../animations/DataNodes";
import Interactive3DModel from "../animations/Interactive3DModel";

interface Project {
    id: number;
    title: string;
    category: string;
    description: string;
    tech: string[];
    image: string;
    status: "completed" | "coming-soon";
    details: {
        problem: string;
        architecture: string;
        tools: string[];
    };
    links?: {
        github?: string;
        demo?: string;
    };
}

const projects: Project[] = [
    {
        id: 1,
        title: "Campus Security System",
        category: "Computer Vision",
        description: "Intelligent security system with car number plate detection and theft detection using YOLO.",
        tech: ["Python", "YOLOv8", "OpenCV", "FastAPI"],
        image: "/projects/campus-security.jpg",
        status: "completed",
        details: {
            problem: "Campus security requires real-time monitoring for vehicle tracking and theft detection to ensure safety.",
            architecture: "YOLOv8-based detection system for automatic number plate recognition (ANPR) and suspicious activity detection. Real-time video processing with alert notifications.",
            tools: ["YOLOv8", "OpenCV", "Python", "FastAPI", "PostgreSQL"]
        }
    },
    {
        id: 2,
        title: "Neural Style Transfer",
        category: "Deep Learning",
        description: "Artistic style transfer using deep neural networks to transform images.",
        tech: ["TensorFlow", "Python", "CNN", "VGG19"],
        image: "/projects/neural-style.jpg",
        status: "completed",
        details: {
            problem: "Creating artistic renditions of photos manually is time-consuming and requires artistic expertise.",
            architecture: "Implementation of neural style transfer using pre-trained VGG19 network. Combines content and style representations to generate artistic images.",
            tools: ["TensorFlow", "Keras", "NumPy", "OpenCV", "VGG19"]
        }
    },
    {
        id: 3,
        title: "Steganography System",
        category: "Security",
        description: "Secure data hiding system using steganography techniques for covert communication.",
        tech: ["Python", "PIL", "Cryptography", "NumPy"],
        image: "/projects/steganography.jpg",
        status: "completed",
        details: {
            problem: "Need for secure and covert data transmission where hidden messages are embedded within images without detection.",
            architecture: "LSB (Least Significant Bit) steganography implementation with encryption layer. Embeds encrypted data into image pixels while maintaining visual quality.",
            tools: ["Python", "PIL", "Cryptography", "NumPy", "OpenCV"]
        }
    },
    {
        id: 4,
        title: "AI-Powered Chatbot",
        category: "LLM / NLP",
        description: "Intelligent conversational AI with context awareness and multi-turn dialogue.",
        tech: ["LangChain", "OpenAI", "FastAPI", "React"],
        image: "/projects/chatbot.jpg",
        status: "coming-soon",
        details: {
            problem: "",
            architecture: "",
            tools: []
        }
    },
    {
        id: 5,
        title: "Real-Time Emotion Detection",
        category: "Computer Vision",
        description: "Facial emotion recognition system for real-time sentiment analysis.",
        tech: ["TensorFlow", "OpenCV", "Python", "CNN"],
        image: "/projects/emotion.jpg",
        status: "coming-soon",
        details: {
            problem: "",
            architecture: "",
            tools: []
        }
    },
    {
        id: 6,
        title: "Smart Document Parser",
        category: "AI Automation",
        description: "Automated document extraction and classification using AI.",
        tech: ["Python", "OCR", "NLP", "FastAPI"],
        image: "/projects/document.jpg",
        status: "coming-soon",
        details: {
            problem: "",
            architecture: "",
            tools: []
        }
    }
];

export default function Projects() {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const selectedProject = projects.find(p => p.id === selectedId);

    return (
        <section id="projects" className="py-20 px-4 relative overflow-hidden">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 opacity-10">
                <motion.div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                    }}
                    animate={{
                        backgroundPosition: ['0px 0px', '50px 50px']
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </div>
            
            {/* 3D Floating Torus */}
            <div className="absolute top-20 right-20 w-32 h-32 opacity-40 pointer-events-none hidden lg:block">
                <FloatingTorus />
            </div>
            
            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple mb-4">
                        Featured Projects
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        A showcase of high-performance AI systems, automation tools, and computer vision applications.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            layoutId={`card-${project.id}`}
                            key={project.id}
                            onClick={() => setSelectedId(project.id)}
                            whileHover={{ 
                                y: -10, 
                                rotateX: 2, 
                                rotateY: 2, 
                                scale: 1.02,
                                boxShadow: "0 0 40px -10px rgba(0, 240, 255, 0.5)"
                            }}
                            initial={{ opacity: 0, scale: 0.9, rotateX: -10 }}
                            animate={isInView ? { opacity: 1, scale: 1, rotateX: 0 } : { opacity: 0, scale: 0.9, rotateX: -10 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="cursor-pointer group relative rounded-2xl bg-glass-bg border border-glass-border overflow-hidden hover:border-neon-blue/50 transition-all shadow-lg"
                            style={{ perspective: 1000 }}
                        >
                            {/* Animated Border Gradient */}
                            <motion.div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                animate={{
                                    background: [
                                        'linear-gradient(0deg, rgba(0,240,255,0.2), rgba(176,0,255,0.2))',
                                        'linear-gradient(360deg, rgba(0,240,255,0.2), rgba(176,0,255,0.2))'
                                    ]
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                            
                            {/* Image Placeholder */}
                            <div className="h-64 bg-gray-800/50 relative overflow-hidden flex items-center justify-center">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                                
                                {/* Coming Soon Badge */}
                                {project.status === "coming-soon" && (
                                    <motion.div
                                        className="absolute top-4 right-4 z-30 px-4 py-2 rounded-full bg-neon-purple/20 border border-neon-purple backdrop-blur-sm"
                                        animate={{
                                            boxShadow: [
                                                '0 0 20px rgba(176, 0, 255, 0.3)',
                                                '0 0 30px rgba(176, 0, 255, 0.6)',
                                                '0 0 20px rgba(176, 0, 255, 0.3)'
                                            ]
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        <span className="text-neon-purple font-bold text-sm">Coming Soon</span>
                                    </motion.div>
                                )}
                                
                                {/* Animated Background Pattern */}
                                <motion.div
                                    className="absolute inset-0 opacity-20"
                                    animate={{
                                        backgroundPosition: ['0% 0%', '100% 100%']
                                    }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    style={{
                                        backgroundImage: 'radial-gradient(circle, rgba(0,240,255,0.3) 1px, transparent 1px)',
                                        backgroundSize: '30px 30px'
                                    }}
                                />
                                
                                {/* Fallback pattern since we don't have images yet */}
                                <motion.div 
                                    className="text-6xl text-white/10 font-bold relative z-10"
                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {project.category.split(" ")[0]}
                                </motion.div>

                                <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors">
                                                {project.title}
                                            </h3>
                                            <div className="flex gap-2 flex-wrap">
                                                {project.tech.map((t, i) => (
                                                    <motion.span 
                                                        key={i} 
                                                        className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300 border border-white/5"
                                                        whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 240, 255, 0.2)" }}
                                                    >
                                                        {t}
                                                    </motion.span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <AnimatePresence>
                    {selectedId && selectedProject && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedId(null)}
                                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                            >
                                <motion.div
                                    layoutId={`card-${selectedProject.id}`}
                                    className="bg-[#0f0f13] border border-glass-border rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative shadow-[0_0_50px_rgba(0,240,255,0.2)]"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <button
                                        onClick={() => setSelectedId(null)}
                                        className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors z-50"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>

                                    <div className="p-8">
                                        <h2 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h2>
                                        <p className="text-neon-purple mb-6 text-lg">{selectedProject.category}</p>

                                        {selectedProject.status === "coming-soon" ? (
                                            <div className="flex flex-col items-center justify-center py-16">
                                                <motion.div
                                                    animate={{
                                                        scale: [1, 1.1, 1],
                                                        opacity: [0.5, 1, 0.5]
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        ease: "easeInOut"
                                                    }}
                                                    className="text-6xl mb-6"
                                                >
                                                    🚀
                                                </motion.div>
                                                <h3 className="text-3xl font-bold text-neon-blue mb-4">Coming Soon</h3>
                                                <p className="text-gray-400 text-center max-w-md">
                                                    This project is currently under development. Stay tuned for updates!
                                                </p>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="grid md:grid-cols-2 gap-8">
                                                    <div className="space-y-6">
                                                        <div>
                                                            <h4 className="text-neon-blue font-bold mb-2 flex items-center gap-2">
                                                                <Eye className="w-4 h-4" /> Problem Statement
                                                            </h4>
                                                            <p className="text-gray-400 leading-relaxed">
                                                                {selectedProject.details.problem}
                                                            </p>
                                                        </div>

                                                        <div>
                                                            <h4 className="text-neon-blue font-bold mb-2 flex items-center gap-2">
                                                                <Cpu className="w-4 h-4" /> Architecture
                                                            </h4>
                                                            <p className="text-gray-400 leading-relaxed">
                                                                {selectedProject.details.architecture}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-6">
                                                        <div>
                                                            <h4 className="text-neon-blue font-bold mb-2 flex items-center gap-2">
                                                                <Code2 className="w-4 h-4" /> Tools Used
                                                            </h4>
                                                            <div className="flex flex-wrap gap-2">
                                                                {selectedProject.details.tools.map((tool, i) => (
                                                                    <span key={i} className="px-3 py-1 rounded bg-white/5 border border-white/10 text-sm text-gray-300">
                                                                        {tool}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <div className="pt-4 border-t border-gray-800">
                                                            <div className="bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 border border-neon-blue/30 rounded-lg p-6 text-center">
                                                                <h4 className="text-xl font-bold text-white mb-2">Interested in a Demo?</h4>
                                                                <p className="text-gray-400 mb-4">Contact us to schedule a live demonstration of this project.</p>
                                                                <a 
                                                                    href="mailto:safir.inbox@gmail.com?subject=Demo Request: ${selectedProject.title}" 
                                                                    className="inline-block py-3 px-6 rounded-lg bg-neon-blue text-black hover:bg-neon-blue/80 transition-colors font-bold"
                                                                >
                                                                    Contact for Demo
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </motion.div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}

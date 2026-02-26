"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { useInView } from "framer-motion";
import { X, Eye, Cpu, Code2 } from "lucide-react";
import Image from "next/image";
import FloatingTorus from "../animations/FloatingTorus";

interface Project {
    id: number;
    title: string;
    category: string;
    description: string;
    tech: string[];
    image: string;
    gradient: string;
    status: "completed" | "coming-soon";
    details: {
        problem: string;
        architecture: string;
        tools: string[];
    };
}

const projects: Project[] = [
    {
        id: 1,
        title: "Campus Security System",
        category: "Computer Vision",
        description: "Intelligent security system with car number plate detection and theft detection using YOLO.",
        tech: ["Python", "YOLOv8", "OpenCV", "FastAPI"],
        image: "/projects/campus-security.png",
        gradient: "from-blue-600 via-cyan-500 to-blue-400",
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
        description: "Artistic style transfer using deep neural networks to transform images into artwork.",
        tech: ["TensorFlow", "Python", "CNN", "VGG19"],
        image: "/projects/neural-style.png",
        gradient: "from-purple-600 via-pink-500 to-rose-400",
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
        image: "/projects/steganography.png",
        gradient: "from-emerald-600 via-teal-500 to-cyan-400",
        status: "completed",
        details: {
            problem: "Need for secure and covert data transmission where hidden messages are embedded within images without detection.",
            architecture: "LSB steganography implementation with encryption layer. Embeds encrypted data into image pixels while maintaining visual quality.",
            tools: ["Python", "PIL", "Cryptography", "NumPy", "OpenCV"]
        }
    },
    {
        id: 4,
        title: "AI-Powered Chatbot",
        category: "LLM / NLP",
        description: "Intelligent conversational AI with context awareness and multi-turn dialogue.",
        tech: ["LangChain", "OpenAI", "FastAPI", "React"],
        image: "/projects/chatbot.png",
        gradient: "from-amber-500 via-orange-500 to-red-400",
        status: "coming-soon",
        details: { problem: "", architecture: "", tools: [] }
    },
    {
        id: 5,
        title: "Real-Time Emotion Detection",
        category: "Computer Vision",
        description: "Facial emotion recognition system for real-time sentiment analysis.",
        tech: ["TensorFlow", "OpenCV", "Python", "CNN"],
        image: "/projects/emotion.png",
        gradient: "from-indigo-600 via-violet-500 to-purple-400",
        status: "coming-soon",
        details: { problem: "", architecture: "", tools: [] }
    },
    {
        id: 6,
        title: "Smart Document Parser",
        category: "AI Automation",
        description: "Automated document extraction and classification using AI models.",
        tech: ["Python", "OCR", "NLP", "FastAPI"],
        image: "/projects/document.png",
        gradient: "from-slate-600 via-gray-500 to-zinc-400",
        status: "coming-soon",
        details: { problem: "", architecture: "", tools: [] }
    }
];

export default function Projects() {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const selectedProject = projects.find(p => p.id === selectedId);

    return (
        <section id="projects" className="py-24 px-4 relative overflow-hidden">
            <div className="absolute inset-0 gradient-mesh opacity-40" />

            <div className="absolute top-20 right-20 w-32 h-32 opacity-25 pointer-events-none hidden lg:block">
                <FloatingTorus />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-purple)] mb-3 gradient-strike">
                        Featured Projects
                    </h2>
                    <p className="text-gray-400 max-w-lg mx-auto text-sm">
                        A showcase of high-performance AI systems, automation tools, and computer vision applications.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <motion.div
                            layoutId={`card-${project.id}`}
                            key={project.id}
                            onClick={() => setSelectedId(project.id)}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.6, delay: index * 0.1, type: "spring", bounce: 0.4 }}
                            viewport={{ once: true, margin: "-50px" }}
                            whileHover={{ scale: 1.03, y: -12, rotateX: 2, rotateY: 2, boxShadow: "0 25px 60px rgba(139,92,246,0.25)" }}
                            className="cursor-pointer premium-card overflow-hidden group"
                        >
                            {/* Project Image or Gradient Fallback */}
                            <div className={`h-52 relative overflow-hidden ${!project.image ? `bg-gradient-to-br ${project.gradient}` : ''}`}>
                                {project.image ? (
                                    <>
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        {/* Overlay for readability */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    </>
                                ) : (
                                    <>
                                        {/* Dot pattern on gradient */}
                                        <div
                                            className="absolute inset-0 opacity-[0.15]"
                                            style={{
                                                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
                                                backgroundSize: '16px 16px'
                                            }}
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-5xl">🔐</span>
                                        </div>
                                    </>
                                )}

                                {/* Shine effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                                />

                                {/* Coming Soon Badge */}
                                {project.status === "coming-soon" && (
                                    <motion.div
                                        animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 10px rgba(139,92,246,0)", "0 0 20px rgba(139,92,246,0.5)", "0 0 10px rgba(139,92,246,0)"] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute top-3 right-3 z-30 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-[var(--neon-purple)]/50"
                                    >
                                        <span className="text-[var(--neon-purple)] font-bold text-xs">Coming Soon</span>
                                    </motion.div>
                                )}
                            </div>

                            {/* Card Content */}
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-[11px] font-medium text-[var(--neon-blue)] bg-blue-500/10 px-2 py-0.5 rounded-full">{project.category}</span>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[var(--neon-blue)] transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.description}</p>
                                <div className="flex gap-1.5 flex-wrap">
                                    {project.tech.map((t, i) => (
                                        <span key={i} className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 text-gray-400 font-medium">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Modal */}
                <AnimatePresence>
                    {selectedId && selectedProject && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        >
                            <motion.div
                                layoutId={`card-${selectedProject.id}`}
                                className="bg-[#12121a] rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative shadow-[0_24px_80px_rgba(0,0,0,0.5)] border border-white/[0.06]"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Modal Header Image */}
                                <div className={`h-48 relative overflow-hidden rounded-t-2xl ${!selectedProject.image ? `bg-gradient-to-br ${selectedProject.gradient}` : ''}`}>
                                    {selectedProject.image ? (
                                        <Image
                                            src={selectedProject.image}
                                            alt={selectedProject.title}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-6xl">🔐</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                    <button
                                        onClick={() => setSelectedId(null)}
                                        className="absolute top-4 right-4 p-2 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white transition-colors z-50"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="p-8">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs font-medium text-[var(--neon-blue)] bg-blue-500/10 px-2.5 py-1 rounded-full">{selectedProject.category}</span>
                                    </div>
                                    <h2 className="text-3xl font-bold text-white mb-6">{selectedProject.title}</h2>

                                    {selectedProject.status === "coming-soon" ? (
                                        <div className="flex flex-col items-center justify-center py-12">
                                            <motion.div
                                                animate={{ scale: [1, 1.1, 1], y: [0, -5, 0] }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                                className="text-6xl mb-6"
                                            >
                                                🚀
                                            </motion.div>
                                            <h3 className="text-2xl font-bold text-[var(--neon-blue)] mb-3">Coming Soon</h3>
                                            <p className="text-gray-400 text-center max-w-md">
                                                This project is currently under development. Stay tuned!
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="space-y-6">
                                                <div>
                                                    <h4 className="text-[var(--neon-blue)] font-bold mb-2 flex items-center gap-2 text-sm">
                                                        <Eye className="w-4 h-4" /> Problem Statement
                                                    </h4>
                                                    <p className="text-gray-400 leading-relaxed text-sm">{selectedProject.details.problem}</p>
                                                </div>
                                                <div>
                                                    <h4 className="text-[var(--neon-blue)] font-bold mb-2 flex items-center gap-2 text-sm">
                                                        <Cpu className="w-4 h-4" /> Architecture
                                                    </h4>
                                                    <p className="text-gray-400 leading-relaxed text-sm">{selectedProject.details.architecture}</p>
                                                </div>
                                            </div>
                                            <div className="space-y-6">
                                                <div>
                                                    <h4 className="text-[var(--neon-blue)] font-bold mb-2 flex items-center gap-2 text-sm">
                                                        <Code2 className="w-4 h-4" /> Tools Used
                                                    </h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {selectedProject.details.tools.map((tool, i) => (
                                                            <span key={i} className="px-3 py-1 rounded-full bg-white/5 text-sm text-gray-400 font-medium">{tool}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="pt-4 border-t border-white/[0.06]">
                                                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 text-center">
                                                        <h4 className="text-lg font-bold text-white mb-2">Interested in a Demo?</h4>
                                                        <p className="text-gray-400 text-sm mb-4">Contact to schedule a live demonstration.</p>
                                                        <a
                                                            href={`mailto:safir.inbox@gmail.com?subject=Demo Request: ${selectedProject.title}`}
                                                            className="inline-block py-2.5 px-6 rounded-full bg-[var(--neon-blue)] text-white hover:bg-[var(--neon-blue)]/90 transition-colors font-bold text-sm shadow-md"
                                                        >
                                                            Contact for Demo
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}

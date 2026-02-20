"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import MagneticButton from "../ui/MagneticButton";
import TypewriterText from "../ui/AnimatedText";
import NeuralNetwork from "../animations/NeuralNetwork";
import CSSLaptop from "../animations/CSSLaptop";
import AIBrain from "../animations/AIBrain";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
    const titles = [
        "Software Engineer",
        "AI Automation Developer",
        "Computer Vision Engineer",
        "LLM Integration Enthusiast"
    ];

    // Scroll to top on initial mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
            {/* Background Animation - Commented out to isolate 'Hero Missing' issue */}
            {/* <NeuralNetwork /> */}

            {/* 3D Laptop Floating Background */}
            <div className="absolute inset-0 z-0 opacity-40 md:opacity-100 pointer-events-none flex items-center justify-center scale-150 md:scale-125 translate-y-20 md:translate-x-60">
                <CSSLaptop />
            </div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90 z-0 pointer-events-none" />

            {/* Main Content */}
            <div className="z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center gap-6">

                {/* Profile Image Badge - Floating above name */}
                <motion.div
                    initial={{ opacity: 0, scale: 0, y: -50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                    className="relative mb-4"
                >
                    <motion.div
                        animate={{
                            y: [0, -10, 0],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="relative"
                    >
                        {/* Glowing Ring Effect */}
                        <motion.div
                            className="absolute -inset-2 rounded-full opacity-60 blur-lg"
                            animate={{
                                background: [
                                    'radial-gradient(circle, rgba(0,240,255,0.6) 0%, transparent 70%)',
                                    'radial-gradient(circle, rgba(176,0,255,0.6) 0%, transparent 70%)',
                                    'radial-gradient(circle, rgba(0,240,255,0.6) 0%, transparent 70%)'
                                ]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />

                        {/* Profile Image */}
                        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-neon-blue shadow-[0_0_40px_rgba(0,240,255,0.6)]">
                            <Image
                                src="/profile.jpeg"
                                alt="Safir Profile"
                                fill
                                className="object-cover"
                                style={{
                                    filter: 'contrast(1.1) brightness(1.05)'
                                }}
                                priority
                            />
                            {/* Subtle Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 via-transparent to-neon-purple/10 pointer-events-none" />
                        </div>

                        {/* Pulse Ring */}
                        <motion.div
                            className="absolute inset-0 rounded-full border-2 border-neon-blue"
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.8, 0, 0.8]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeOut"
                            }}
                        />
                    </motion.div>
                </motion.div>

                {/* Name with Glitch/Reveal Effect */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400 mb-2 relative"
                >
                    <motion.span
                        animate={{
                            textShadow: [
                                '0 0 20px rgba(0,240,255,0.5)',
                                '0 0 40px rgba(0,240,255,0.8)',
                                '0 0 20px rgba(0,240,255,0.5)'
                            ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        SAFIR
                    </motion.span>
                </motion.h1>

                {/* Animated Titles */}
                <div className="h-8 md:h-12 flex items-center justify-center">
                    <TypewriterText
                        texts={titles}
                        className="text-xl md:text-3xl text-neon-blue font-mono"
                        typingSpeed={80}
                        deletingSpeed={40}
                    />
                </div>

                {/* Social Icons */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="flex gap-6 mt-4 mb-8"
                >
                    <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.3 }}>
                        <Link href="https://github.com/Safirroshan" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                            <Github className="w-6 h-6" />
                        </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.3 }}>
                        <Link href="https://www.linkedin.com/in/safir-a73666338" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                            <Linkedin className="w-6 h-6" />
                        </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.3 }}>
                        <Link href="mailto:safir.inbox@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                            <Mail className="w-6 h-6" />
                        </Link>
                    </motion.div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="flex flex-col md:flex-row gap-6 mt-4"
                >
                    <MagneticButton variant="primary" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                        View Projects
                    </MagneticButton>
                    <MagneticButton variant="secondary" onClick={() => document.getElementById('ai-lab')?.scrollIntoView({ behavior: 'smooth' })}>
                        Explore AI Lab
                    </MagneticButton>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 z-10"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                    <ArrowDown className="text-neon-blue w-8 h-8 opacity-80" />
                </motion.div>
            </motion.div>
        </section>
    );
}

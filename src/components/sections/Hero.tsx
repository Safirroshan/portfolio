"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MagneticButton from "../ui/MagneticButton";
import TypewriterText from "../ui/AnimatedText";
import LaptopModel from "../animations/LaptopModel";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";


// ─── SAFIR Title with Katana Slash + Shake ────────────────
function SafirTitle() {
    const [isHovered, setIsHovered] = useState(false);
    const [initialSlash, setInitialSlash] = useState(false);

    // Auto-trigger the slash on page load after a short delay
    useEffect(() => {
        const timer = setTimeout(() => setInitialSlash(true), 1000);
        const reset = setTimeout(() => setInitialSlash(false), 2200);
        return () => { clearTimeout(timer); clearTimeout(reset); };
    }, []);

    const slashActive = isHovered || initialSlash;

    return (
        <motion.h1
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, y: 20 }}
            animate={slashActive ? {
                opacity: 1, y: 0,
                x: [0, -4, 6, -6, 4, -2, 3, 0],
                rotate: [0, -0.5, 1, -1, 0.5, -0.3, 0.2, 0],
            } : { opacity: 1, y: 0, x: 0, rotate: 0 }}
            transition={slashActive ? {
                x: { duration: 0.6, ease: "easeOut" },
                rotate: { duration: 0.6, ease: "easeOut" },
                opacity: { duration: 0.8, ease: "easeOut" as const, delay: 0.1 },
            } : {
                duration: 0.8, ease: "easeOut" as const, delay: 0.1,
            }}
            className="relative text-8xl md:text-[10rem] font-black tracking-[-0.05em] text-white mb-0 leading-[0.85] cursor-default select-none overflow-hidden"
            style={{ textShadow: slashActive ? '0 0 40px rgba(59,130,246,0.25)' : '0 0 20px rgba(59,130,246,0.08)' }}
        >
            SAFIR

            {/* Katana slash — diagonal shining blade sweep */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={slashActive ? { opacity: [0, 1, 1, 0] } : { opacity: 0 }}
                transition={{ duration: 1.0, times: [0, 0.1, 0.5, 1] }}
            >
                {/* Sharp blade beam */}
                <motion.div
                    className="absolute top-0 h-[200%] w-[4px]"
                    style={{
                        background: 'linear-gradient(180deg, transparent 0%, rgba(59,130,246,0.4) 15%, #fff 40%, #fff 60%, rgba(59,130,246,0.4) 85%, transparent 100%)',
                        transform: 'rotate(-20deg)',
                        transformOrigin: 'top center',
                        boxShadow: '0 0 20px 5px rgba(59,130,246,0.7), 0 0 50px 10px rgba(139,92,246,0.35), 0 0 100px 20px rgba(59,130,246,0.15)',
                    }}
                    initial={{ left: '-10%' }}
                    animate={slashActive ? { left: ['-10%', '120%'] } : { left: '-10%' }}
                    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                />

                {/* Wide glow trail */}
                <motion.div
                    className="absolute top-0 h-[200%] w-[50px]"
                    style={{
                        background: 'linear-gradient(180deg, transparent 0%, rgba(59,130,246,0.06) 25%, rgba(139,92,246,0.14) 50%, rgba(59,130,246,0.06) 75%, transparent 100%)',
                        transform: 'rotate(-20deg)',
                        transformOrigin: 'top center',
                        filter: 'blur(5px)',
                    }}
                    initial={{ left: '-15%' }}
                    animate={slashActive ? { left: ['-15%', '115%'] } : { left: '-15%' }}
                    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                />
            </motion.div>

            {/* Flash on impact */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={slashActive ? { opacity: [0, 0, 0.2, 0] } : { opacity: 0 }}
                transition={{ duration: 1.0, times: [0, 0.3, 0.45, 0.85] }}
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.6) 0%, transparent 70%)',
                }}
            />
        </motion.h1>
    );
}

// ─── Hero Component ───────────────────────────────────────
export default function Hero() {
    const titles = [
        "Software Engineer",
        "AI Automation Developer",
        "Computer Vision Engineer",
        "LLM Integration Enthusiast"
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden gradient-mesh">
            {/* Background Gradient */}
            <div className="absolute inset-0 z-0"
                style={{
                    background: 'linear-gradient(135deg, #0a0a0f 0%, #0e1025 30%, #0d0d1a 60%, #0a0a0f 100%)',
                }}
            />

            {/* Animated floating orbs */}
            {[
                { size: 300, x: '10%', y: '20%', color: 'rgba(59,130,246,0.08)', delay: 0, dur: 8 },
                { size: 200, x: '80%', y: '15%', color: 'rgba(139,92,246,0.06)', delay: 2, dur: 10 },
                { size: 250, x: '60%', y: '70%', color: 'rgba(59,130,246,0.05)', delay: 4, dur: 12 },
                { size: 180, x: '25%', y: '75%', color: 'rgba(139,92,246,0.07)', delay: 1, dur: 9 },
                { size: 120, x: '45%', y: '40%', color: 'rgba(59,130,246,0.04)', delay: 3, dur: 7 },
                { size: 160, x: '90%', y: '60%', color: 'rgba(139,92,246,0.05)', delay: 5, dur: 11 },
            ].map((orb, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full pointer-events-none z-[0]"
                    style={{
                        width: orb.size,
                        height: orb.size,
                        left: orb.x,
                        top: orb.y,
                        background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
                        filter: 'blur(40px)',
                    }}
                    animate={{
                        y: [0, -30, 0, 20, 0],
                        x: [0, 15, -10, 5, 0],
                        scale: [1, 1.1, 0.95, 1.05, 1],
                    }}
                    transition={{
                        duration: orb.dur,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: orb.delay,
                    }}
                />
            ))}

            {/* Subtle animated grid */}
            <motion.div
                className="absolute inset-0 z-[0] pointer-events-none glow-grid"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Laptop Model — right side */}
            <div className="absolute inset-0 z-[1] opacity-60 md:opacity-100 pointer-events-auto flex items-center justify-center translate-y-20 md:translate-x-[20rem] md:translate-y-10 scale-125 md:scale-110">
                <LaptopModel />
            </div>

            {/* Bottom fade to dark */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0f] z-[3] pointer-events-none" />

            {/* Main Content */}
            <div className="z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center gap-6">

                {/* Profile Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0, y: -30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
                    className="relative mb-3"
                >
                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="relative"
                        whileHover={{ scale: 1.08 }}
                    >
                        <div className="absolute -inset-5 rounded-full bg-gradient-to-br from-[var(--neon-blue)] to-[var(--neon-purple)] opacity-20 blur-3xl" />
                        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-[3px] ring-[var(--neon-blue)]/25 shadow-[0_8px_40px_rgba(0,102,255,0.15)] group cursor-pointer">
                            <Image
                                src="/profile.jpeg"
                                alt="Safir Profile"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                priority
                            />
                            {/* Katana slash on profile */}
                            <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <div className="slash-sweep absolute top-0 h-[200%] w-[3px]"
                                    style={{
                                        background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.4) 20%, #fff 45%, #fff 55%, rgba(255,255,255,0.4) 80%, transparent 100%)',
                                        transform: 'rotate(-30deg)',
                                        transformOrigin: 'top center',
                                        boxShadow: '0 0 12px 3px rgba(255,255,255,0.7), 0 0 30px 6px rgba(255,255,255,0.35)',
                                    }}
                                />
                                <div className="slash-glow absolute top-0 h-[200%] w-[30px]"
                                    style={{
                                        background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.1) 30%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 70%, transparent 100%)',
                                        transform: 'rotate(-30deg)',
                                        transformOrigin: 'top center',
                                        filter: 'blur(3px)',
                                    }}
                                />
                            </div>
                        </div>
                        <motion.div
                            className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 rounded-full border-[3px] border-white"
                            animate={{ scale: [1, 1.15, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            whileHover={{ scale: 1.4 }}
                        />
                    </motion.div>
                </motion.div>

                {/* SAFIR Name — Katana Slash + Shake */}
                <SafirTitle />

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    whileHover={{ scale: 1.03 }}
                    className="text-lg md:text-xl text-gray-300 font-semibold tracking-wide cursor-default"
                >
                    AI Software Engineer
                </motion.p>

                {/* Animated Titles */}
                <motion.div
                    className="h-8 md:h-10 flex items-center justify-center"
                    whileHover={{ scale: 1.03 }}
                >
                    <TypewriterText
                        texts={titles}
                        className="text-base md:text-lg text-[var(--neon-blue)] font-mono font-bold"
                        typingSpeed={80}
                        deletingSpeed={40}
                    />
                </motion.div>

                {/* Social Icons */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="flex gap-5 mt-4 mb-6"
                >
                    {[
                        { href: "https://github.com/Safirroshan", icon: <Github className="w-5 h-5" />, label: "GitHub" },
                        { href: "https://www.linkedin.com/in/safir-a73666338", icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn" },
                        { href: "mailto:safir.inbox@gmail.com", icon: <Mail className="w-5 h-5" />, label: "Email" }
                    ].map((social) => (
                        <motion.div
                            key={social.label}
                            whileHover={{ scale: 1.2, y: -4, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Link
                                href={social.href}
                                target={social.label !== "Email" ? "_blank" : undefined}
                                className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 text-gray-400 border border-white/10 hover:bg-[var(--neon-blue)] hover:text-white hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-[0_4px_24px_rgba(59,130,246,0.35)]"
                            >
                                {social.icon}
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="flex flex-col md:flex-row gap-4"
                >
                    <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }}>
                        <MagneticButton variant="primary" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                            View Projects
                        </MagneticButton>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }}>
                        <MagneticButton variant="secondary" onClick={() => document.getElementById('ai-lab')?.scrollIntoView({ behavior: 'smooth' })}>
                            Explore AI Lab
                        </MagneticButton>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 z-10"
                whileHover={{ scale: 1.2 }}
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-2 cursor-pointer"
                >
                    <span className="text-xs text-gray-500 font-medium tracking-widest uppercase">Scroll</span>
                    <ArrowDown className="text-gray-500 w-5 h-5" />
                </motion.div>
            </motion.div>
        </section>
    );
}

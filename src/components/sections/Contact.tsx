"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Linkedin, Github, Phone, Send } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import DNAHelix from "../animations/DNAHelix";
import NeuralNetworkNodes from "../animations/NeuralNetworkNodes";

export default function Contact() {
    const [formState, setFormState] = useState({ name: "", email: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSent(true);
            setFormState({ name: "", email: "", message: "" });
            setTimeout(() => setIsSent(false), 3000);
        }, 1500);
    };

    const contactInfo = [
        { icon: <Mail className="w-5 h-5" />, label: "Email", value: "safir.inbox@gmail.com", href: "mailto:safir.inbox@gmail.com" },
        { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", value: "linkedin.com/in/safir", href: "https://www.linkedin.com/in/safir-a73666338" },
        { icon: <Github className="w-5 h-5" />, label: "GitHub", value: "github.com/Safirroshan", href: "https://github.com/Safirroshan" },
        { icon: <Phone className="w-5 h-5" />, label: "Phone", value: "+91 8867561289", href: "tel:+918867561289" }
    ];

    return (
        <section id="contact" className="py-20 px-4 relative overflow-hidden">
            {/* Animated Gradient Orbs */}
            <motion.div
                className="absolute top-0 right-0 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl"
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.2, 1]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-0 left-0 w-96 h-96 bg-neon-blue/20 rounded-full blur-3xl"
                animate={{
                    x: [0, -100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.3, 1]
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* 3D DNA Helix */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 opacity-20 pointer-events-none hidden lg:block">
                <DNAHelix />
            </div>
            
            {/* Neural Network - Top Right */}
            <div className="absolute top-10 right-10 w-40 h-40 opacity-25 pointer-events-none hidden lg:block">
                <NeuralNetworkNodes />
            </div>
            
            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple mb-4">
                        Get In Touch
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Interested in collaborating on AI projects or hiring for a role? Let's connect.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                        <div className="space-y-4">
                            {contactInfo.map((info, index) => (
                                <motion.a
                                    key={index}
                                    href={info.href}
                                    target={info.label !== "Phone" && info.label !== "Email" ? "_blank" : undefined}
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ 
                                        x: 10, 
                                        scale: 1.02,
                                        boxShadow: "0 10px 30px -10px rgba(0, 240, 255, 0.3)"
                                    }}
                                    className="flex items-center gap-4 p-4 rounded-xl bg-glass-bg border border-glass-border hover:border-neon-blue/50 group transition-all"
                                >
                                    <motion.div 
                                        className="p-3 rounded-full bg-gray-800 group-hover:bg-neon-blue/20 group-hover:text-neon-blue transition-colors text-gray-400"
                                        whileHover={{ rotate: 360, scale: 1.2 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        {info.icon}
                                    </motion.div>
                                    <div>
                                        <p className="text-sm text-gray-500">{info.label}</p>
                                        <p className="text-white font-medium group-hover:text-neon-blue transition-colors">{info.value}</p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <GlassCard onSubmit={handleSubmit} className="p-8 relative overflow-hidden">
                            {/* Animated Border Effect */}
                            <motion.div
                                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity pointer-events-none"
                                animate={{
                                    background: [
                                        'linear-gradient(0deg, transparent, rgba(0,240,255,0.1), transparent)',
                                        'linear-gradient(360deg, transparent, rgba(0,240,255,0.1), transparent)'
                                    ]
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                            
                            <form className="space-y-6 relative z-10">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    viewport={{ once: true }}
                                >
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                                    <motion.input
                                        type="text"
                                        id="name"
                                        value={formState.name}
                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        required
                                        whileFocus={{ scale: 1.01, borderColor: "rgba(0, 240, 255, 0.5)" }}
                                        className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all"
                                    />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    viewport={{ once: true }}
                                >
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                                    <motion.input
                                        type="email"
                                        id="email"
                                        value={formState.email}
                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                        required
                                        whileFocus={{ scale: 1.01, borderColor: "rgba(0, 240, 255, 0.5)" }}
                                        className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all"
                                    />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 }}
                                    viewport={{ once: true }}
                                >
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                                    <motion.textarea
                                        id="message"
                                        rows={4}
                                        value={formState.message}
                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                        required
                                        whileFocus={{ scale: 1.01, borderColor: "rgba(0, 240, 255, 0.5)" }}
                                        className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white resize-none focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all"
                                    />
                                </motion.div>
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting || isSent}
                                    whileHover={{ scale: 1.02, boxShadow: "0 10px 30px -10px rgba(0, 240, 255, 0.5)" }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-3 rounded-lg bg-neon-blue text-black font-bold hover:bg-neon-blue/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <motion.span 
                                            className="animate-pulse"
                                            animate={{ opacity: [1, 0.5, 1] }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                        >
                                            Sending...
                                        </motion.span>
                                    ) : isSent ? (
                                        <motion.span 
                                            className="text-green-800"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 200 }}
                                        >
                                            Message Sent!
                                        </motion.span>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" /> Send Message
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </GlassCard>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

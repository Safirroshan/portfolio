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
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSent(true);
            setFormState({ name: "", email: "", message: "" });
            setTimeout(() => setIsSent(false), 3000);
        }, 1500);
    };

    const contactInfo = [
        { icon: <Mail className="w-5 h-5" />, label: "Email", value: "safir.inbox@gmail.com", href: "mailto:safir.inbox@gmail.com", color: "text-[var(--neon-blue)]", bg: "bg-blue-500/10" },
        { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", value: "linkedin.com/in/safir", href: "https://www.linkedin.com/in/safir-a73666338", color: "text-[var(--neon-blue)]", bg: "bg-blue-500/10" },
        { icon: <Github className="w-5 h-5" />, label: "GitHub", value: "github.com/Safirroshan", href: "https://github.com/Safirroshan", color: "text-white", bg: "bg-white/5" },
        { icon: <Phone className="w-5 h-5" />, label: "Phone", value: "+91 8867561289", href: "tel:+918867561289", color: "text-emerald-400", bg: "bg-emerald-500/10" }
    ];

    return (
        <section id="contact" className="py-24 px-4 relative overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 gradient-mesh opacity-50" />

            {/* 3D DNA Helix */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 opacity-10 pointer-events-none hidden lg:block">
                <DNAHelix />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-purple)] mb-3">
                        Get In Touch
                    </h2>
                    <p className="text-gray-400 max-w-lg mx-auto text-sm">
                        Interested in collaborating on AI projects or hiring for a role? Let&apos;s connect.
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
                        <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
                        <div className="space-y-3">
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
                                    whileHover={{ x: 6, boxShadow: "var(--card-shadow-hover)" }}
                                    className="premium-card flex items-center gap-4 p-4 group"
                                >
                                    <div className={`p-2.5 rounded-xl ${info.bg} ${info.color} transition-colors`}>
                                        {info.icon}
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{info.label}</p>
                                        <p className="text-white font-medium text-sm group-hover:text-[var(--neon-blue)] transition-colors">{info.value}</p>
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
                        <div className="premium-card p-7">
                            <form className="space-y-5" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="name" className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formState.name}
                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-[var(--neon-blue)] focus:ring-2 focus:ring-[var(--neon-blue)]/10 transition-all placeholder:text-gray-500"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formState.email}
                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-[var(--neon-blue)] focus:ring-2 focus:ring-[var(--neon-blue)]/10 transition-all placeholder:text-gray-500"
                                        placeholder="your@email.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Message</label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        value={formState.message}
                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm resize-none focus:outline-none focus:border-[var(--neon-blue)] focus:ring-2 focus:ring-[var(--neon-blue)]/10 transition-all placeholder:text-gray-500"
                                        placeholder="Tell me about your project..."
                                    />
                                </div>
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting || isSent}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    className="w-full py-3 rounded-xl bg-[var(--neon-blue)] text-white font-bold text-sm hover:bg-[var(--neon-blue)]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-md"
                                >
                                    {isSubmitting ? (
                                        <motion.span
                                            animate={{ opacity: [1, 0.5, 1] }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                        >
                                            Sending...
                                        </motion.span>
                                    ) : isSent ? (
                                        <span className="text-white">✓ Message Sent!</span>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" /> Send Message
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

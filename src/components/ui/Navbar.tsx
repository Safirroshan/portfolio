"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Link from 'next/link';

export default function Navbar() {
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        setScrolled(latest > 50);
    });

    const links = [
        { name: "About", href: "#about" },
        { name: "Tech Stack", href: "#tech-stack" },
        { name: "Projects", href: "#projects" },
        { name: "AI Lab", href: "#ai-lab" },
        { name: "Contact", href: "#contact" }
    ];

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: -100 }
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 z-40 flex justify-center pt-5 px-4"
        >
            <motion.div
                className={`px-8 py-3.5 rounded-2xl flex gap-8 transition-all duration-300 ${scrolled
                    ? "bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] shadow-[0_2px_16px_rgba(0,0,0,0.3)]"
                    : "bg-white/[0.02] backdrop-blur-md border border-transparent"
                    }`}
            >
                {links.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        {link.name}
                        <motion.span
                            className="absolute -bottom-1 left-0 h-[2px] bg-[var(--neon-blue)] rounded-full"
                            initial={{ width: 0 }}
                            whileHover={{ width: "100%" }}
                            transition={{ duration: 0.3 }}
                        />
                    </Link>
                ))}
            </motion.div>
        </motion.nav>
    );
}

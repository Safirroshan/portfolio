"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
    children: React.ReactNode;
    variant?: "primary" | "secondary";
    className?: string;
    onClick?: () => void;
}

export default function MagneticButton({ children, variant = "primary", className, onClick }: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 300, damping: 20 });
    const springY = useSpring(y, { stiffness: 300, damping: 20 });

    const handleMouse = (e: MouseEvent) => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
            y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
        }
    };

    const resetMouse = () => { x.set(0); y.set(0); };

    const baseStyles = "relative px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300 flex items-center justify-center overflow-hidden group";
    const variants = {
        primary: "text-white bg-[var(--neon-blue)] hover:shadow-[0_8px_30px_rgba(0,102,255,0.25)] border border-[var(--neon-blue)]",
        secondary: "text-[var(--neon-blue)] bg-white/5 border border-white/10 hover:border-[var(--neon-blue)]/40 hover:bg-blue-500/10 hover:shadow-[0_8px_30px_rgba(59,130,246,0.12)]"
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={resetMouse}
            onClick={onClick}
            style={{ x: springX, y: springY }}
            whileTap={{ scale: 0.97 }}
            className={cn(baseStyles, variants[variant], className)}
        >
            <span className="relative z-10">{children}</span>
        </motion.button>
    );
}

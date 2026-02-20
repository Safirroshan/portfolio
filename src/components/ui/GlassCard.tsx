"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    variant?: "default" | "neon";
}

export default function GlassCard({
    children,
    className,
    variant = "default",
    ...props
}: GlassCardProps) {
    const variants = {
        default: "bg-glass-bg border-glass-border hover:border-white/20",
        neon: "bg-glass-bg border-neon-blue/30 shadow-[0_0_15px_-5px_rgba(0,240,255,0.1)] hover:border-neon-blue/60 hover:shadow-[0_0_20px_-5px_rgba(0,240,255,0.3)]"
    };

    return (
        <motion.div
            className={cn(
                "rounded-2xl border backdrop-blur-md p-6 transition-all duration-300",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
}

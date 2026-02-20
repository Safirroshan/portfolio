"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
    children: React.ReactNode;
    variant?: "primary" | "secondary";
}

export default function MagneticButton({
    children,
    className,
    variant = "primary",
    ...props
}: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current!.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const baseStyles = "relative px-8 py-3 rounded-full font-medium transition-colors duration-300 flex items-center justify-center overflow-hidden group";
    const variants = {
        primary: "text-black bg-neon-blue hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] border border-neon-blue",
        secondary: "text-neon-blue bg-transparent border border-neon-blue hover:bg-neon-blue/10 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]"
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x * 0.5, y: position.y * 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={cn(baseStyles, variants[variant], className)}
            {...props}
        >
            {/* Animated Background Gradient */}
            <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{
                    background: variant === "primary" 
                        ? ['linear-gradient(0deg, rgba(0,240,255,1), rgba(0,200,255,1))', 'linear-gradient(360deg, rgba(0,240,255,1), rgba(0,200,255,1))']
                        : ['linear-gradient(0deg, rgba(0,240,255,0.1), rgba(0,240,255,0.2))', 'linear-gradient(360deg, rgba(0,240,255,0.1), rgba(0,240,255,0.2))']
                }}
                transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Shimmer Effect */}
            <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-30"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                    width: '50%'
                }}
            />
            
            <span className="relative z-10">{children}</span>
        </motion.button>
    );
}

"use client";

import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    variant?: "default" | "neon";
}

export default function GlassCard({
    children,
    className,
    variant = "default",
    ...props
}: GlassCardProps) {
    const variants = {
        default: "bg-white/[0.03] border-white/[0.06] shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)]",
        neon: "bg-white/[0.03] border-[var(--neon-blue)]/20 shadow-[0_0_15px_-5px_rgba(59,130,246,0.08)] hover:border-[var(--neon-blue)]/40 hover:shadow-[0_0_20px_-5px_rgba(59,130,246,0.15)]"
    };

    return (
        <div
            className={cn(
                "border rounded-2xl p-6 transition-all duration-300",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

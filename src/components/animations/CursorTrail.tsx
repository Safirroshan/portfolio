"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function CursorTrail() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;

        const nodes: Node[] = [];
        const mouse = { x: width / 2, y: height / 2 };
        const maxNodes = 6;

        class Node {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            life: number;

            constructor(x: number, y: number) {
                this.x = x + (Math.random() - 0.5) * 30;
                this.y = y + (Math.random() - 0.5) * 30;
                this.vx = (Math.random() - 0.5) * 2;
                this.vy = (Math.random() - 0.5) * 2;
                this.size = Math.random() * 2 + 1;
                this.life = 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.vx *= 0.95;
                this.vy *= 0.95;
                this.life -= 0.012;
            }

            draw() {
                if (!ctx) return;
                
                ctx.globalAlpha = this.life;
                ctx.shadowBlur = 10;
                ctx.shadowColor = "#00f0ff";
                
                ctx.fillStyle = "#00f0ff";
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.shadowBlur = 0;
                ctx.globalAlpha = 1;
            }
        }

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            setCursorPos({ x: e.clientX, y: e.clientY });
            
            // Add nodes
            if (nodes.length < maxNodes) {
                nodes.push(new Node(mouse.x, mouse.y));
            }
            
            const target = e.target as HTMLElement;
            const isInteractive = target.tagName === 'A' || 
                                 target.tagName === 'BUTTON' || 
                                 target.closest('a') !== null || 
                                 target.closest('button') !== null ||
                                 target.style.cursor === 'pointer';
            setIsHovering(isInteractive);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < nodes.length; i++) {
                nodes[i].update();
                
                if (nodes[i].life <= 0) {
                    nodes.splice(i, 1);
                    i--;
                    continue;
                }
                
                nodes[i].draw();
            }

            // Draw connections
            ctx.globalAlpha = 0.2;
            for (let i = 0; i < nodes.length - 1; i++) {
                ctx.strokeStyle = "#00f0ff";
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[i + 1].x, nodes[i + 1].y);
                ctx.stroke();
            }
            ctx.globalAlpha = 1;

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    return (
        <>
            <canvas
                ref={canvasRef}
                className="fixed inset-0 pointer-events-none z-50"
            />
            
            {/* Animated Arrow Cursor */}
            <motion.div
                className="fixed pointer-events-none z-[60]"
                animate={{
                    x: cursorPos.x,
                    y: cursorPos.y,
                }}
                transition={{
                    type: "spring",
                    stiffness: 800,
                    damping: 35,
                    mass: 0.2
                }}
            >
                <motion.svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    className="drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]"
                    animate={{
                        scale: isClicking ? 0.8 : isHovering ? 1.3 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                >
                    {/* Main Arrow */}
                    <motion.path
                        d="M 4 4 L 4 24 L 12 16 L 16 28 L 20 26 L 16 14 L 24 16 Z"
                        fill="#00f0ff"
                        stroke="#00f0ff"
                        strokeWidth="1"
                        animate={{
                            fill: isHovering ? "#b000ff" : "#00f0ff",
                            stroke: isHovering ? "#b000ff" : "#00f0ff",
                        }}
                    />
                    
                    {/* Glowing outline */}
                    <motion.path
                        d="M 4 4 L 4 24 L 12 16 L 16 28 L 20 26 L 16 14 L 24 16 Z"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="0.5"
                        opacity="0.6"
                        animate={{
                            opacity: [0.6, 1, 0.6],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </motion.svg>
                
                {/* Orbiting particles */}
                {[0, 120, 240].map((angle, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-neon-blue rounded-full"
                        style={{
                            left: '16px',
                            top: '16px',
                        }}
                        animate={{
                            x: Math.cos((angle + (isHovering ? 180 : 0)) * Math.PI / 180) * (isHovering ? 25 : 18),
                            y: Math.sin((angle + (isHovering ? 180 : 0)) * Math.PI / 180) * (isHovering ? 25 : 18),
                            scale: isHovering ? 1.5 : 1,
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            x: { duration: 0.3 },
                            y: { duration: 0.3 },
                            scale: { duration: 0.3 },
                            opacity: {
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.3
                            }
                        }}
                    />
                ))}
                
                {/* Scanning rings on hover */}
                {isHovering && (
                    <>
                        <motion.div
                            className="absolute top-4 left-4 w-8 h-8 border border-neon-purple rounded-full -translate-x-1/2 -translate-y-1/2"
                            initial={{ scale: 0.5, opacity: 1 }}
                            animate={{ scale: 2.5, opacity: 0 }}
                            transition={{ duration: 1, repeat: Infinity }}
                        />
                        <motion.div
                            className="absolute top-4 left-4 w-8 h-8 border border-neon-blue rounded-full -translate-x-1/2 -translate-y-1/2"
                            initial={{ scale: 0.5, opacity: 1 }}
                            animate={{ scale: 2.5, opacity: 0 }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                        />
                    </>
                )}
                
                {/* Click ripple effect */}
                {isClicking && (
                    <motion.div
                        className="absolute top-4 left-4 w-12 h-12 border-2 border-neon-blue rounded-full -translate-x-1/2 -translate-y-1/2"
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 3, opacity: 0 }}
                        transition={{ duration: 0.6 }}
                    />
                )}
                
                {/* Data stream lines */}
                <motion.div
                    className="absolute top-0 left-0 w-16 h-16 -translate-x-1/4 -translate-y-1/4"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                    {[0, 90, 180, 270].map((angle, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-8 h-0.5 bg-gradient-to-r from-transparent via-neon-blue to-transparent"
                            style={{
                                left: '50%',
                                top: '50%',
                                transformOrigin: 'left center',
                                transform: `rotate(${angle}deg)`,
                            }}
                            animate={{
                                opacity: [0, 0.6, 0],
                                scaleX: [0, 1, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.5,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </motion.div>
            </motion.div>
        </>
    );
}

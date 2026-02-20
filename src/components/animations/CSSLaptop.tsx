"use client";

import { motion } from "framer-motion";

export default function CSSLaptop() {
    return (
        <div className="w-full h-full flex items-center justify-center" style={{ perspective: "1000px" }}>
            <motion.div
                initial={{ rotateX: 60, rotateZ: 30, opacity: 0 }}
                animate={{ rotateX: 10, rotateZ: -10, rotateY: -20, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="relative w-[300px] h-[200px] md:w-[500px] md:h-[320px] group"
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Screen (Top Lid) */}
                <div className="absolute inset-0 bg-gray-900 rounded-xl border-4 border-gray-700 shadow-2xl transform-style-3d origin-bottom transition-transform duration-500 group-hover:rotate-x-[-10deg]">
                    {/* Screen Face */}
                    <div className="absolute inset-0 bg-black m-2 rounded overflow-hidden flex items-center justify-center border border-gray-800">
                        <div className="text-center">
                            <div className="text-neon-blue font-mono text-xs md:text-sm mb-1 animate-pulse">SYSTEM ONLINE</div>
                            <div className="text-gray-500 text-[10px] md:text-xs">Initializing AI Core...</div>
                            {/* Simulated Code Rain */}
                            <div className="mt-4 space-y-1 opacity-50">
                                <div className="h-1 w-24 bg-neon-purple/50 rounded mx-auto" />
                                <div className="h-1 w-16 bg-neon-blue/50 rounded mx-auto" />
                                <div className="h-1 w-20 bg-green-500/50 rounded mx-auto" />
                            </div>
                        </div>
                        {/* Glossy Reflection */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                    </div>
                    {/* Camera */}
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-black rounded-full shadow-[0_0_2px_rgba(255,255,255,0.2)]" />

                    {/* Back of Lid (Logo) */}
                    <div className="absolute inset-0 bg-gray-800 rounded-xl transform translate-z-[-2px] flex items-center justify-center rotate-y-180 backface-hidden">
                        <div className="w-8 h-8 bg-white/10 rounded-full blur-md" />
                    </div>
                </div>

                {/* Base (Bottom) */}
                <div className="absolute bottom-0 left-0 w-full h-[30px] bg-gray-800 rounded-b-xl transform rotate-x-[90deg] origin-bottom translate-y-[15px] translate-z-[10px] shadow-lg border-t border-gray-700">
                    {/* Keyboard Area Preview (Top of base) */}
                    <div className="absolute inset-0 bg-gray-900 transform rotate-x-[-90deg] origin-top translate-y-[-30px]">
                        <div className="w-full h-full p-4 flex flex-col justify-end items-center">
                            <div className="w-1/3 h-16 bg-gray-800 rounded mb-2 border border-white/5" />
                        </div>
                    </div>
                </div>

                {/* Shadow */}
                <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[120%] h-10 bg-black/50 blur-xl rounded-full transform rotate-x-[60deg]" />

            </motion.div>
        </div>
    );
}

"use client";

import { motion } from "framer-motion";

export default function CSSLaptop() {
    const codeLines = [
        { indent: 0, tokens: [{ text: 'import', color: '#c678dd' }, { text: ' { Brain, Pipeline }', color: '#e5c07b' }, { text: ' from', color: '#c678dd' }, { text: " 'ai-core'", color: '#98c379' }] },
        { indent: 0, tokens: [{ text: 'import', color: '#c678dd' }, { text: ' { YOLO }', color: '#e5c07b' }, { text: ' from', color: '#c678dd' }, { text: " 'vision'", color: '#98c379' }] },
        { indent: 0, tokens: [] },
        { indent: 0, tokens: [{ text: 'const', color: '#c678dd' }, { text: ' model', color: '#e06c75' }, { text: ' = ', color: '#abb2bf' }, { text: 'new', color: '#c678dd' }, { text: ' Brain', color: '#e5c07b' }, { text: '({', color: '#abb2bf' }] },
        { indent: 1, tokens: [{ text: 'layers', color: '#e06c75' }, { text: ': ', color: '#abb2bf' }, { text: '128', color: '#d19a66' }, { text: ',', color: '#abb2bf' }] },
        { indent: 1, tokens: [{ text: 'activation', color: '#e06c75' }, { text: ': ', color: '#abb2bf' }, { text: "'relu'", color: '#98c379' }, { text: ',', color: '#abb2bf' }] },
        { indent: 1, tokens: [{ text: 'optimizer', color: '#e06c75' }, { text: ': ', color: '#abb2bf' }, { text: "'adam'", color: '#98c379' }] },
        { indent: 0, tokens: [{ text: '})', color: '#abb2bf' }] },
        { indent: 0, tokens: [] },
        { indent: 0, tokens: [{ text: 'async function', color: '#c678dd' }, { text: ' detect', color: '#61afef' }, { text: '(frame) {', color: '#abb2bf' }] },
        { indent: 1, tokens: [{ text: 'const', color: '#c678dd' }, { text: ' results', color: '#e06c75' }, { text: ' = ', color: '#abb2bf' }, { text: 'await', color: '#c678dd' }, { text: ' YOLO', color: '#e5c07b' }, { text: '.predict(', color: '#abb2bf' }] },
        { indent: 2, tokens: [{ text: 'frame', color: '#e06c75' }, { text: ', { ', color: '#abb2bf' }, { text: 'conf', color: '#e06c75' }, { text: ': ', color: '#abb2bf' }, { text: '0.85', color: '#d19a66' }, { text: ' }', color: '#abb2bf' }] },
        { indent: 1, tokens: [{ text: ')', color: '#abb2bf' }] },
        { indent: 1, tokens: [{ text: 'return', color: '#c678dd' }, { text: ' results.filter(', color: '#abb2bf' }, { text: 'r', color: '#e06c75' }, { text: ' =>', color: '#c678dd' }] },
        { indent: 2, tokens: [{ text: 'r.score', color: '#e06c75' }, { text: ' > ', color: '#abb2bf' }, { text: '0.9', color: '#d19a66' }] },
        { indent: 1, tokens: [{ text: ')', color: '#abb2bf' }] },
        { indent: 0, tokens: [{ text: '}', color: '#abb2bf' }] },
    ];

    return (
        <div className="w-full h-full flex items-center justify-center" style={{ perspective: "1200px" }}>
            <motion.div
                initial={{ rotateX: 50, rotateZ: 25, opacity: 0, scale: 0.8 }}
                animate={{ rotateX: 8, rotateZ: -8, rotateY: -15, opacity: 1, scale: 1 }}
                transition={{ duration: 1.8, ease: "easeOut" }}
                className="relative w-[340px] h-[220px] md:w-[520px] md:h-[340px] group"
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Screen */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl border border-gray-300 shadow-[0_30px_80px_rgba(0,0,0,0.12)] origin-bottom transition-transform duration-700 group-hover:rotate-x-[-5deg]">
                    {/* Screen Face — Code Editor */}
                    <div className="absolute inset-0 bg-[#1e1e2e] m-[6px] md:m-2 rounded-lg overflow-hidden flex flex-col">
                        {/* Title Bar */}
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#181825] border-b border-[#313244]">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#f38ba8]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#f9e2af]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#a6e3a1]" />
                            <span className="ml-3 text-[8px] md:text-[10px] text-[#6c7086] font-mono">ai_engine.ts — safir</span>
                        </div>

                        {/* Code Area */}
                        <div className="flex-1 p-2 md:p-3 overflow-hidden">
                            <div className="space-y-[2px] md:space-y-[3px]">
                                {codeLines.map((line, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.8 + i * 0.08, duration: 0.3 }}
                                        className="flex items-center"
                                    >
                                        <span className="w-4 md:w-6 text-[7px] md:text-[9px] text-[#6c7086] font-mono text-right mr-2 md:mr-3 select-none">
                                            {i + 1}
                                        </span>
                                        <div className="flex" style={{ paddingLeft: `${line.indent * 14}px` }}>
                                            {line.tokens.map((token, j) => (
                                                <span key={j} className="text-[7px] md:text-[10px] font-mono whitespace-pre" style={{ color: token.color }}>
                                                    {token.text}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Glossy Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] to-transparent pointer-events-none rounded-xl" />
                    {/* Camera dot */}
                    <div className="absolute top-[3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gray-400 rounded-full" />
                </div>

                {/* Base */}
                <div className="absolute bottom-0 left-0 w-full h-[25px] bg-gradient-to-b from-gray-200 to-gray-300 rounded-b-xl transform rotate-x-[90deg] origin-bottom translate-y-[12px] shadow-lg border-t border-gray-300">
                    <div className="absolute inset-0 bg-gray-200 transform rotate-x-[-90deg] origin-top translate-y-[-25px]">
                        <div className="w-full h-full p-3 flex flex-col justify-end items-center">
                            <div className="w-1/3 h-14 bg-gray-300 rounded-sm border border-gray-300/50" />
                        </div>
                    </div>
                </div>

                {/* Shadow */}
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[110%] h-8 bg-black/8 blur-2xl rounded-full transform rotate-x-[60deg]" />
            </motion.div>
        </div>
    );
}

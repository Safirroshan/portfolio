"use client";

import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, Loader2, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import GlassCard from "../ui/GlassCard";
import { cn } from "@/lib/utils";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function Chatbot() {
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Hello! I'm Safir's AI Assistant. Ask me about his projects, skills, or experience!" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(true);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Scroll function: 'auto' is instant/jerky but necessary for streaming to stick
    const scrollToBottom = (behavior: ScrollBehavior = "auto") => {
        if (scrollContainerRef.current) {
            // Scroll within the container only, don't affect page scroll
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    };

    // Auto-scroll effect
    // We use useLayoutEffect to scroll BEFORE the browser paints the new frame 
    // to prevent visual jumping, but useEffect is usually fine for chat.
    // changed to useEffect to ensure layout is done.
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        // Calculate if we were already at the bottom before this update? 
        // No, we need to check if we SHOULD be at the bottom.
        // Actually, simpler logic:
        // If content is added, we usually want to scroll IF the user hasn't scrolled up away from bottom.

        const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 150;

        // Always scroll if it's the assistant typing (streaming) and user was near bottom
        // Or if it's a new message
        if (isLoading || isNearBottom || messages.length <= 2) {
            // Use "auto" (instant) to stick properly during high-speed low-latency updates
            scrollToBottom("auto");
        }
    }, [messages, isLoading]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: "user", content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        // Initial scroll for user message (can be smooth)
        setTimeout(() => scrollToBottom("smooth"), 50);

        try {
            const response = await fetch('http://localhost:8000/api/chat/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input })
            });

            if (!response.body) return;

            // Create a new assistant message placeholder
            setMessages(prev => [...prev, { role: "assistant", content: "" }]);

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let accumulatedResponse = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                accumulatedResponse += chunk;

                // Update the last message
                setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMsg = newMessages[newMessages.length - 1];
                    lastMsg.content = accumulatedResponse;
                    return newMessages;
                });
                // Scrolling is handled by useEffect on [messages] change
            }

        } catch (error) {
            console.error("Error sending message:", error);
            setMessages(prev => [...prev, {
                role: "assistant",
                content: "**Error:** Could not connect to backend. Is it running on port 8000?"
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const suggestions = [
        "What AI systems have you built?",
        "Explain your YOLO project",
        "Why should we hire you?"
    ];

    if (!isOpen) {
        return (
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 p-4 rounded-full bg-neon-blue text-black shadow-[0_0_20px_rgba(0,240,255,0.5)] hover:shadow-[0_0_40px_rgba(0,240,255,0.8)] transition-all z-50 group"
            >
                <Bot className="w-8 h-8 group-hover:rotate-12 transition-transform" />
            </motion.button>
        );
    }

    return (
        <GlassCard variant="neon" className="h-[600px] flex flex-col relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue to-neon-purple opacity-50" />

            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-black/40 backdrop-blur-md z-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-neon-blue/10 text-neon-blue">
                        <Bot className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-sm">AI Assistant</h3>
                    </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Messages */}
            <div
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto space-y-4 p-4 custom-scrollbar"
            >
                {messages.map((msg, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25, delay: idx === messages.length - 1 ? 0.05 : 0 }}
                        className={cn(
                            "flex gap-3 max-w-[90%]",
                            msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                        )}
                    >
                        <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                            msg.role === "user" ? "bg-neon-purple/20 text-neon-purple" : "bg-neon-blue/20 text-neon-blue"
                        )}>
                            {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                        </div>
                        <div className={cn(
                            "p-3 rounded-lg text-sm leading-relaxed",
                            msg.role === "user"
                                ? "bg-neon-purple/10 border border-neon-purple/20 text-gray-200"
                                : "bg-gray-800/50 border border-gray-700 text-gray-300"
                        )}>
                            <ReactMarkdown
                                components={{
                                    strong: ({ node, ...props }) => <span className="text-neon-blue font-bold" {...props} />,
                                    ul: ({ node, ...props }) => <ul className="list-disc ml-4 my-2" {...props} />,
                                    li: ({ node, ...props }) => <li className="mb-1" {...props} />
                                }}
                            >
                                {msg.content}
                            </ReactMarkdown>
                        </div>
                    </motion.div>
                ))}
                {isLoading && messages[messages.length - 1].role === 'user' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex gap-3 ml-0"
                    >
                        <div className="w-8 h-8 rounded-full bg-neon-blue/20 text-neon-blue flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                            <Bot className="w-4 h-4" />
                        </div>
                        <div className="bg-gray-800/50 border border-gray-700 p-3 rounded-lg flex items-center gap-2 max-w-[85%]">
                            {/* Animated typing dots */}
                            <div className="flex space-x-1.5 h-4 items-center px-1">
                                <motion.div className="w-1.5 h-1.5 bg-neon-blue rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                                <motion.div className="w-1.5 h-1.5 bg-neon-purple rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                                <motion.div className="w-1.5 h-1.5 bg-neon-blue rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
                            </div>
                            <span className="text-xs text-gray-400 font-medium ml-1">Typing...</span>
                        </div>
                    </motion.div>
                )}
                {/* The invisible anchor at the bottom */}
                <div ref={messagesEndRef} className="h-px bg-transparent" />
            </div>

            {/* Inputs */}
            <div className="p-4 bg-black/20 backdrop-blur-sm border-t border-gray-800">
                {/* Suggestions */}
                {messages.length < 3 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {suggestions.map((suggestion, i) => (
                            <button
                                key={i}
                                onClick={() => setInput(suggestion)}
                                className="text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-neon-blue/30 text-gray-400 hover:text-neon-blue transition-all"
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                )}

                <div className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder="Ask about my projects..."
                        className="w-full bg-black/40 border border-gray-700 rounded-xl py-3 pl-4 pr-12 text-white placeholder:text-gray-500 focus:outline-none focus:border-neon-blue/50 focus:ring-1 focus:ring-neon-blue/50 transition-all"
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-neon-blue/10 text-neon-blue hover:bg-neon-blue hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </GlassCard>
    );
}

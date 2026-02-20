"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Loader2, X, Minimize2, Maximize2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { API_ENDPOINTS } from "@/lib/config";
import { getSimpleResponse } from "@/lib/simpleChatbot";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function FloatingChatbot() {
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Hello! I'm Safir's AI Assistant. Ask me about his projects, skills, or experience!" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = (behavior: ScrollBehavior = "auto") => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 150;

        if (isLoading || isNearBottom || messages.length <= 2) {
            scrollToBottom("auto");
        }
    }, [messages, isLoading]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: "user", content: input };
        setMessages(prev => [...prev, userMessage]);
        const userInput = input;
        setInput("");
        setIsLoading(true);

        setTimeout(() => scrollToBottom("smooth"), 50);

        try {
            const response = await fetch(API_ENDPOINTS.chat, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userInput })
            });

            if (!response.ok) {
                throw new Error('Backend not available');
            }

            if (!response.body) {
                throw new Error('No response body');
            }

            setMessages(prev => [...prev, { role: "assistant", content: "" }]);

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let accumulatedResponse = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                accumulatedResponse += chunk;

                setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMsg = newMessages[newMessages.length - 1];
                    lastMsg.content = accumulatedResponse;
                    return newMessages;
                });
            }

        } catch (error) {
            console.log("Backend not available, using simple chatbot");
            
            // Use simple FAQ-based chatbot as fallback
            const simpleResponse = getSimpleResponse(userInput);
            
            setMessages(prev => [...prev, {
                role: "assistant",
                content: simpleResponse
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

    return (
        <>
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-8 right-8 z-50 group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="relative">
                            {/* Main Button */}
                            <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-r from-gray-900 to-black border border-neon-blue/40 shadow-[0_0_40px_rgba(0,240,255,0.3)] hover:shadow-[0_0_60px_rgba(0,240,255,0.5)] transition-all backdrop-blur-sm">
                                {/* Avatar */}
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple p-[2px]">
                                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                                            <Bot className="w-6 h-6 text-neon-blue" />
                                        </div>
                                    </div>
                                    {/* Online indicator */}
                                    <motion.div
                                        className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-black"
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                </div>
                                
                                {/* Text */}
                                <div className="text-left">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-white text-base">AI Assistant</h3>
                                        <motion.div
                                            animate={{ opacity: [0.5, 1, 0.5] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="w-2 h-2 bg-green-500 rounded-full"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-400">Ask me anything about Safir</p>
                                </div>
                                
                                {/* Arrow indicator */}
                                <motion.div
                                    animate={{ x: [0, 4, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="text-neon-blue"
                                >
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </motion.div>
                            </div>
                            
                            {/* Glow effect */}
                            <motion.div
                                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 blur-xl -z-10"
                                animate={{
                                    opacity: [0.5, 0.8, 0.5],
                                    scale: [1, 1.05, 1]
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={cn(
                            "fixed bottom-8 right-8 z-50 bg-gradient-to-b from-gray-900 to-black backdrop-blur-xl border border-neon-blue/40 rounded-2xl shadow-[0_0_60px_rgba(0,240,255,0.4)] overflow-hidden flex flex-col",
                            isMinimized ? "w-96 h-auto" : "w-[420px] h-[650px]"
                        )}
                    >
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-neon-blue via-neon-purple to-neon-blue" />

                        {/* Header */}
                        <div className="flex items-center justify-between p-5 border-b border-gray-800/50 bg-black/40 shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple p-[2px]">
                                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                                            <Bot className="w-5 h-5 text-neon-blue" />
                                        </div>
                                    </div>
                                    <motion.div
                                        className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-black"
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-base">AI Assistant</h3>
                                    <p className="text-xs text-gray-400 flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                        Online now
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setIsMinimized(!isMinimized)}
                                    className="text-gray-400 hover:text-neon-blue transition-colors p-2 hover:bg-white/5 rounded-lg"
                                >
                                    {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-400 hover:text-red-400 transition-colors p-2 hover:bg-white/5 rounded-lg"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {!isMinimized && (
                            <>
                                {/* Messages */}
                                <div
                                    ref={scrollContainerRef}
                                    className="flex-1 overflow-y-auto space-y-4 p-5 custom-scrollbar min-h-0"
                                >
                                    {messages.map((msg, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={msg.content === "" ? { opacity: 0, y: 10 } : false}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className={cn(
                                                "flex gap-3 max-w-[85%]",
                                                msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                                msg.role === "user" 
                                                    ? "bg-gradient-to-br from-neon-purple to-purple-600" 
                                                    : "bg-gradient-to-br from-neon-blue to-blue-600"
                                            )}>
                                                {msg.role === "user" ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                                            </div>
                                            <div className={cn(
                                                "p-4 rounded-2xl text-sm leading-relaxed",
                                                msg.role === "user"
                                                    ? "bg-gradient-to-br from-neon-purple/20 to-purple-600/20 border border-neon-purple/30 text-gray-100"
                                                    : "bg-gray-800/60 border border-gray-700/50 text-gray-200"
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
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 ml-0">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-blue to-blue-600 flex items-center justify-center shrink-0">
                                                <Bot className="w-4 h-4 text-white" />
                                            </div>
                                            <div className="bg-gray-800/60 border border-gray-700/50 p-4 rounded-2xl flex items-center gap-2">
                                                <Loader2 className="w-4 h-4 animate-spin text-neon-blue" />
                                                <span className="text-sm text-gray-300">Thinking...</span>
                                            </div>
                                        </motion.div>
                                    )}
                                    <div ref={messagesEndRef} className="h-px bg-transparent" />
                                </div>

                                {/* Input */}
                                <div className="p-5 bg-black/40 backdrop-blur-sm border-t border-gray-800/50 shrink-0">
                                    {messages.length < 3 && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {suggestions.map((suggestion, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setInput(suggestion)}
                                                    className="text-xs px-4 py-2 rounded-full bg-gray-800/60 hover:bg-gray-700/60 border border-gray-700/50 hover:border-neon-blue/40 text-gray-300 hover:text-neon-blue transition-all"
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
                                            placeholder="Ask me anything..."
                                            className="w-full bg-gray-900/60 border border-gray-700/50 rounded-xl py-3.5 pl-4 pr-12 text-white placeholder:text-gray-500 focus:outline-none focus:border-neon-blue/50 focus:ring-2 focus:ring-neon-blue/20 transition-all text-sm"
                                            disabled={isLoading}
                                        />
                                        <button
                                            onClick={handleSend}
                                            disabled={!input.trim() || isLoading}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple text-white hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                                        >
                                            <Send className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

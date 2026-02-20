"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface TypewriterTextProps {
    texts: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    delayBetween?: number;
    className?: string;
}

export default function TypewriterText({
    texts,
    typingSpeed = 100,
    deletingSpeed = 50,
    delayBetween = 2000,
    className
}: TypewriterTextProps) {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        const currentFullText = texts[currentTextIndex];

        if (isDeleting) {
            timer = setTimeout(() => {
                setDisplayText((prev) => prev.slice(0, -1));
                if (displayText.length === 0) {
                    setIsDeleting(false);
                    setCurrentTextIndex((prev) => (prev + 1) % texts.length);
                }
            }, deletingSpeed);
        } else {
            timer = setTimeout(() => {
                setDisplayText((prev) => currentFullText.slice(0, prev.length + 1));
                if (displayText === currentFullText) {
                    setTimeout(() => setIsDeleting(true), delayBetween);
                }
            }, typingSpeed);
        }

        return () => clearTimeout(timer);
    }, [displayText, isDeleting, currentTextIndex, texts, typingSpeed, deletingSpeed, delayBetween]);

    return (
        <motion.span
            className={className}
        >
            {displayText}
            <span className="animate-pulse">|</span>
        </motion.span>
    );
}

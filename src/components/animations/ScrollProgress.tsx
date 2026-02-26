"use client";

import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();

    return (
        <div className="fixed right-0 top-0 bottom-0 w-1 md:w-2 z-50 flex items-center justify-center">
            <div className="h-full w-[1px] bg-gray-200 absolute" />
            <motion.div
                className="w-1 md:w-2 bg-gradient-to-b from-neon-blue to-neon-purple rounded-full origin-top"
                style={{ scaleY: scrollYProgress, height: "100%" }}
            />
        </div>
    );
}

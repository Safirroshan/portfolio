"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, Upload, X, Loader2, Sparkles } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import ReactMarkdown from "react-markdown";

export default function ImageExplainer() {
    const [image, setImage] = useState<string | null>(null);
    const [analysis, setAnalysis] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
                setAnalysis(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAnalyze = async () => {
        if (!image) return;
        setIsAnalyzing(true);

        try {
            const formData = new FormData();
            // Convert data URL to blob is complex, for demo we might just send the base64 string or mock the upload if file input ref is available
            // For simplicity in this demo, we'll assume the backend accepts the file upload. 
            // Since we only have the base64 string in state 'image', we need the actual file object.
            // We'll use a hack to get the file from the input ref if possible, or just send a dummy request to trigger the backend response.

            // Note: In a real app, we'd store the File object in state too.
            if (fileInputRef.current?.files?.[0]) {
                formData.append('file', fileInputRef.current.files[0]);
            }

            const response = await fetch('http://localhost:8000/api/vision/analyze', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            setAnalysis(data.analysis);

        } catch (error) {
            console.error("Error analyzing image:", error);
            setAnalysis("**Error:** Could not connect to backend. Is it running on port 8000?");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const clearImage = () => {
        setImage(null);
        setAnalysis(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <GlassCard variant="neon" className="h-[500px] flex flex-col relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-neon-purple/10 text-neon-purple">
                    <ImageIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">AI Vision Explainer</h3>
            </div>

            <div className="flex-1 flex flex-col gap-4 overflow-hidden">
                {!image ? (
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-1 border-2 border-dashed border-gray-700 hover:border-neon-purple/50 rounded-xl bg-black/20 flex flex-col items-center justify-center cursor-pointer transition-all group"
                    >
                        <div className="p-4 rounded-full bg-gray-800 group-hover:bg-neon-purple/20 group-hover:text-neon-purple transition-colors text-gray-400 mb-3">
                            <Upload className="w-8 h-8" />
                        </div>
                        <p className="text-gray-400 text-sm font-medium group-hover:text-white transition-colors">Click to Upload Image</p>
                        <p className="text-xs text-gray-500 mt-1">Supports JPG, PNG, WEBP</p>
                    </div>
                ) : (
                    <div className="flex-1 relative rounded-xl overflow-hidden border border-gray-700 bg-black/50 group">
                        {/* Image Preview */}
                        <img src={image} alt="Uploaded" className="w-full h-full object-contain" />

                        {/* Delete Button */}
                        <button
                            onClick={clearImage}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white hover:bg-red-500/80 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        {/* Analysis Overlay */}
                        <AnimatePresence>
                            {analysis && (
                                <motion.div
                                    initial={{ opacity: 0, y: 100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute inset-0 bg-black/90 backdrop-blur-sm p-4 overflow-y-auto custom-scrollbar"
                                >
                                    <div className="text-sm text-gray-300 prose prose-invert prose-sm max-w-none">
                                        <ReactMarkdown>
                                            {analysis}
                                        </ReactMarkdown>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleUpload}
                    accept="image/*"
                    className="hidden"
                />

                {image && !analysis && (
                    <button
                        onClick={handleAnalyze}
                        disabled={isAnalyzing}
                        className="w-full py-3 rounded-xl bg-neon-purple text-white font-bold hover:bg-neon-purple/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                    >
                        {isAnalyzing ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" /> Analyzing Scene...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-4 h-4 fill-current" /> Explain Image
                            </>
                        )}
                    </button>
                )}
            </div>
        </GlassCard>
    );
}

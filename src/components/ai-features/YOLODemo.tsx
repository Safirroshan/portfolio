"use client";

import { useState, useRef, useEffect } from "react";
import { Camera, AlertCircle, Video, Play, StopCircle } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import { API_ENDPOINTS } from "@/lib/config";
import PhoneModel from "../animations/PhoneModel";

export default function YOLODemo() {
    const [isStreaming, setIsStreaming] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fps, setFps] = useState(0);
    const [detectedObjects, setDetectedObjects] = useState<string[]>([]);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const startCamera = async () => {
        try {
            setError(null);
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { width: 640, height: 480 }
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setIsStreaming(true);
            }
        } catch (err) {
            setError("Camera permission denied. Showing demo video instead.");
            setIsStreaming(false);
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
            setIsStreaming(false);
            setFps(0);
            setDetectedObjects([]);
        }
    };

    // Frame processing loop
    useEffect(() => {
        let animationFrameId: number;

        const sendFrame = async () => {
            if (!isStreaming || !videoRef.current || !canvasRef.current) return;

            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Draw video frame to canvas
            ctx.drawImage(videoRef.current, 0, 0, 640, 480);

            // Get blob from canvas
            canvas.toBlob(async (blob) => {
                if (!blob) return;

                try {
                    const formData = new FormData();
                    formData.append('file', blob);

                    const startTime = performance.now();
                    const response = await fetch(API_ENDPOINTS.yoloDetect, {
                        method: 'POST',
                        body: formData
                    });

                    if (response.ok) {
                        const data = await response.json();
                        const endTime = performance.now();
                        setFps(Math.round(1000 / (endTime - startTime)));

                        // Draw detections
                        ctx.clearRect(0, 0, 640, 480);

                        const currentDetections: string[] = [];

                        data.detections.forEach((det: any) => {
                            const [x1, y1, x2, y2] = det.bbox;
                            ctx.strokeStyle = '#00f0ff';
                            ctx.lineWidth = 2;
                            ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);

                            ctx.fillStyle = '#00f0ff';
                            ctx.font = '16px monospace';
                            ctx.fillText(`${det.class} ${det.confidence}`, x1, y1 - 5);

                            currentDetections.push(`${det.class} (${Math.round(det.confidence * 100)}%)`);
                        });

                        // Update unique detections list
                        setDetectedObjects([...new Set(currentDetections)]);
                    }
                } catch (err) {
                    console.error("Detection error:", err);
                }

                // Schedule next frame
                if (isStreaming) {
                    setTimeout(() => {
                        animationFrameId = requestAnimationFrame(sendFrame);
                    }, 100);
                }
            }, 'image/jpeg', 0.8);
        };

        if (isStreaming) {
            sendFrame();
        }

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [isStreaming]);

    return (
        <GlassCard variant="default" className="h-[600px] flex flex-col relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-neon-blue/10 text-neon-blue">
                    <Camera className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-white">Live Video Detection</h2>
                {isStreaming && (
                    <span className="ml-auto text-xs font-mono text-neon-blue animate-pulse">
                        {fps} FPS
                    </span>
                )}
            </div>

            <div className="flex-1 bg-white/[0.02] rounded-xl overflow-hidden relative border border-white/[0.06] group">
                {error ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/[0.02] text-center p-6">
                        <div className="z-10 bg-[#12121a] p-6 rounded-xl border border-red-500/20 shadow-md">
                            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                            <p className="text-red-500 font-bold mb-2">Permission Denied</p>
                            <p className="text-gray-500 text-sm">{error}</p>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Webcam Video */}
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="w-full h-full object-cover"
                            style={{ transform: 'scaleX(-1)' }}
                        />

                        {/* Canvas Overlay */}
                        <canvas
                            ref={canvasRef}
                            width={640}
                            height={480}
                            className="absolute inset-0 w-full h-full pointer-events-none"
                            style={{ transform: 'scaleX(-1)' }}
                        />

                        {!isStreaming && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/[0.02] z-10">
                                <p className="text-gray-400">Click Start to enable camera</p>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Detected Objects List */}
            <div className="mt-4 h-24 overflow-y-auto custom-scrollbar bg-white/[0.02] rounded-lg p-3 border border-white/[0.06]">
                <h3 className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Detected Objects</h3>
                <div className="flex flex-wrap gap-2">
                    {detectedObjects.length > 0 ? (
                        detectedObjects.map((obj, i) => (
                            <span key={i} className="px-2 py-1 rounded bg-neon-blue/10 text-neon-blue text-xs border border-neon-blue/20">
                                {obj}
                            </span>
                        ))
                    ) : (
                        <span className="text-gray-500 text-xs italic">No objects detected...</span>
                    )}
                </div>
            </div>

            <div className="mt-4 flex justify-center">
                {!isStreaming ? (
                    <button
                        onClick={startCamera}
                        className="px-6 py-2 rounded-lg bg-[var(--neon-blue)] text-white font-bold hover:bg-[var(--neon-blue)]/80 transition-colors flex items-center gap-2 shadow-md"
                    >
                        <Play className="w-4 h-4" /> Start Detection
                    </button>
                ) : (
                    <button
                        onClick={stopCamera}
                        className="px-6 py-2 rounded-lg bg-red-500/10 text-red-500 border border-red-500/50 hover:bg-red-500/20 transition-colors flex items-center gap-2"
                    >
                        <StopCircle className="w-4 h-4" /> Stop Stream
                    </button>
                )}
            </div>
        </GlassCard>
    );
}

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ShieldCheck, AlertCircle, Cpu, Zap } from "lucide-react";

export const GridHUD = () => {
    const [status, setStatus] = useState({
        label: "SCANNING GRID...",
        icon: Activity,
        color: "text-primary",
        border: "border-primary/20",
        message: "Network state: Optimized"
    });

    useEffect(() => {
        const handleScroll = () => {
            const scroll = window.scrollY;
            const height = window.innerHeight;

            if (scroll < height * 0.8) {
                setStatus({
                    label: "MONITORING IDLE",
                    icon: Activity,
                    color: "text-primary",
                    border: "border-primary/20",
                    message: "Core: Standing by..."
                });
            } else if (scroll < height * 2.0) {
                setStatus({
                    label: "STRESS DETECTED",
                    icon: AlertCircle,
                    color: "text-red-400",
                    border: "border-red-400/30",
                    message: "Load mismatch found."
                });
            } else if (scroll < height * 3.5) {
                setStatus({
                    label: "ORCHESTRATING",
                    icon: Zap,
                    color: "text-accent",
                    border: "border-accent/40",
                    message: "Optimization Active."
                });
            } else {
                setStatus({
                    label: "SECURE NODE",
                    icon: ShieldCheck,
                    color: "text-primary",
                    border: "border-primary/20",
                    message: "Grid Integrity: 100%"
                });
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="fixed top-32 right-8 z-[100] hidden lg:block">
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className={`glass p-4 rounded-2xl border ${status.border} backdrop-blur-xl w-64 overflow-hidden relative`}
            >
                {/* Decorative scanning line */}
                <motion.div
                    animate={{ y: [0, 100, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    className="absolute inset-x-0 top-0 h-[1px] bg-white/20 z-0"
                />

                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <status.icon className={`w-4 h-4 ${status.color} animate-pulse`} />
                            <span className={`text-[10px] font-black uppercase tracking-widest ${status.color}`}>{status.label}</span>
                        </div>
                        <div className="flex gap-1">
                            <div className="w-1 h-1 rounded-full bg-white/20" />
                            <div className="w-1 h-1 rounded-full bg-white/20" />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div>
                            <div className="text-[10px] opacity-30 font-bold uppercase mb-1">Status Report</div>
                            <div className="text-xs font-bold text-white/80">{status.message}</div>
                        </div>

                        <div className="pt-2 border-t border-white/5">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-[8px] opacity-30 font-bold uppercase">Edge Connectivity</span>
                                <span className="text-[8px] text-accent font-bold">STABLE</span>
                            </div>
                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    animate={{ width: ["90%", "95%", "92%"] }}
                                    className="h-full bg-accent"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mt-4">
                            <Cpu className="w-3 h-3 opacity-20" />
                            <div className="text-[8px] font-mono opacity-20">PID_X7_SECURE_AUTH</div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

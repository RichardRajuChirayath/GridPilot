"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, BatteryCharging, ShieldCheck, Zap } from "lucide-react";
import { GridBackground } from "./GridBackground";

export const Hero = () => {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
            <GridBackground />
            {/* Background Glows */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 blur-[120px] rounded-full animate-pulse-slow" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/20 blur-[120px] rounded-full animate-pulse-slow" />

            {/* Energy Network Lines */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                        transition={{
                            duration: 4 + i,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 2
                        }}
                        style={{
                            position: 'absolute',
                            top: `${20 + i * 15}%`,
                            left: 0,
                            right: 0,
                            height: '1px',
                            background: `linear-gradient(90deg, transparent, ${i % 2 === 0 ? 'var(--primary)' : 'var(--secondary)'}, transparent)`,
                            boxShadow: `0 0 10px ${i % 2 === 0 ? 'var(--primary)' : 'var(--secondary)'}`
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold mb-6">
                        Introducing Grid-Edge Orchestration
                    </span>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight">
                        Orchestrating <span className="text-gradient">EV Charging</span><br />
                        for a Stable, Clean Grid
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-foreground/70 mb-10">
                        Preventing local power infrastructure from becoming the bottleneck to EV adoption. Coordinate charging across buildings, fleets, and public hubs in real-time.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="w-full sm:w-auto px-8 py-4 bg-primary text-background font-bold rounded-2xl flex items-center justify-center gap-2 hover:scale-105 transition-transform active:scale-95 group">
                            Explore the Platform
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="w-full sm:w-auto px-8 py-4 glass text-foreground font-bold rounded-2xl flex items-center justify-center gap-2 border border-white/10 hover:bg-white/5 transition-colors">
                            Read the Pitch
                        </button>
                    </div>

                    {/* Stats Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
                    >
                        {[
                            { icon: Zap, label: "Peak Load Reductions", value: "30%+" },
                            { icon: BatteryCharging, label: "Maximized Utilization", value: "2.5x" },
                            { icon: ShieldCheck, label: "Risk Mitigation", value: "Zero Overloads" }
                        ].map((stat, i) => (
                            <div key={i} className="glass p-6 rounded-3xl border border-white/5 flex flex-col items-center">
                                <stat.icon className="w-8 h-8 text-primary mb-3" />
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <div className="text-sm text-foreground/50">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Visual Indicator of Flow/Energy */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_0_20px_#00E5FF]" />
        </section>
    );
};

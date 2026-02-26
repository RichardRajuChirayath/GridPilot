"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Server, Workflow, Globe } from "lucide-react";

export const Technology = () => {
    const layers = [
        {
            icon: Cpu,
            name: "Grid-Edge Agents",
            desc: "Lightweight software deployed at chargers and buildings for local control."
        },
        {
            icon: Workflow,
            name: "Constraint Solver",
            desc: "Our proprietary engine balancing grid limits, user deadlines, and priorities."
        },
        {
            icon: Server,
            name: "Central Orchestration",
            desc: "High-level scheduling and optimization across the entire network."
        },
        {
            icon: Globe,
            name: "Forecasting Models",
            desc: "ML-driven insights for carbon intensity and local grid load."
        }
    ];

    return (
        <section id="technology" className="py-24 bg-background">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <div className="flex-1">
                        <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-4">Architecture</h2>
                        <h3 className="text-4xl font-bold mb-6">Built for <span className="text-gradient">Scale & Safety</span></h3>
                        <p className="text-foreground/60 text-lg mb-10">
                            GridPilot isn't just charger software. It's an infrastructure-first control system that sits between the demand of electric mobility and the physics of the power grid.
                        </p>

                        <div className="space-y-4">
                            {layers.map((layer, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ x: -20, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors group"
                                >
                                    <div className="shrink-0 w-12 h-12 rounded-xl glass border border-white/10 flex items-center justify-center text-primary group-hover:glow-primary">
                                        <layer.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">{layer.name}</h4>
                                        <p className="text-sm text-foreground/50">{layer.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 relative">
                        <div className="aspect-square glass rounded-[3rem] p-12 border border-white/10 flex items-center justify-center relative overflow-hidden">
                            {/* Animated Connection Lines */}
                            <div className="absolute inset-0 pointer-events-none">
                                <svg viewBox="0 0 400 400" className="w-full h-full opacity-30">
                                    <motion.path
                                        d="M 100 100 L 300 300 M 300 100 L 100 300"
                                        stroke="var(--color-primary)"
                                        strokeWidth="2"
                                        strokeDasharray="10 10"
                                        animate={{ strokeDashoffset: [0, -100] }}
                                        transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                                    />
                                    <motion.circle
                                        r="4"
                                        fill="var(--color-accent)"
                                        animate={{
                                            pathOffset: [0, 1],
                                            opacity: [0, 1, 0]
                                        }}
                                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                    >
                                        <animateMotion path="M 100 100 L 300 300" dur="2s" repeatCount="indefinite" />
                                    </motion.circle>
                                    <motion.circle
                                        r="4"
                                        fill="var(--color-secondary)"
                                        animate={{
                                            pathOffset: [0, 1],
                                            opacity: [0, 1, 0]
                                        }}
                                        transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                                    >
                                        <animateMotion path="M 300 100 L 100 300" dur="2.5s" repeatCount="indefinite" />
                                    </motion.circle>
                                </svg>
                            </div>

                            <div className="relative z-10 grid grid-cols-2 gap-8 text-center">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="glass p-6 rounded-2xl border border-primary/20 bg-primary/10 shadow-[0_0_30px_rgba(0,229,255,0.1)]"
                                >
                                    <div className="text-primary font-black text-2xl mb-1 italic">EDGE</div>
                                    <div className="text-[10px] uppercase font-bold opacity-50">Local Control</div>
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="glass p-6 rounded-2xl border border-secondary/20 bg-secondary/10 shadow-[0_0_30px_rgba(112,0,255,0.1)]"
                                >
                                    <div className="text-secondary font-black text-2xl mb-1 italic">CORE</div>
                                    <div className="text-[10px] uppercase font-bold opacity-50">Orchestration</div>
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="glass p-6 rounded-2xl border border-accent/20 bg-accent/10 shadow-[0_0_30px_rgba(0,255,163,0.1)]"
                                >
                                    <div className="text-accent font-black text-2xl mb-1 italic">DATA</div>
                                    <div className="text-[10px] uppercase font-bold opacity-50">Predictions</div>
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="glass p-6 rounded-2xl border border-white/20 bg-white/5"
                                >
                                    <div className="text-white font-black text-2xl mb-1 italic">API</div>
                                    <div className="text-[10px] uppercase font-bold opacity-50">Integration</div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Clock, Sun, LayoutDashboard, Database, Activity } from "lucide-react";

export const Solution = () => {
    const capabilities = [
        {
            icon: Shield,
            title: "Local Grid Guardrails",
            description: "Enforces transformer and feeder capacity limits in real-time to prevent any local overload."
        },
        {
            icon: Clock,
            title: "Smart Charging Scheduler",
            description: "Queues and staggers EV charging based on user deadlines and optimal grid windows."
        },
        {
            icon: Sun,
            title: "Carbon-Aware Dispatch",
            description: "Automatically shifts flexible demand to low-carbon windows or aligns with on-site solar."
        },
        {
            icon: LayoutDashboard,
            title: "Unified Control Plane",
            description: "Set admin policies, power budgets, and monitor reliability across buildings and zones."
        },
        {
            icon: Database,
            title: "Predictive Analytics",
            description: "Generate load forecasts and congestion alerts to stay ahead of grid fluctuations."
        },
        {
            icon: Activity,
            title: "Hardware Agnostic",
            description: "Works seamlessly across different charger vendors and building management systems."
        }
    ];

    return (
        <section id="solution" className="py-24 bg-primary/5 border-y border-white/5 relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-accent font-bold uppercase tracking-widest text-sm mb-4">The Platform</h2>
                    <h3 className="text-4xl md:text-5xl font-bold">Real-time <span className="text-gradient">Orchestration Layer</span></h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {capabilities.map((c, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="glass p-10 rounded-[2.5rem] border border-white/5 hover:translate-y-[-5px] transition-all duration-500 overflow-hidden relative group"
                        >
                            {/* X-Ray Schematic Background (Visible on Hover) */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] scale-150 rotate-12" />
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-gradient-to-br from-primary/20 via-transparent to-transparent pointer-events-none" />

                            <div className="bg-primary/20 w-16 h-16 rounded-3xl flex items-center justify-center mb-8 glow-primary relative z-10">
                                <c.icon className="text-primary w-8 h-8" />
                            </div>
                            <h4 className="text-2xl font-bold mb-4">{c.title}</h4>
                            <p className="text-foreground/60 leading-relaxed font-medium">
                                {c.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

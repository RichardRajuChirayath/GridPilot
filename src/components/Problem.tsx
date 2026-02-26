"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, TrendingUp, ZapOff, CloudLightning } from "lucide-react";

export const Problem = () => {
    const problems = [
        {
            icon: TrendingUp,
            title: "Concentrated Demand",
            description: "EV charging demand spikes at predictable peak hours, overwhelming local distribution networks."
        },
        {
            icon: ZapOff,
            title: "Infrastructure Overload",
            description: "Distribution networks face transformer overloads, voltage drops, and frequent outages."
        },
        {
            icon: CloudLightning,
            title: "High Carbon Intensity",
            description: "Synchronized charging often aligns with 'dirty' peak generation, increasing net emissions."
        },
        {
            icon: AlertTriangle,
            title: "Capex Hurdle",
            description: "Forcing massive grid upgrades creates a structural bottleneck that slows down EV adoption."
        }
    ];

    return (
        <section id="problem" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-sm font-bold text-accent tracking-widest uppercase mb-4">The Challenge</h2>
                        <h3 className="text-4xl md:text-5xl font-bold">The <span className="text-gradient">EV–Grid Mismatch</span> is the Silent Bottleneck</h3>
                    </div>
                    <p className="text-foreground/60 max-w-sm">
                        Current grids weren't built for high-power, synchronized charging. Without orchestration, electrification leads to infrastructure failure.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {problems.map((p, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass p-8 rounded-[2rem] border border-white/5 hover:border-primary/20 transition-all group"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                                <p.icon className="w-8 h-8 text-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <h4 className="text-xl font-bold mb-3">{p.title}</h4>
                            <p className="text-foreground/50 text-sm leading-relaxed">{p.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

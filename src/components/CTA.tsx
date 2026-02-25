"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Mail, ArrowRight } from "lucide-react";

export const CTA = () => {
    return (
        <section className="py-32 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="glass p-12 md:p-24 rounded-[4rem] text-center border border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8">
                        <Zap className="w-32 h-32 text-primary opacity-5 -rotate-12" />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl font-black mb-8">Ready to <span className="text-gradient">Upgrade your Grid?</span></h2>
                        <p className="max-w-xl mx-auto text-lg text-foreground/60 mb-12">
                            Join the pilot program. Defer infrastructure capex and enable high-speed EV scale today.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <div className="w-full sm:w-96 relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30 w-5 h-5" />
                                <input
                                    type="email"
                                    placeholder="Enter your enterprise email"
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-primary/50 outline-none transition-all font-medium"
                                />
                            </div>
                            <button className="w-full sm:w-auto px-10 py-4 bg-primary text-background font-bold rounded-2xl flex items-center justify-center gap-2 hover:scale-105 transition-transform active:scale-95">
                                Join Pilot
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>

                        <p className="mt-8 text-xs font-bold text-foreground/30 uppercase tracking-[0.2em]">
                            Trusted by 4 campuses & 2 municipal fleets
                        </p>
                    </motion.div>
                </div>

                <footer className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Zap className="text-primary w-5 h-5" />
                        <span className="font-bold text-lg">GridPilot</span>
                    </div>
                    <div className="flex gap-8 text-sm text-foreground/40 font-medium">
                        <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                        <a href="#" className="hover:text-primary transition-colors">Terms</a>
                        <a href="#" className="hover:text-primary transition-colors">Documentation</a>
                        <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
                    </div>
                    <p className="text-xs text-foreground/20 font-mono">
                        © 2024 GRIDPILOT CORE. ALL RIGHTS RESERVED.
                    </p>
                </footer>
            </div>
        </section>
    );
};

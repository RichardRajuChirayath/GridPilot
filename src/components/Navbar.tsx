"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export const Navbar = () => {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 glass-dark m-4 rounded-2xl border border-white/10"
        >
            <Link href="/" className="flex items-center gap-2">
                <div className="bg-primary/20 p-2 rounded-lg glow-primary">
                    <Zap className="text-primary w-6 h-6" />
                </div>
                <span className="text-xl font-bold tracking-tight">GridPilot</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
                <Link href="#problem" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">The Problem</Link>
                <Link href="#simulation" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">Simulation</Link>
                <Link href="#solution" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">Solution</Link>
                <Link href="#technology" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">Technology</Link>
                <Link href="#impact" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">Impact</Link>
            </div>

            <button className="bg-primary hover:bg-primary/90 text-background font-bold py-2 px-6 rounded-xl transition-all active:scale-95">
                Get Access
            </button>
        </motion.nav>
    );
};

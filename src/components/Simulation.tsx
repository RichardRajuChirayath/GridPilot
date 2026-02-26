"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Zap,
    BatteryCharging,
    AlertTriangle,
    CheckCircle2,
    Building2,
    CarFront,
    Cpu,
    TrendingDown,
    DollarSign,
    ShieldCheck,
    Power
} from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine
} from "recharts";

const GRID_CAPACITY = 100;
const TRANSFORMER_MAX = 100;

export const Simulation = () => {
    const [mode, setMode] = useState<"unmanaged" | "managed">("unmanaged");
    const [carCount, setCarCount] = useState(6);
    const [data, setData] = useState<{ time: string; load: number; managedLoad: number }[]>([]);
    const [currentLoad, setCurrentLoad] = useState(0);
    const [savings, setSavings] = useState(0);

    // Generate simulation data based on real-world patterns
    useEffect(() => {
        let tick = 0;
        const interval = setInterval(() => {
            tick++;
            const baseLoad = 40 + Math.sin(tick * 0.2) * 10; // Building baseload
            const demandPerCar = 15; // kW

            let rawLoad = baseLoad + (carCount * demandPerCar);
            let managedLoad = rawLoad;

            if (mode === "managed") {
                const capacityLimit = TRANSFORMER_MAX * 0.85;
                managedLoad = Math.min(rawLoad, capacityLimit);
                // Aggressive ROI ticking
                setSavings(prev => prev + (rawLoad > capacityLimit ? 142 : 5));
            }

            setCurrentLoad(mode === "managed" ? managedLoad : rawLoad);

            setData((prev) => {
                const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                const newData = [...prev, {
                    time: timeStr,
                    load: parseFloat(rawLoad.toFixed(1)),
                    managedLoad: parseFloat(managedLoad.toFixed(1))
                }];
                return newData.slice(-30);
            });
        }, 800);

        return () => clearInterval(interval);
    }, [mode, carCount]);

    const status = useMemo(() => {
        if (currentLoad > TRANSFORMER_MAX) return { label: "CRITICAL FAILURE", color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/50", icon: AlertTriangle };
        if (currentLoad > TRANSFORMER_MAX * 0.85) return { label: "GRID STRESS", color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/50", icon: Zap };
        return { label: "OPTIMIZED", color: "text-accent", bg: "bg-accent/10", border: "border-accent/50", icon: CheckCircle2 };
    }, [currentLoad]);

    return (
        <section id="simulation" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center justify-between mb-16 gap-8">
                    <div className="max-w-2xl">
                        <h2 className="text-accent font-bold uppercase tracking-widest text-xs mb-4">Interactive Stress Test</h2>
                        <h3 className="text-4xl md:text-6xl font-black mb-6">Unmanaged vs <span className="text-gradient">Orchestrated</span></h3>
                        <p className="text-foreground/50 text-lg">
                            Watch how uncontrolled EV charging triggers localized grid collapse, and how GridPilot's edge-intelligence prevents it without slowing down the transition.
                        </p>
                    </div>

                    <div className="flex bg-white/5 p-2 rounded-2xl border border-white/10">
                        <button
                            onClick={() => setMode("unmanaged")}
                            className={`px-6 py-3 rounded-xl font-bold transition-all ${mode === "unmanaged" ? "bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]" : "text-white/40 hover:text-white"}`}
                        >
                            Unmanaged
                        </button>
                        <button
                            onClick={() => setMode("managed")}
                            className={`px-6 py-3 rounded-xl font-bold transition-all ${mode === "managed" ? "bg-accent text-background shadow-[0_0_20px_rgba(0,255,163,0.4)]" : "text-white/40 hover:text-white"}`}
                        >
                            GridPilot Mode
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">

                    {/* Left: Physical Visualization */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="glass p-8 rounded-[3rem] border border-white/10 relative h-[500px] overflow-hidden">
                            {/* Grid Layout Canvas */}
                            <div className="relative h-full w-full flex flex-col items-center justify-between py-10">

                                {/* Transformer Asset */}
                                <motion.div
                                    animate={currentLoad > TRANSFORMER_MAX ? { scale: [1, 1.05, 1], rotate: [0, 1, -1, 0] } : {}}
                                    transition={{ repeat: Infinity, duration: 0.2 }}
                                    className="relative group cursor-help"
                                >
                                    <div className={`p-8 rounded-full ${status.bg} border-2 ${status.border} transition-colors duration-500 relative z-10`}>
                                        <Zap className={`w-12 h-12 ${status.color} ${currentLoad > TRANSFORMER_MAX ? 'animate-pulse' : ''}`} />
                                    </div>
                                    <div className="absolute top-full mt-4 text-center w-full">
                                        <div className="text-xs font-bold opacity-30 uppercase tracking-tighter">Campus Transformer #82</div>
                                        <div className={`text-xl font-black ${status.color}`}>{status.label}</div>
                                    </div>
                                    {/* Failure Particles */}
                                    <AnimatePresence>
                                        {currentLoad > TRANSFORMER_MAX && (
                                            <motion.div
                                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                                className="absolute inset-0 bg-red-500/20 blur-3xl -z-10 rounded-full"
                                            />
                                        )}
                                    </AnimatePresence>
                                </motion.div>

                                {/* Flow Lines */}
                                <div className="absolute inset-0 z-0 pointer-events-none">
                                    <svg className="w-full h-full">
                                        <motion.path
                                            d="M 50% 120 L 50% 380"
                                            stroke={mode === "managed" ? "var(--color-accent)" : "rgba(255,255,255,0.1)"}
                                            strokeWidth="2"
                                            strokeDasharray="10 10"
                                            animate={{ strokeDashoffset: mode === "managed" ? -100 : 0 }}
                                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                        />
                                    </svg>
                                </div>

                                {/* EV Cluster */}
                                <div className="grid grid-cols-4 gap-4 relative z-10 w-full px-4">
                                    {[...Array(12)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{
                                                opacity: i < carCount ? 1 : 0.1,
                                                scale: i < carCount ? 1 : 0.8,
                                                y: i < carCount ? 0 : 20
                                            }}
                                            className={`p-4 rounded-2xl ${i < carCount ? (mode === 'managed' ? 'bg-accent/10 border-accent/30' : 'bg-white/10 border-white/20') : 'bg-transparent border-white/5'} border flex items-center justify-center transition-all`}
                                        >
                                            <CarFront className={`w-6 h-6 ${i < carCount ? (mode === 'managed' ? 'text-accent' : 'text-white') : 'text-white/10'}`} />
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Float Info Card */}
                                <AnimatePresence>
                                    {mode === 'managed' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                            className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-accent/90 text-background px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(0,255,163,0.5)]"
                                        >
                                            <ShieldCheck className="w-4 h-4" />
                                            ORCHESTRATION ACTIVE
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Overlays */}
                            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center text-[10px] font-black uppercase opacity-40">
                                <span>Input: 12.4 kV Line</span>
                                <span>Cluster: 480V Secondary</span>
                            </div>
                        </div>

                        {/* Live Controls */}
                        <div className="glass p-6 rounded-[2.5rem] border border-white/5 h-[120px]">
                            <div className="flex justify-between mb-4">
                                <span className="text-xs font-bold uppercase opacity-50">Local EV Penetration</span>
                                <span className="text-accent font-black">{carCount} Active Units</span>
                            </div>
                            <input
                                type="range" min="1" max="12" value={carCount}
                                onChange={(e) => setCarCount(parseInt(e.target.value))}
                                className="w-full h-2 bg-white/10 rounded-full appearance-none accent-accent cursor-pointer border border-white/5"
                            />
                        </div>
                    </div>

                    {/* Right: Analytics & ROI */}
                    <div className="lg:col-span-7 flex flex-col gap-6">

                        {/* Real-time Graph */}
                        <div className="glass p-8 rounded-[3rem] border border-white/10 flex-1 relative min-h-[400px]">
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <h4 className="text-xl font-bold">Grid Load Profile</h4>
                                    <p className="text-xs text-foreground/40 font-medium">Real-time load telemetry (kW)</p>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <div className="text-[10px] font-bold opacity-30 uppercase">Peak Load</div>
                                        <div className={`text-2xl font-black ${status.color}`}>{currentLoad.toFixed(1)} <span className="text-xs">kW</span></div>
                                    </div>
                                </div>
                            </div>

                            <div className="h-[280px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="gradientLoad" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor={mode === 'managed' ? "#00FFA3" : "#ef4444"} stopOpacity={0.4} />
                                                <stop offset="95%" stopColor={mode === 'managed' ? "#00FFA3" : "#ef4444"} stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                                        <XAxis dataKey="time" hide />
                                        <YAxis domain={[0, 180]} hide />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#020408', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', fontWeight: 'bold' }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey={mode === 'managed' ? "managedLoad" : "load"}
                                            stroke={mode === 'managed' ? "#00FFA3" : "#ef4444"}
                                            strokeWidth={4}
                                            fillOpacity={1}
                                            fill="url(#gradientLoad)"
                                            isAnimationActive={false}
                                        />
                                        <ReferenceLine y={TRANSFORMER_MAX} stroke="rgba(239, 68, 68, 0.4)" strokeDasharray="5 5" label={{ position: 'right', value: 'CAPACITY LIMIT', fill: 'rgba(239, 68, 68, 0.4)', fontSize: 10, fontWeight: 'bold' }} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-white/5">
                                <div className="space-y-1">
                                    <div className="text-[10px] font-bold opacity-30 uppercase">Thermal Load</div>
                                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            animate={{ width: `${Math.min(100, (currentLoad / TRANSFORMER_MAX) * 100)}%` }}
                                            className={`h-full ${status.color === 'text-red-500' ? 'bg-red-500' : 'bg-accent'}`}
                                        />
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-[10px] font-bold opacity-30 uppercase">Downtime Risk</div>
                                    <div className={`text-sm font-black ${currentLoad > TRANSFORMER_MAX ? 'text-red-500' : 'text-accent opacity-50'}`}>
                                        {currentLoad > TRANSFORMER_MAX ? "CRITICAL" : "MINIMAL"}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] font-bold opacity-30 uppercase">System Health</div>
                                    <div className="text-sm font-black">{Math.max(0, 100 - (currentLoad > TRANSFORMER_MAX ? (currentLoad - TRANSFORMER_MAX) * 2 : 0)).toFixed(0)}%</div>
                                </div>
                            </div>
                        </div>

                        {/* ROI Scoreboard */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="glass p-6 rounded-[2rem] border border-white/5">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 bg-accent/20 rounded-xl"><DollarSign className="w-5 h-5 text-accent" /></div>
                                    <span className="text-xs font-bold opacity-40 uppercase">Capex Saved</span>
                                </div>
                                <div className="text-3xl font-black italic">
                                    ${savings.toLocaleString()}
                                </div>
                                <div className="text-[10px] opacity-30 font-bold mt-1">Deferred Infrastructure Upgrades</div>
                            </div>

                            <div className="glass p-6 rounded-[2rem] border border-white/5">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 bg-primary/20 rounded-xl"><TrendingDown className="w-5 h-5 text-primary" /></div>
                                    <span className="text-xs font-bold opacity-40 uppercase">CO2 Avoided</span>
                                </div>
                                <div className="text-3xl font-black italic">
                                    {(savings / 200).toFixed(1)} <span className="text-sm">Tons</span>
                                </div>
                                <div className="text-[10px] opacity-30 font-bold mt-1">Peak-time Shifting Utility</div>
                            </div>

                            <div className="glass p-6 rounded-[2rem] border border-primary/10 bg-primary/5">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 bg-primary/20 rounded-xl"><ShieldCheck className="w-5 h-5 text-primary" /></div>
                                    <span className="text-xs font-bold opacity-40 uppercase">Uptime ROI</span>
                                </div>
                                <div className="text-3xl font-black italic">
                                    9x <span className="text-sm">Efficiency</span>
                                </div>
                                <div className="text-[10px] opacity-30 font-bold mt-1">Transformer Lifespan Extension</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

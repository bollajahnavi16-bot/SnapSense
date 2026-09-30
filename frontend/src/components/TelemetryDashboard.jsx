import React from 'react';
import { Gauge, Zap, Shield, Activity, ArrowDownRight, Info } from 'lucide-react';

export default function TelemetryDashboard({ telemetry }) {
  const metrics = telemetry || {
    latency_ms: 44.8,
    tokens_per_second: 68.4,
    npu_power_watts: 2.2,
    cloud_power_watts: 450.0,
    energy_saving_pct: 99.5,
    co2_saved_grams: 0.45,
    memory_footprint_mb: 412.5,
    device_name: "Qualcomm Snapdragon Hexagon NPU",
    execution_provider: "Qualcomm DirectML EP",
    benchmark_mode: "DEMO BENCHMARK / TARGET SPECIFICATIONS"
  };

  return (
    <div className="mb-6">
      
      {/* Honesty Banner Tag */}
      <div className="mb-3 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Info className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
          <span>
            <strong className="text-cyan-300 uppercase tracking-wider font-semibold">Benchmark Transparency:</strong> Metrics below reflect Qualcomm Snapdragon X Elite target specifications (2.2W NPU TDP vs 450W Cloud Server TDP).
          </span>
        </div>
        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-800 text-amber-300 font-bold border border-slate-700">
          DEMO BENCHMARK
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* 1. Inference Latency Card */}
        <div className="glass-card glass-card-hover rounded-xl p-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Sub-1s Latency</span>
            <div className="p-2 rounded-lg bg-red-500/10 text-red-400">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white font-mono">{metrics.latency_ms}</span>
            <span className="text-xs font-semibold text-red-400">ms</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2">
            <span className="text-emerald-400 font-medium flex items-center">
              <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" /> 14.2x Faster vs Cloud
            </span>
            <span className="font-mono text-slate-500">Goal &lt;1000ms</span>
          </div>
        </div>

        {/* 2. Tokens/Sec Speed Card */}
        <div className="glass-card glass-card-hover rounded-xl p-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-600/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">NPU Throughput</span>
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Gauge className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white font-mono">{metrics.tokens_per_second}</span>
            <span className="text-xs font-semibold text-cyan-400">tokens/sec</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2">
            <span className="text-slate-300 font-mono">Phi-3 / Whisper INT4</span>
            <span className="text-cyan-400 font-semibold">DirectML EP</span>
          </div>
        </div>

        {/* 3. Power Savings Card */}
        <div className="glass-card glass-card-hover rounded-xl p-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-600/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Energy Efficiency</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Zap className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-emerald-400 font-mono">{metrics.npu_power_watts}</span>
            <span className="text-xs font-semibold text-slate-400">Watts TDP</span>
            <span className="ml-auto text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
              -{metrics.energy_saving_pct}%
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2">
            <span className="text-slate-400">Cloud Server TDP: <strong className="text-slate-200">450W</strong></span>
            <span className="text-emerald-400 font-medium">99.5% Less Energy</span>
          </div>
        </div>

        {/* 4. Privacy & Hardware Shield Card */}
        <div className="glass-card glass-card-hover rounded-xl p-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-600/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">On-Device Privacy</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Shield className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-extrabold text-white">100% Offline</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2">
            <span className="text-amber-400 font-medium">0 Cloud Data Transferred</span>
            <span className="font-mono text-slate-400">{metrics.memory_footprint_mb}MB RAM</span>
          </div>
        </div>

      </div>
    </div>
  );
}

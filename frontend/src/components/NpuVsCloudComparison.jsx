import React, { useState } from 'react';
import { Cpu, Server, Zap, Check, X, Sparkles, Info } from 'lucide-react';

export default function NpuVsCloudComparison() {
  const [activeTab, setActiveTab] = useState('latency');

  return (
    <div className="glass-card rounded-xl p-5 mb-6 border-red-900/40 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 mb-4 border-b border-slate-800 gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-red-500" />
            <h3 className="text-base font-bold text-white">Snapdragon NPU vs Cloud LLM Benchmark</h3>
            <span className="text-[10px] font-mono font-bold text-amber-300 px-2 py-0.5 rounded bg-amber-950/80 border border-amber-800/60">
              ILLUSTRATIVE MATRIX
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Comparative architecture matrix evaluating on-device NPU vs cloud datacenter GPUs.
          </p>
        </div>

        <div className="flex items-center space-x-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('latency')}
            className={`px-3 py-1 rounded font-semibold transition-all ${
              activeTab === 'latency' ? 'bg-red-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Latency & Speed
          </button>
          <button
            onClick={() => setActiveTab('power')}
            className={`px-3 py-1 rounded font-semibold transition-all ${
              activeTab === 'power' ? 'bg-red-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Power & Carbon
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-3 py-1 rounded font-semibold transition-all ${
              activeTab === 'privacy' ? 'bg-red-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Privacy & Cost
          </button>
        </div>
      </div>

      {/* Side by Side Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Snapdragon NPU Card */}
        <div className="p-4 rounded-xl bg-gradient-to-b from-red-950/30 to-slate-900/80 border border-red-600/50 relative">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Cpu className="w-5 h-5 text-red-500" />
              <span className="font-bold text-sm text-white">Snapdragon Hexagon NPU</span>
            </div>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-red-600 text-white">
              WINNER
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400">Total Latency Target</span>
              <span className="font-mono font-bold text-emerald-400 text-sm">310 ms (&lt;1s Pipeline)</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400">Power Draw TDP</span>
              <span className="font-mono font-bold text-emerald-400 text-sm">2.2 W (Ultra-Low Power)</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400">Security & Privacy</span>
              <span className="font-semibold text-emerald-400 flex items-center">
                <Check className="w-3.5 h-3.5 mr-1 text-emerald-400" /> 100% On-Device Offline
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400">Cloud API Token Fees</span>
              <span className="font-mono font-bold text-emerald-400">$0.00 / Unlimited</span>
            </div>
          </div>
        </div>

        {/* Cloud LLM API Card */}
        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 relative">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Server className="w-5 h-5 text-slate-400" />
              <span className="font-bold text-sm text-slate-300">Traditional Cloud LLM (AWS/Azure)</span>
            </div>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400">
              Legacy Cloud
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60">
              <span className="text-slate-400">Total Latency</span>
              <span className="font-mono font-semibold text-rose-400 text-sm">2,850 ms (Cloud Network Bottleneck)</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60">
              <span className="text-slate-400">Power Draw TDP</span>
              <span className="font-mono font-semibold text-rose-400 text-sm">450 W (Server Cluster TDP)</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60">
              <span className="text-slate-400">Security & Privacy</span>
              <span className="font-semibold text-rose-400 flex items-center">
                <X className="w-3.5 h-3.5 mr-1 text-rose-400" /> Remote Cloud Network Socket
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60">
              <span className="text-slate-400">Cloud API Token Fees</span>
              <span className="font-mono font-semibold text-rose-400">$350.00 / 10k meetings</span>
            </div>
          </div>
        </div>

      </div>

      {/* Methodology Note */}
      <div className="mt-4 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Info className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          <span><strong>Benchmark Methodology:</strong> Compares Snapdragon X Elite Hexagon NPU 2.2W TDP target vs standard H100 datacenter GPU cluster 450W TDP server overhead.</span>
        </div>
        <span className="font-mono text-[11px] font-bold text-emerald-400">Target Benchmark</span>
      </div>
    </div>
  );
}

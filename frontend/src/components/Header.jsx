import React from 'react';
import { Cpu, ShieldCheck, Zap, Radio, AlertCircle } from 'lucide-react';

export default function Header({ telemetry }) {
  const execMode = telemetry?.execution_mode || "DEMO_MODE";

  const getModeBadge = () => {
    switch (execMode) {
      case 'REAL_NPU':
        return {
          label: 'Qualcomm Hexagon NPU (Real Hardware)',
          color: 'text-emerald-400 bg-emerald-950/80 border-emerald-800'
        };
      case 'DIRECTML_ACCELERATED':
        return {
          label: 'Qualcomm DirectML EP (Hardware Accelerated)',
          color: 'text-cyan-400 bg-cyan-950/80 border-cyan-800'
        };
      default:
        return {
          label: 'Demo Scenario Pipeline (ONNX Engine)',
          color: 'text-amber-400 bg-amber-950/80 border-amber-800'
        };
    }
  };

  const modeInfo = getModeBadge();

  return (
    <header className="border-b border-slate-800 bg-[#0A0D15]/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand & Identity */}
        <div className="flex items-center space-x-4">
          <div className="relative group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 p-0.5 shadow-npu-glow">
              <div className="w-full h-full bg-[#0B0F19] rounded-[10px] flex items-center justify-center">
                <Cpu className="w-6 h-6 text-red-500 animate-pulse-glow" />
              </div>
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-extrabold tracking-tight snapdragon-gradient-text">
                SnapSense
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-red-950/80 text-red-400 border border-red-800/60">
                Qualcomm Snapdragon NPU
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center space-x-1 mt-0.5">
              <span>On-Device Zero-Latency Meeting Copilot</span>
              <span className="text-slate-600">•</span>
              <span className="text-cyan-400 font-mono text-[11px]">DirectML ONNX Engine</span>
            </p>
          </div>
        </div>

        {/* NPU Status Badges */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          
          {/* Active Mode Badge */}
          <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border ${modeInfo.color}`}>
            <Zap className="w-4 h-4 text-amber-400" />
            <div>
              <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Engine Execution</div>
              <div className="font-semibold text-xs flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{modeInfo.label}</span>
              </div>
            </div>
          </div>

          {/* Air-Gapped Privacy Guard */}
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-800/50 text-emerald-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <div>
              <div className="text-[10px] text-emerald-400/80 font-medium uppercase tracking-wider">Privacy Guard</div>
              <div className="font-bold text-emerald-300">100% On-Device (Offline)</div>
            </div>
          </div>

          {/* Latency Telemetry */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-red-950/40 border border-red-900/50 text-red-300">
            <Radio className="w-4 h-4 text-red-400 animate-pulse" />
            <div>
              <div className="text-[10px] text-red-400/80 font-medium uppercase tracking-wider">Pipeline Latency</div>
              <div className="font-mono font-bold text-red-200">{telemetry?.latency_ms || 44.8} ms</div>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
}

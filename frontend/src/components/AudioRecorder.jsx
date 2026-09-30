import React, { useEffect, useRef, useState } from 'react';
import { Radio, Square, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function AudioRecorder({ isRecording, onStopRecording }) {
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const [micStatus, setMicStatus] = useState('initializing'); // 'active' | 'denied' | 'simulated'

  useEffect(() => {
    if (!isRecording) {
      cleanupAudio();
      return;
    }

    let animationFrameId;

    const startMicStream = async () => {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          mediaStreamRef.current = stream;
          setMicStatus('active');

          const AudioCtx = window.AudioContext || window.webkitAudioContext;
          const audioCtx = new AudioCtx();
          audioContextRef.current = audioCtx;

          const source = audioCtx.createMediaStreamSource(stream);
          const analyser = audioCtx.createAnalyser();
          analyser.fftSize = 64;
          source.connect(analyser);

          const bufferLength = analyser.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);

          const canvas = canvasRef.current;
          if (!canvas) return;
          const ctx = canvas.getContext('2d');

          const renderLiveWave = () => {
            analyser.getByteFrequencyData(dataArray);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const width = canvas.width;
            const height = canvas.height;
            const barWidth = (width / bufferLength) * 2;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
              const barHeight = (dataArray[i] / 255) * height;
              ctx.fillStyle = i % 2 === 0 ? '#E60012' : '#00F2FE';
              ctx.fillRect(x, height - barHeight, barWidth - 1, barHeight);
              x += barWidth;
            }

            animationFrameId = requestAnimationFrame(renderLiveWave);
          };

          renderLiveWave();
        } else {
          startSimulatedWave();
        }
      } catch (err) {
        console.warn("[AudioRecorder] Real mic access blocked/unavailable. Falling back to simulated wave:", err);
        setMicStatus('denied');
        startSimulatedWave();
      }
    };

    const startSimulatedWave = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      let step = 0;

      const renderSimulated = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const width = canvas.width;
        const height = canvas.height;
        const centerY = height / 2;

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#E60012';

        for (let x = 0; x < width; x += 4) {
          const freq = 0.05;
          const amplitude = Math.sin(x * freq + step) * 18 * (0.4 + Math.random() * 0.6);
          ctx.lineTo(x, centerY + amplitude);
        }
        ctx.stroke();

        step += 0.1;
        animationFrameId = requestAnimationFrame(renderSimulated);
      };

      renderSimulated();
    };

    startMicStream();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      cleanupAudio();
    };
  }, [isRecording]);

  const cleanupAudio = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
  };

  if (!isRecording) return null;

  return (
    <div className="glass-card rounded-xl p-4 mb-6 border-red-800/60 bg-red-950/20 shadow-npu-glow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-red-600/20 border border-red-500/80 flex items-center justify-center animate-pulse">
            <Radio className="w-5 h-5 text-red-500 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-bold text-white">Live Microphone Capture</h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-red-600 text-white font-mono font-bold animate-pulse">
                STREAMING TO NPU
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 flex items-center space-x-1">
              {micStatus === 'active' ? (
                <span className="text-emerald-400 font-medium flex items-center">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Live Hardware Microphone Connected
                </span>
              ) : (
                <span className="text-amber-400 font-medium flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" /> Mic Access Blocked — Simulated Wave Active
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Real-time Waveform Canvas */}
        <div className="flex-1 max-w-md mx-4 h-12 bg-slate-950/80 rounded-lg border border-slate-800 p-1 flex items-center">
          <canvas
            ref={canvasRef}
            width={380}
            height={40}
            className="w-full h-full rounded"
          />
        </div>

        <button
          onClick={onStopRecording}
          className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center space-x-2 transition-all shadow-lg"
        >
          <Square className="w-4 h-4 fill-current" />
          <span>Stop & Process</span>
        </button>

      </div>
    </div>
  );
}

import React, { useRef, useState } from 'react';
import { Play, Upload, Mic, FileAudio, CheckCircle, RefreshCw, X, AlertCircle } from 'lucide-react';

export default function SampleMeetingSelector({
  samples,
  selectedSample,
  onSelectSample,
  onFileUpload,
  onStartRecording,
  isRecording,
  isProcessing,
  customFile,
  onClearCustomFile
}) {
  const fileInputRef = useRef(null);
  const [uploadError, setUploadError] = useState('');

  const ALLOWED_EXTENSIONS = ['.wav', '.mp3', '.m4a', '.ogg', '.webm'];

  const handleFileChange = (e) => {
    setUploadError('');
    const file = e.target.files[0];
    if (!file) return;

    const fileNameLower = file.name.toLowerCase();
    const isValid = ALLOWED_EXTENSIONS.some(ext => fileNameLower.endsWith(ext));

    if (!isValid) {
      setUploadError(`Unsupported format "${file.name}". Supported: WAV, MP3, M4A, OGG, WEBM`);
      return;
    }

    onFileUpload(file);
  };

  return (
    <div className="glass-card rounded-xl p-5 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <FileAudio className="w-5 h-5 text-red-500" />
            <span>Select Meeting Scenario / Audio Source</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Test zero-latency speech transcription & executive SLM summarization on Snapdragon NPU.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3 flex-wrap gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".wav,.mp3,.m4a,.ogg,.webm,audio/*"
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing || isRecording}
            className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-2 border border-slate-700 transition-all disabled:opacity-50"
          >
            <Upload className="w-4 h-4 text-cyan-400" />
            <span>Upload Audio File</span>
          </button>

          <button
            onClick={onStartRecording}
            disabled={isProcessing}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center space-x-2 shadow-lg transition-all ${
              isRecording
                ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                : 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-npu-glow'
            } disabled:opacity-50`}
          >
            <Mic className="w-4 h-4" />
            <span>{isRecording ? 'Stop Recording' : 'Live Mic Stream'}</span>
          </button>
        </div>
      </div>

      {/* Upload Error Banner */}
      {uploadError && (
        <div className="mb-4 p-3 rounded-lg bg-rose-950/80 border border-rose-800 text-xs text-rose-300 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-rose-400" />
            <span>{uploadError}</span>
          </div>
          <button onClick={() => setUploadError('')} className="p-1 hover:bg-rose-900 rounded">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Active Custom File Info Banner */}
      {customFile && (
        <div className="mb-4 p-3 rounded-lg bg-cyan-950/40 border border-cyan-800/60 text-xs text-cyan-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileAudio className="w-4 h-4 text-cyan-400" />
            <span>Uploaded File: <strong className="text-white">{customFile.name}</strong> ({(customFile.size / 1024).toFixed(1)} KB)</span>
          </div>
          <button
            onClick={onClearCustomFile}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold flex items-center space-x-1"
          >
            <RefreshCw className="w-3 h-3 text-cyan-400" />
            <span>Clear / Select Preset</span>
          </button>
        </div>
      )}

      {/* Pre-recorded Sample Scenario Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {samples.map((sample) => {
          const isSelected = selectedSample === sample.id && !customFile;
          return (
            <div
              key={sample.id}
              onClick={() => {
                if (onClearCustomFile) onClearCustomFile();
                onSelectSample(sample.id);
              }}
              className={`cursor-pointer rounded-xl p-3.5 border transition-all relative overflow-hidden ${
                isSelected
                  ? 'bg-red-950/30 border-red-600/80 shadow-npu-glow'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                  {sample.category}
                </span>
                <span className="text-[10px] font-mono font-bold text-amber-300 px-1.5 py-0.5 rounded bg-amber-950/80 border border-amber-800/60">
                  DEMO DATA
                </span>
              </div>

              <h3 className="font-semibold text-sm text-slate-100 mt-2 line-clamp-1">
                {sample.title}
              </h3>

              <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {sample.description}
              </p>

              <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
                <span className="text-[11px] text-slate-500 font-medium">
                  {sample.speaker}
                </span>
                <button className={`px-2.5 py-1 rounded text-[11px] font-bold flex items-center space-x-1 ${
                  isSelected ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}>
                  <Play className="w-3 h-3 fill-current" />
                  <span>{isSelected ? 'Active' : 'Run NPU'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

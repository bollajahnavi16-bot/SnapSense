# SnapSense Quickstart & Setup Instructions

Follow these quick steps to run **SnapSense** on Windows / Qualcomm Snapdragon platforms.

---

## Prerequisites

- **Python**: Version 3.10+ or 3.11+
- **Node.js**: Version 18+ (Optional if using pre-built static bundle)
- **OS**: Windows 11 (Supports DirectML NPU acceleration on Snapdragon X Elite and Snapdragon compute platforms)

---

## Quickstart (One-Command Setup)

### Option 1: Run with Python Backend (Recommended for Judges)

1. **Install Python Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Verify ONNX DirectML Model Pipeline:**
   ```bash
   python models/model_downloader.py
   ```

3. **Launch SnapSense:**
   ```bash
   python app.py
   ```

4. **Open in Browser:**
   Navigate to [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## Option 2: Live Frontend Development Mode

If you want to edit the React frontend UI live with hot-reloading:

1. **Terminal 1 (Start FastAPI Backend):**
   ```bash
   python app.py
   ```

2. **Terminal 2 (Start React Vite Dev Server):**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Open Vite UI:**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## Automated Windows Launcher Script (`run.bat`)

You can also double-click or run `run.bat` to launch the complete system automatically:

```bat
@echo off
echo Starting SnapSense: Qualcomm Snapdragon NPU Meeting Copilot...
pip install -r requirements.txt
python app.py
```

---

## Key Verification Endpoints for Evaluation

- **Health & NPU Provider Check**: `http://127.0.0.1:8000/api/health`
- **Real-time Hardware Telemetry**: `http://127.0.0.1:8000/api/telemetry`
- **Side-by-side Benchmark Data**: `http://127.0.0.1:8000/api/benchmark`
- **Interactive API Documentation (Swagger)**: `http://127.0.0.1:8000/docs`

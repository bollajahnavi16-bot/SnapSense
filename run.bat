@echo off
title SnapSense - Qualcomm Snapdragon NPU Meeting Copilot
echo =======================================================================
echo     SnapSense: On-Device Zero-Latency Meeting Copilot
echo     Qualcomm Snapdragon AI Lab Challenge Prototype
echo =======================================================================
echo.
echo [1/2] Verifying Python Dependencies...
pip install -r requirements.txt

echo.
echo [2/2] Scanning for open port & launching SnapSense Application...
python run.py
pause

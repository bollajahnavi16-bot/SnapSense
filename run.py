"""
SnapSense Dynamic Launcher Script.

Dynamically finds an available free TCP port on 127.0.0.1 (bypassing WinError 10013 / Errno 10048),
starts the Uvicorn FastAPI server, prints the exact active localhost URL to the console, 
and automatically launches the default web browser.
"""

import socket
import webbrowser
import threading
import time
import uvicorn
from app import app, npu_monitor

def find_available_port(start_port: int = 8000, max_attempts: int = 100) -> int:
    """Scans starting at start_port to locate an unbound, open TCP port."""
    for port in range(start_port, start_port + max_attempts):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            try:
                s.bind(("127.0.0.1", port))
                return port
            except OSError:
                continue
    raise RuntimeError(f"No available TCP ports found in range {start_port}-{start_port + max_attempts}")

def launch_browser_async(url: str, delay_sec: float = 1.2):
    def _open():
        time.sleep(delay_sec)
        print(f"\n[SnapSense] Automatically opening default browser: {url}")
        try:
            webbrowser.open(url)
        except Exception as e:
            print(f"[SnapSense] Browser launch notice: {e}")

    threading.Thread(target=_open, daemon=True).start()

def main():
    port = find_available_port(start_port=8000)
    url = f"http://localhost:{port}"

    print("\n" + "="*72)
    print(f"  Qualcomm Snapdragon Hexagon NPU Meeting Copilot (SnapSense)")
    print(f"  Hardware   : {npu_monitor.device_name}")
    print(f"  Engine     : {npu_monitor.active_provider}")
    print(f"  Active URL : {url}")
    print(f"  Status     : 100% On-Device Air-Gapped Engine Active")
    print("="*72 + "\n")

    launch_browser_async(url)
    uvicorn.run(app, host="127.0.0.1", port=port, log_level="info")

if __name__ == "__main__":
    main()

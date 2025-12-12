from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import fastf1
from fastf1 import get_session
import pandas as pd
import numpy as np
# ✅ CORRECT (Relative import)
from ai.summarize import explain_driver_style
import os

# 1. Setup Cache
if not os.path.exists('cache'):
    os.makedirs('cache')
fastf1.Cache.enable_cache('cache')

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "F1 Intelligence API is running."}

@app.get("/analyze")
def analyze_driver(year: int, gp: str, session: str, driver1: str, driver2: str):
    try:
        # Load Session
        f1_session = get_session(year, gp, session)
        f1_session.load()

        # Pick Drivers
        d1_laps = f1_session.laps.pick_drivers(driver1)
        d2_laps = f1_session.laps.pick_drivers(driver2)
        
        if len(d1_laps) == 0: return {"error": f"Driver {driver1} not found."}
        if len(d2_laps) == 0: return {"error": f"Driver {driver2} not found."}

        lap1 = d1_laps.pick_fastest()
        lap2 = d2_laps.pick_fastest()

        if lap1 is None or lap2 is None:
            return {"error": "One or both drivers did not set a valid lap time."}

        # Get Telemetry
        data1 = lap1.get_car_data().add_distance()
        data2 = lap2.get_car_data().add_distance()

        # --- DATA PROCESSING FOR CHARTS (Interpolation) ---
        max_dist = min(data1['Distance'].max(), data2['Distance'].max())
        common_dist = np.linspace(0, max_dist, 500)

        speed1 = np.interp(common_dist, data1['Distance'], data1['Speed'])
        speed2 = np.interp(common_dist, data2['Distance'], data2['Speed'])
        throttle1 = np.interp(common_dist, data1['Distance'], data1['Throttle'])
        throttle2 = np.interp(common_dist, data2['Distance'], data2['Throttle'])

        chart_data = []
        for i in range(len(common_dist)):
            chart_data.append({
                "dist": round(common_dist[i], 1),
                "speed_d1": round(speed1[i], 1),
                "speed_d2": round(speed2[i], 1),
                "throttle_d1": round(throttle1[i], 1),
                "throttle_d2": round(throttle2[i], 1)
            })

        # --- AI ANALYSIS PREPARATION ---
        data1['Driver'] = driver1
        data2['Driver'] = driver2
        combined = pd.concat([data1, data2])
        
        # Calculate statistics (Mean, Max, Min) for Speed, Throttle, etc.
        comparison = combined.groupby('Driver')[['Speed', 'Throttle', 'Brake', 'RPM', 'nGear']].describe()

        # Generate Text
        ai_summary = explain_driver_style(driver1, driver2, comparison)
        
        return {
            "drivers": [driver1, driver2],
            "grand_prix": gp,
            "ai_analysis": ai_summary,
            "telemetry": chart_data 
        }

    except Exception as e:
        print(f"Error: {e}")
        return {"error": str(e)}
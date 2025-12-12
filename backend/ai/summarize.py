import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

# Configure Gemini
api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    raise ValueError("GOOGLE_API_KEY not found in .env file")

genai.configure(api_key=api_key)

def explain_driver_style(driver1, driver2, comparison_df):
    # FIXED: Use .to_string() directly, because comparison_df is ALREADY the description
    summary = comparison_df.to_string()

    prompt = f"""
    Compare {driver1} and {driver2} based on this F1 telemetry data summary:
    {summary}

    Metrics provided: Speed, Throttle, Brake, RPM, and Gear.
    
    Provide a short, intense performance analysis comparing their:
    1. Braking style
    2. Cornering aggression
    3. Throttle application
    
    Keep it technical but readable for a race engineer. Max 150 words.
    """

    try:
        model = genai.GenerativeModel("gemini-2.0-flash")
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"AI Analysis Failed: {str(e)}"
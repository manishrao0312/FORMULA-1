import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load env variables from backend/.env
load_dotenv("backend/.env")

api_key = os.getenv("GOOGLE_API_KEY")

if not api_key:
    print("Error: Could not find GOOGLE_API_KEY in backend/.env")
else:
    genai.configure(api_key=api_key)
    print(f"Checking models for key ending in ...{api_key[-5:]}")
    
    try:
        print("\n--- AVAILABLE MODELS ---")
        for m in genai.list_models():
            if 'generateContent' in m.supported_generation_methods:
                print(m.name)
        print("------------------------\n")
    except Exception as e:
        print(f"Error: {e}")
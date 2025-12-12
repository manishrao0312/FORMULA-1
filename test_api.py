import google.generativeai as genai
import os

# Option 1: Set key directly (for testing only)
# genai.configure(api_key="YOUR_ACTUAL_API_KEY")

# Option 2: Get from environment variable (Best Practice)
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    print("Error: API Key not found. Please set GEMINI_API_KEY environment variable.")
else:
    try:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-1.5-flash')
        
        # Simple prompt to test connection
        response = model.generate_content("Explain Formula 1 in one sentence.")
        print("Success! API Response:")
        print(response.text)
        
    except Exception as e:
        print(f"An error occurred: {e}")
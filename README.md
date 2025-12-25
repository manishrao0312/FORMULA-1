F1 Intelligence: AI-Driven Race Telemetry & Strategy Engine
F1 Intelligence is a full-stack engineering platform that transforms high-frequency, noisy Formula 1 telemetry into actionable race strategy insights using Generative AI.

Unlike standard data dashboards, this system orchestrates the full lifecycle of data: from raw signal processing and statistical normalization to LLM-driven reasoning and 3D spatial visualization.

🚀 Core Engineering Architecture
The system is built on a three-tier architecture designed for high-throughput data processing and intelligent inference.

1. The Data & Signal Pipeline (Python, FastF1, Pandas)
Ingestion: Processes gigabytes of raw race data including speed, throttle, brake, and gear traces.

Normalization: Performs real-time interpolation to align asynchronous data streams for millisecond-perfect driver comparisons.

Feature Engineering: Calculates advanced metrics such as braking gradients, corner entry/exit speeds, and tire degradation curves.

2. The AI Reasoning Engine (FastAPI, Google Gemini)
RAG-Style Workflow: Instead of passing raw numbers, the engine feeds structured statistical descriptors into the LLM.

Contextual Inference: The model acts as a virtual Race Engineer, generating narrative insights regarding driver aggression, overtaking probability, and pit-stop windows.

Grounded Metrics: Ensures AI outputs are tied strictly to classical telemetry signals to prevent hallucination.

3. High-Performance Frontend (React, Three.js, Recharts)
3D Spatial Mapping: Uses Three.js to map 1D telemetry data onto a 3D virtual track model for spatial context.

Interactive Scrubbing: Leverages Recharts for synchronized data scrubbing, allowing users to analyze specific corners or laps with instant UI feedback.

🛠 Tech Stack
Layer	Technologies
Backend	Python, FastAPI, FastF1, Pandas, NumPy
AI/ML	Google Gemini API (LLM), Prompt Engineering
Frontend	React.js, Three.js (3D Graphics), Recharts, Tailwind CSS
DevOps	Git, Vercel/Render (Deployment)

Export to Sheets

📊 Key Features
Side-by-Side Driver Analysis: Compare any two drivers on the grid for any session.

AI Strategy Reports: Automated summaries of why a driver won or lost time in specific sectors.

Live Telemetry Emulation: Visualizing the data flow as it would happen on a race weekend.

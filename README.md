# 🏎️ F1 Telemetry & Strategy AI Dashboard

An AI-powered Formula 1 telemetry analysis platform that transforms raw race telemetry into actionable performance and strategy insights. The system combines telemetry processing, machine learning, and generative AI to analyze driver behavior and race performance through an interactive dashboard.

---
<img width="1914" height="1199" alt="image" src="https://github.com/user-attachments/assets/4c2be7bb-b4f9-45d3-a23f-a525a684fa17" />

## 📌 Problem Statement

Formula 1 telemetry generates thousands of data points every lap, including speed, throttle position, braking force, gear changes, and sector timings. Extracting meaningful insights from this data manually is complex and time-consuming.

This project automates telemetry analysis by:

* Processing raw telemetry data from Formula 1 sessions
* Engineering performance-related features
* Identifying driving behavior patterns using K-Means clustering
* Generating AI-powered strategy insights using Gemini API
* Visualizing telemetry and driver comparisons through an interactive dashboard

---

## 🚀 Features

* Formula 1 telemetry ingestion using FastF1
* Telemetry preprocessing and normalization
* Feature engineering from race data
* Driver behavior clustering using K-Means
* AI-generated race engineer reports using Gemini
* Driver-to-driver telemetry comparison
* Interactive data visualization dashboard
* FastAPI backend with React frontend

---

## 🏗️ System Architecture

```text
FastF1 Telemetry Data
          │
          ▼
Data Cleaning & Processing
          │
          ▼
Feature Engineering
          │
          ▼
Feature Standardization
          │
          ▼
K-Means Clustering
          │
          ▼
Gemini AI Analysis
          │
          ▼
React Dashboard
```

---

## 🤖 Machine Learning Pipeline

### Feature Engineering

Telemetry-derived features include:

* Average Speed
* Maximum Speed
* Throttle Usage
* Brake Intensity
* Gear Change Frequency
* Sector Performance Metrics
* Corner Entry Speed
* Corner Exit Speed

### Data Preprocessing

All numerical features are standardized before clustering using Scikit-Learn's StandardScaler.

### K-Means Clustering

Driver telemetry patterns are grouped using K-Means clustering.

```python
from sklearn.cluster import KMeans

kmeans = KMeans(
    n_clusters=3,
    random_state=42
)
```

Example cluster interpretations:

| Cluster | Driving Style |
| ------- | ------------- |
| 0       | Aggressive    |
| 1       | Balanced      |
| 2       | Conservative  |

---

## 📊 Model Evaluation

Since K-Means is an unsupervised learning algorithm, traditional accuracy metrics are not applicable.

Cluster quality is evaluated using the Silhouette Score.

```python
from sklearn.metrics import silhouette_score
```

Example:

```text
Silhouette Score: X.XX
```

Replace with the actual score obtained from your model.

---

## 🧠 AI Strategy Engine

The processed telemetry statistics are supplied to the Gemini API, which generates race-engineer-style performance reports.

Example insights include:

* Braking behavior analysis
* Cornering efficiency evaluation
* Sector-wise performance comparison
* Tire management observations
* Potential overtaking opportunities

---

## 🛠️ Tech Stack

| Layer            | Technology         |
| ---------------- | ------------------ |
| Frontend         | React, TypeScript  |
| Visualization    | Recharts, Three.js |
| Backend          | FastAPI            |
| Data Processing  | Pandas, NumPy      |
| Machine Learning | Scikit-Learn       |
| AI               | Gemini API         |
| Deployment       | Vercel, Render     |

---

## 📂 Project Structure

```text
FORMULA-1/
│
├── backend/
│   ├── api/
│   ├── services/
│   ├── models/
│   └── telemetry/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── charts/
│
├── cache/
│
├── README.md
│
└── vercel.json
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/manishrao0312/FORMULA-1.git
cd FORMULA-1
```

### Backend Setup

```bash
cd backend

pip install -r requirements.txt

uvicorn main:app --reload
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## 🔮 Future Enhancements

* Real-time telemetry streaming
* Tire degradation forecasting
* Pit-stop strategy prediction
* Driver performance prediction models
* Advanced clustering and classification techniques

---

## 📜 License

This project is intended for educational and portfolio purposes.

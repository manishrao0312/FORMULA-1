// src/Guide.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Database, Zap, BarChart2 } from 'lucide-react';
import './App.css'; // Ensure styles are loaded

const Guide = () => {
  return (
    <div className="guide-page-container">
      <motion.div 
        initial={{opacity:0, y:20}} 
        animate={{opacity:1, y:0}} 
        transition={{duration: 0.8}}
        className="guide-content"
      >
        <h1 className="main-headline">SYSTEM MANUAL</h1>
        <p className="sub-headline">Mastering the F1 Intelligence Telemetry Engine.</p>

        <div className="step-list">
          
          <div className="step-item">
            <div className="icon-box"><Database color="#ff3b1f" /></div>
            <div>
              <h3>1. Select Session Data</h3>
              <p>Enter the <strong>Year</strong> (e.g. 2023), <strong>Grand Prix</strong> (e.g. Bahrain), and <strong>Session</strong> (Q for Qualifying, R for Race).</p>
            </div>
          </div>

          <div className="step-item">
            <div className="icon-box"><Zap color="#ff3b1f" /></div>
            <div>
              <h3>2. Choose Rivals</h3>
              <p>Input the <strong>3-letter code</strong> for two drivers you want to compare (e.g., <code>VER</code> vs <code>HAM</code>).</p>
            </div>
          </div>

          <div className="step-item">
            <div className="icon-box"><BarChart2 color="#ff3b1f" /></div>
            <div>
              <h3>3. Analyze Telemetry</h3>
              <p>Our AI downloads the data from the F1 archive. Use the <strong>Speed Trace</strong> graph to see who brakes later and carries more speed.</p>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default Guide;
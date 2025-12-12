import { useState, Suspense, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, X } from 'lucide-react';
import axios from 'axios';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Experience from './Scene'; // Assuming your 3D file is Scene.jsx or Experience.jsx
import Grid from './Grid'; 
import Guide from './Guide'; 
import './App.css';

const Home = () => {
  const [formData, setFormData] = useState({ year: '2023', gp: 'Bahrain', session: 'Q', driver1: 'VER', driver2: 'LEC' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Ref to the results section for auto-scrolling
  const resultsRef = useRef(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAnalyze = async () => {
    setLoading(true); setError(''); setResult(null);
    try {
      // Replace with your actual backend URL if different
      const res = await axios.get('https://formula-1-9rnl.onrender.com/analyze', { params: formData });
      if (res.data.error) setError(res.data.error);
      else setResult(res.data);
    } catch (err) { setError('Backend Offline'); } 
    finally { setLoading(false); }
  };

  // Auto-scroll effect: When 'result' appears, scroll to it
  useEffect(() => {
    if (result && resultsRef.current) {
        // Small delay to ensure the DOM element is rendered
        setTimeout(() => {
            resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
  }, [result]);

  // Handle closing: clear result and scroll back to top
  const handleClose = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Wait for scroll to finish a bit before removing the element to avoid jumpiness
    setTimeout(() => setResult(null), 500); 
  };

  return (
    <>
      {/* SECTION 1: HERO (Inputs + Car) - Fits 100vh */}
      <div className="hero-section">
        <div className="content-grid">
          {/* LEFT: INPUTS */}
          <div className="text-content">
            <motion.div initial={{opacity:0, x:-50}} animate={{opacity:1, x:0}} transition={{duration:0.8}}>
              <h1 className="main-headline">Race.<br/>Analyze.<br/>Win.</h1>
              <p className="sub-headline">Advanced AI telemetry analysis for Formula 1 strategy.</p>

              <div className="glass-form">
                <div className="form-grid">
                  <div className="input-wrapper"><label>Season</label><input name="year" className="custom-input" value={formData.year} onChange={handleChange} /></div>
                  <div className="input-wrapper"><label>Grand Prix</label><input name="gp" className="custom-input" value={formData.gp} onChange={handleChange} /></div>
                </div>
                <div className="form-grid">
                  <div className="input-wrapper"><label>Driver A</label><input name="driver1" className="custom-input" value={formData.driver1} onChange={handleChange} /></div>
                  <div className="input-wrapper"><label>Driver B</label><input name="driver2" className="custom-input" value={formData.driver2} onChange={handleChange} /></div>
                </div>
                <button className="action-btn" onClick={handleAnalyze} disabled={loading}>
                    {loading ? 'Calculating...' : 'Initialize Analysis'}
                </button>
                {error && <div style={{color:'#ff3b1f', fontSize:'0.8rem', marginTop:'10px'}}>⚠️ {error}</div>}
              </div>
            </motion.div>
          </div>

          {/* RIGHT: 3D CAR */}
          <div className="scene-container">
            <Canvas camera={{ position: [3, 1.5, 5], fov: 40 }}>
               <Suspense fallback={null}>
                  <Experience />
               </Suspense>
            </Canvas>
          </div>
        </div>
      </div>

      {/* SECTION 2: RESULTS (Appears below the fold) */}
      <AnimatePresence>
        {result && (
          <motion.div 
            ref={resultsRef} // Attach Ref here
            className="results-section"
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
          >
            <div className="hud-panel">
               {/* CLOSE BUTTON */}
               <button onClick={handleClose} className="close-btn"><X size={18} /></button>

               {/* LEFT: GRAPH */}
               <div className="hud-graph-section">
                  <div className="hud-header">
                     <div className="hud-title"><div className="live-dot"></div> LIVE TELEMETRY</div>
                     <div style={{fontSize:'0.7rem', color:'#666', fontFamily:'Orbitron'}}>SECTOR 1 VS SECTOR 2</div>
                  </div>
                  
                  <div style={{flex: 1, width: '100%', minHeight: 0}}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={result.telemetry}>
                        <defs>
                          <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ff3b1f" stopOpacity={0.5}/><stop offset="95%" stopColor="#ff3b1f" stopOpacity={0}/></linearGradient>
                          <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#fff" stopOpacity={0.1}/><stop offset="95%" stopColor="#fff" stopOpacity={0}/></linearGradient>
                        </defs>
                        <XAxis dataKey="dist" hide />
                        <Tooltip content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="race-tooltip">
                                <div className="tt-label">SPEED DELTA</div>
                                <div className="tt-val" style={{color:'#ff3b1f'}}>{payload[0].value} <span style={{fontSize:'0.6rem'}}>KM/H</span></div>
                                <div className="tt-val" style={{color:'#888', fontSize:'0.9rem'}}>{payload[1].value} <span style={{fontSize:'0.6rem'}}>KM/H</span></div>
                              </div>
                            );
                          }
                          return null;
                        }} />
                        <Area type="monotone" dataKey="speed_d2" stroke="#666" fill="url(#grad2)" strokeWidth={2} />
                        <Area type="monotone" dataKey="speed_d1" stroke="#ff3b1f" fill="url(#grad1)" strokeWidth={3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
               </div>

               {/* RIGHT: TEXT ANALYSIS */}
               <div className="hud-text-section">
                  <div className="ai-label">// STRATEGY_ENGINEER_AI_LOGS</div>
                  <div className="ai-output">
                    {result.ai_analysis}
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- MAIN APP SHELL ---
const Navbar = () => {
  const loc = useLocation();
  return (
    <nav className="navbar">
      <div className="brand"><Zap fill="#ff3b1f" stroke="none" size={20} /> F1.INTEL</div>
      <div className="nav-links">
        <Link to="/" className={`nav-item ${loc.pathname === '/' ? 'active' : ''}`}>TELEMETRY</Link>
        <Link to="/grid" className={`nav-item ${loc.pathname === '/grid' ? 'active' : ''}`}>THE GRID</Link>
        <Link to="/guide" className={`nav-item ${loc.pathname === '/guide' ? 'active' : ''}`}>GUIDE</Link>
      </div>
    </nav>
  );
};

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/grid" element={<Grid />} />
          <Route path="/guide" element={<Guide />} />
        </Routes>
      </div>
    </Router>
  );
}
// src/Grid.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import { teams, nextRace } from './f1data'; // Import your data
import './App.css'; // We will add styles here

const Grid = () => {
  // Format the date
  const raceDate = new Date(nextRace.date).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  });

  return (
    <div className="grid-page-container">
      
      {/* HEADER SECTION */}
      <motion.div 
        className="grid-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="main-headline" style={{fontSize: '3rem'}}>THE 2025 GRID</h1>
        
        {/* NEXT RACE BANNER */}
        <div className="next-race-banner">
          <div className="race-info">
            <span className="race-label">NEXT ROUND</span>
            <div className="race-name">{nextRace.flag} {nextRace.name}</div>
          </div>
          <div className="race-details">
             <div className="detail-item"><Calendar size={16} /> {raceDate}</div>
             <div className="detail-item"><MapPin size={16} /> {nextRace.track}</div>
          </div>
        </div>
      </motion.div>

      {/* TEAMS GRID */}
      <div className="teams-grid">
        {teams.map((team, index) => (
          <motion.div 
            key={team.id}
            className="team-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            style={{ borderTop: `4px solid ${team.color}` }}
          >
            {/* Team Header */}
            <div className="team-header">
              <div className="team-logo-wrapper">
                <img src={team.logo} alt={team.name} className="team-logo" />
              </div>
              <h2 className="team-name">{team.name}</h2>
            </div>

            {/* Drivers */}
            <div className="drivers-container">
              {team.drivers.map((driver) => (
                <div key={driver.name} className="driver-profile">
                  <div className="driver-img-box">
                    <img 
                      src={driver.image} 
                      alt={driver.name} 
                      className="driver-img"
                      onError={(e) => {e.target.src='https://placehold.co/100x100?text=No+Img'}} 
                    />
                  </div>
                  <div className="driver-info">
                    <span className="driver-number" style={{color: team.color}}>{driver.number}</span>
                    <span className="driver-name">{driver.name.split(' ')[1].toUpperCase()}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
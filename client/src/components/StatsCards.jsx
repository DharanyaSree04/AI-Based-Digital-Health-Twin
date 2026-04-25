import React from 'react';
import { Award } from 'lucide-react';

const StatsCards = ({ score, xp = 0, weight, height }) => {
    // Level Logic: 100 XP per level
    const level = Math.floor(xp / 100) + 1;
    
    // BMI Calculation
    const bmi = (weight && height) ? (weight / ((height/100)**2)).toFixed(1) : "0.0";

    // --- BADGE LOGIC ---
    const getBadge = () => {
        if (level >= 20) return { name: "GOLD", color: "#ffd700", glow: "rgba(255, 215, 0, 0.5)" };
        if (level >= 10) return { name: "SILVER", color: "#c0c0c0", glow: "rgba(192, 192, 192, 0.5)" };
        return { name: "BRONZE", color: "#cd7f32", glow: "rgba(205, 127, 50, 0.5)" };
    };

    const badge = getBadge();

    return (
        <div className="stats-grid">
            {/* BMI Widget */}
            <div className="widget">
                <span className="widget-label">BMI INDEX</span>
                <div className="score-text" style={{ fontSize: '2.5rem', color: 'white' }}>{bmi}</div>
                <p style={{ fontSize: '0.7rem', opacity: 0.6 }}>Physical Body Mass</p>
            </div>

            {/* Twin Evolution Widget with Dynamic Badge */}
            <div className="widget badge-widget" style={{ 
                borderBottom: `4px solid ${badge.color}`,
                boxShadow: `0 10px 20px -10px ${badge.glow}` 
            }}>
                <span className="widget-label">TWIN EVOLUTION</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '10px' }}>
                    <div className="badge-icon-container">
                        <Award size={40} color={badge.color} fill={badge.color} />
                    </div>
                    <div>
                        <div style={{ fontSize: '1.8rem', fontWeight: '900', color: 'white' }}>LVL {level}</div>
                        <div style={{ 
                            fontSize: '0.7rem', 
                            fontWeight: 'bold', 
                            color: badge.color, 
                            letterSpacing: '2px' 
                        }}>
                            {badge.name} RANK
                        </div>
                    </div>
                </div>
            </div>

            {/* Wellness Score Widget */}
            <div className="widget">
                <span className="widget-label">WELLNESS INDEX</span>
                <div className="score-text" style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>{score}%</div>
                <p style={{ fontSize: '0.7rem', opacity: 0.6 }}>Overall Health Grade</p>
            </div>
        </div>
    );
};

export default StatsCards;
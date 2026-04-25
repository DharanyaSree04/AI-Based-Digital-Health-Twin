import React from 'react';
import StatsCards from "./StatsCards";
import WellnessChart from "./WellnessCharts";
import AIInsights from './AIInsights';

/**
 * Dashboard Component
 * Purpose: Acts as the main visual hub of the application.
 * Reorders components so the Graph is above the AI Insights report.
 */
const Dashboard = ({ logs, xp, weight, height }) => {
    
    // 1. Identify the most recent data entry
    // This is used for the StatsCards and the AI Insight engine.
    const latestLog = logs[logs.length - 1] || null;

    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '20px', 
            width: '100%',
            animation: 'fadeIn 0.5s ease-in' 
        }}>
            
            {/* --- SECTION 1: NUMERIC STATS CARDS --- 
                Displays: BMI Status, Twin Evolution (XP), and Wellness Index %
            */}
          <StatsCards 
    score={latestLog?.wellnessScore || 0} 
    xp={xp}  // This 'xp' comes from the User object in App.jsx
    weight={weight} 
    height={height} 
/>

            {/* --- SECTION 2: WELLNESS PROGRESS SIMULATION --- 
                Displays: The AreaChart trend line.
                This provides a visual "Stimulation" of how habits are trending.
            */}
            <div className="widget" style={{ flex: 1, minHeight: '380px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ 
                        marginTop: 0, 
                        fontSize: '0.9rem', 
                        color: 'var(--primary)', 
                        letterSpacing: '1px',
                        textTransform: 'uppercase'
                    }}>
                        Wellness Progress Simulation (AI Trend Analysis)
                    </h3>
                    <div style={{ fontSize: '0.7rem', opacity: 0.5 }}>LIVE DATA FEED</div>
                </div>

                <WellnessChart data={logs} />
            </div>

            {/* --- SECTION 3: HEALTH TWIN REPORT (AI INSIGHTS) --- 
                Displays: Simple, easy-to-understand health advice and future risk warnings.
                We only show this section if at least one log exists.
            */}
            {latestLog ? (
                <AIInsights latestLog={latestLog} />
            ) : (
                <div className="widget" style={{ 
                    textAlign: 'center', 
                    padding: '40px', 
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px dashed rgba(255,255,255,0.1)'
                }}>
                    <p style={{ opacity: 0.5, margin: 0 }}>
                        Waiting for health data... Please sync your first log in the sidebar to generate AI Insights.
                    </p>
                </div>
            )}

        </div>
    );
};

export default Dashboard;
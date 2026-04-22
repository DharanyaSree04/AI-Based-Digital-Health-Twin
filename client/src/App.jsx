import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import Admin from './components/Admin';
import AIChatBot from './components/AIChatBot';
import './App.css';

const App = () => {
    // 1. STATE MANAGEMENT
    const [user, setUser] = useState(null); // Stores logged-in user (id, name, role, xp)
    const [view, setView] = useState('dashboard'); // Toggle between 'dashboard' and 'admin'
    const [isChatOpen, setIsChatOpen] = useState(false); // Controls AI Chatbot visibility
    const [logs, setLogs] = useState([]); // Stores health history for charts and AI insights
    
    // Initial Health Form State (Includes BMI inputs: weight/height)
    const [form, setForm] = useState({
        sleep: 7, 
        exercise: 30, 
        dietQuality: 8, 
        stress: 3,
        screenTime: 5, 
        weight: 70, 
        height: 175
    });

    // 2. DATA FETCHING LOGIC
    // Fetches the last 10 logs for the logged-in user
    const refreshData = async () => {
        if (!user) return;
        try {
            const res = await axios.get(`http://localhost:5000/api/logs/${user.id}`);
            // We reverse the data so the chart draws from left (old) to right (new)
            setLogs(res.data.reverse());
        } catch (err) {
            console.error("Error fetching health logs:", err);
        }
    };

    // Auto-refresh when a user logs in
    useEffect(() => {
        if (user) refreshData();
    }, [user]);

    // 3. HEALTH SYNC LOGIC
    // Sends sidebar data to backend for AI score calculation
    const handleSync = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/logs', {
                ...form,
                userId: user.id // Pass the real MongoDB ID
            });
            refreshData(); // Refresh chart and AI insights
            alert("Digital Twin Synchronized Successfully!");
        } catch (err) {
            console.error("Sync error:", err);
            alert("Sync Failed. Please check if the server is running.");
        }
    };

    // 4. CONDITIONAL RENDERING (AUTH)
    if (!user) return <Auth onAuth={setUser} />;

    // 5. MAIN APPLICATION LAYOUT
    return (
        <div className="app-container">
            
            {/* ADMIN TOGGLE BUTTON 
                Only visible if the logged-in user's role is 'admin'
            */}
            {user.role === 'admin' && (
                <div style={{ position: 'fixed', bottom: 20, right: 100, zIndex: 1000 }}>
                    <button className="sync-btn" onClick={() => setView(view === 'admin' ? 'dashboard' : 'admin')}>
                        {view === 'admin' ? 'Back to Dashboard' : 'Open Admin Panel'}
                    </button>
                </div>
            )}

            {/* AI CHATBOT COMPONENT 
                Shared state 'isChatOpen' allows it to be opened from the Sidebar
            */}
            <AIChatBot 
                userId={user.id} 
                isOpen={isChatOpen} 
                setIsOpen={setIsChatOpen} 
            />

            {/* VIEW SWITCHER: ADMIN PANEL vs USER DASHBOARD */}
            {view === 'admin' ? (
                <Admin />
            ) : (
                <>
                    {/* LEFT SIDEBAR 
                        Passed 'openChat' to link the "Need Help?" text to the Chatbot
                    */}
                    <Sidebar 
                        form={form} 
                        setForm={setForm} 
                        onSubmit={handleSync} 
                        openChat={() => setIsChatOpen(true)} 
                    />

                    {/* MAIN DASHBOARD AREA */}
                    <div className="main-content">
                        {/* DIGITAL TWIN HEADER */}
                        <div className="twin-visual-card">
                            <div className="twin-pulse">🧠</div>
                            <div className="twin-info">
                                <h2 style={{ margin: 0 }}>Health Twin: {user.name}</h2>
                                <p style={{ margin: 0, opacity: 0.8 }}>
                                    Status: Connected (Digital Evolution: LVL {Math.floor(user.xp / 100) + 1})
                                </p>
                            </div>
                        </div>

                        {/* DATA VISUALIZATION & AI INSIGHTS
                            Passes logs, xp, and current biometric stats
                        */}
                        <Dashboard 
                            logs={logs} 
                            xp={user.xp} 
                            weight={form.weight} 
                            height={form.height} 
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default App;
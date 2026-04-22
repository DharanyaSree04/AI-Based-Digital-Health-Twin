import React from 'react';
import { Moon, Activity, Heart, ShieldAlert, Zap, Monitor, Weight, Ruler } from 'lucide-react';

const Sidebar = ({ form, setForm, onSubmit, openChat }) => {
    return (
        <aside className="sidebar">
            {/* LOGO SECTION */}
            <div className="logo" style={{ display: 'flex', gap: '10px', marginBottom: '30px', alignItems: 'center' }}>
                <Zap color="#00d2ff" fill="#00d2ff" />
                <h2 style={{ margin: 0, fontSize: '1.2rem', letterSpacing: '1px' }}>HEALTH TWIN AI</h2>
            </div>

            <form onSubmit={onSubmit}>
                {/* PHYSICAL STATS (BMI Inputs) */}
                <div style={{ display: 'flex', gap: '10px' }}>
                    <div className="input-group">
                        <label><Weight size={14} /> Weight (kg)</label>
                        <input 
                            type="number" 
                            value={form.weight} 
                            onChange={e => setForm({ ...form, weight: +e.target.value })} 
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <label><Ruler size={14} /> Height (cm)</label>
                        <input 
                            type="number" 
                            value={form.height} 
                            onChange={e => setForm({ ...form, height: +e.target.value })} 
                            required 
                        />
                    </div>
                </div>

                {/* HABIT INPUTS */}
                <div className="input-group">
                    <label><Moon size={14} /> Sleep Duration (Hrs)</label>
                    <input 
                        type="number" 
                        value={form.sleep} 
                        onChange={e => setForm({ ...form, sleep: +e.target.value })} 
                    />
                </div>

                <div className="input-group">
                    <label><Activity size={14} /> Exercise (Mins)</label>
                    <input 
                        type="number" 
                        value={form.exercise} 
                        onChange={e => setForm({ ...form, exercise: +e.target.value })} 
                    />
                </div>

                <div className="input-group">
                    <label><Heart size={14} /> Diet Quality (1-10)</label>
                    <input 
                        type="number" 
                        min="1" max="10" 
                        value={form.dietQuality} 
                        onChange={e => setForm({ ...form, dietQuality: +e.target.value })} 
                    />
                </div>

                <div className="input-group">
                    <label><Monitor size={14} /> Screen Time (Hrs)</label>
                    <input 
                        type="number" 
                        value={form.screenTime} 
                        onChange={e => setForm({ ...form, screenTime: +e.target.value })} 
                    />
                </div>

                {/* STRESS SLIDER */}
                <div className="input-group">
                    <label><ShieldAlert size={14} /> Stress Level: {form.stress}</label>
                    <input 
                        type="range" 
                        min="1" max="10" 
                        value={form.stress} 
                        onChange={e => setForm({ ...form, stress: +e.target.value })} 
                        className="range-slider" 
                    />
                </div>

                <button type="submit" className="sync-btn">Update Digital Twin</button>
            </form>

            {/* AI ASSISTANT TRIGGER SECTION */}
            <div 
                onClick={openChat} 
                style={{
                    marginTop: '25px', 
                    padding: '15px', 
                    background: 'rgba(0, 210, 255, 0.08)', 
                    borderRadius: '15px', 
                    fontSize: '0.8rem', 
                    textAlign: 'center',
                    cursor: 'pointer',
                    border: '1px solid rgba(0, 210, 255, 0.2)',
                    transition: 'all 0.3s'
                }}
                className="help-box"
            >
                <p style={{ margin: 0, opacity: 0.6, color: '#fff' }}>Need Help?</p>
                <p style={{ margin: '5px 0 0 0', color: 'var(--primary)', fontWeight: 'bold' }}>
                    AI Assistant is Online 🟢
                </p>
            </div>
        </aside>
    );
};

export default Sidebar;
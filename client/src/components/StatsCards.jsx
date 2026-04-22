import React from 'react';

const StatsCards = ({ score, xp, weight, height }) => {
    const bmi = (weight / ((height/100)**2)).toFixed(1);
    const level = Math.floor(xp / 100) + 1;

    return (
        <div className="stats-grid">
            <div className="widget">
                <label style={{color: 'var(--primary)', fontSize: '10px'}}>BMI INDEX</label>
                <div style={{fontSize: '2rem', fontWeight: 'bold'}}>{bmi}</div>
            </div>
            <div className="widget">
                <label style={{color: 'var(--primary)', fontSize: '10px'}}>TWIN EVOLUTION</label>
                <div style={{fontSize: '2rem', fontWeight: 'bold'}}>LVL {level}</div>
            </div>
            <div className="widget">
                <label style={{color: 'var(--primary)', fontSize: '10px'}}>WELLNESS INDEX</label>
                <div style={{fontSize: '2rem', fontWeight: 'bold'}}>{score}%</div>
            </div>
        </div>
    );
};
export default StatsCards;
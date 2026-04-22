import React from 'react';
import { Brain } from 'lucide-react';

const TwinAvatar = ({ score }) => {
    const getTwinColor = () => {
        if (score > 75) return "#00d2ff";
        if (score > 45) return "#facc15";
        return "#ff007a";
    };

    return (
        <div className="twin-visual-card" style={{ borderBottom: `5px solid ${getTwinColor()}` }}>
            <div className="twin-pulse" style={{ backgroundColor: `${getTwinColor()}33` }}>
                <Brain size={60} color={getTwinColor()} />
            </div>
            <div className="twin-info">
                <h2 style={{margin: 0}}>Digital Twin Synchronized</h2>
                <p style={{margin: 0, opacity: 0.7}}>Status: {score > 50 ? 'Stable' : 'Degrading'}</p>
            </div>
        </div>
    );
};

export default TwinAvatar;
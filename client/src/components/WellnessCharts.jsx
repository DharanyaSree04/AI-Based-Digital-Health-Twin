import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const WellnessChart = ({ data }) => {
  return (
    <div style={{ width: '100%', height: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorWave" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00d2ff" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#00d2ff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
          <XAxis 
            dataKey="date" 
            hide 
          />
          <YAxis hide domain={[0, 100]} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white' }}
            itemStyle={{ color: '#00d2ff' }}
            labelFormatter={(label) => new Date(label).toLocaleDateString()}
          />
          <Area 
            type="monotone" 
            dataKey="wellnessScore" 
            stroke="#00d2ff" 
            strokeWidth={4} 
            fillOpacity={1} 
            fill="url(#colorWave)" 
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WellnessChart;
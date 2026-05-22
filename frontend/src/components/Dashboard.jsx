import React from 'react';

export default function Dashboard(){
  return (
    <div className="p-6 bg-white/5 rounded">
      <h2 className="text-xl mb-4">Immersive Dashboard (placeholder)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-64 bg-black/25 rounded">3D Neural Map (Three.js placeholder)</div>
        <div className="h-64 bg-black/25 rounded">Emotional Heatmap (D3 placeholder)</div>
        <div className="h-64 bg-black/25 rounded">Cognitive Radar (Chart.js placeholder)</div>
        <div className="h-64 bg-black/25 rounded">Behavior Timeline (placeholder)</div>
      </div>
    </div>
  );
}

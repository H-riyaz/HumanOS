import React, { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react';

const SensorStub = forwardRef((props, ref) => {
  const keystrokes = useRef([]);
  const mouseMoves = useRef([]);
  const [running, setRunning] = useState(true);

  useEffect(()=>{
    function onKey(e){
      keystrokes.current.push({ key: e.key, ts: Date.now() });
    }
    function onMove(e){
      mouseMoves.current.push({ x: e.clientX, y: e.clientY, ts: Date.now() });
    }
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousemove', onMove);
    return ()=>{ window.removeEventListener('keydown', onKey); window.removeEventListener('mousemove', onMove); };
  },[]);

  useImperativeHandle(ref, ()=>({
    getMetrics: () => {
      // simple aggregated metrics
      const now = Date.now();
      const recentKeys = keystrokes.current.filter(k=>k.ts > now-60000).length;
      const mouseActivity = mouseMoves.current.slice(-50);
      return { keystrokeCountLastMin: recentKeys, mouseSamples: mouseActivity.length };
    }
  }));

  if (!running) return null;
  return <div className="text-xs text-gray-400">Sensors active (stub)</div>;
});

export default SensorStub;

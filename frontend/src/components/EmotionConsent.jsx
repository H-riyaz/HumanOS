import React, { useState } from 'react';

export default function EmotionConsent({ onConsent }){
  const [granted, setGranted] = useState(false);
  async function request(){
    try{
      await navigator.mediaDevices.getUserMedia({ video: true });
      setGranted(true);
      onConsent && onConsent(true);
    }catch(e){
      setGranted(false);
      onConsent && onConsent(false);
    }
  }
  return (
    <div className="p-4 bg-white/5 rounded">
      <p className="mb-2">To enable emotional analysis, allow webcam access. No data will be recorded without consent.</p>
      <button onClick={request} className="px-3 py-1 bg-emerald-600 rounded">Allow Webcam</button>
      {granted === true && <div className="mt-2 text-green-300">Permission granted</div>}
    </div>
  );
}

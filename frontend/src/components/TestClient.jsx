import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import SensorStub from './SensorStub';

export default function TestClient({ initialSessionId }){
  const [sessionId, setSessionId] = useState(initialSessionId);
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const sensorRef = useRef();
  const [log, setLog] = useState([]);

  useEffect(()=>{
    if (!sessionId) return;
    fetchQuestion();
  },[sessionId]);

  async function fetchQuestion(){
    try{
      const res = await axios.get('/api/question', { params: { sessionId } });
      setQuestion(res.data);
    }catch(e){ console.error(e); }
  }

  async function submit(){
    const metrics = sensorRef.current?.getMetrics?.() || {};
    const meta = { ...metrics, submittedAt: Date.now() };
    try{
      const res = await axios.post('/api/answer', { sessionId, questionId: question.id, answer, meta });
      setLog(prev=>[...prev, res.data]);
      setAnswer('');
      await fetchQuestion();
    }catch(e){ console.error(e); }
  }

  return (
    <div className="p-4 bg-white/5 rounded">
      <SensorStub ref={sensorRef} />
      <div className="mb-4">
        {question ? (
          <>
            <div className="mb-2">Domain: {question.domain} — Difficulty: {question.difficulty}</div>
            <div className="p-4 bg-black/25 rounded mb-2">{question.prompt}</div>
            <input value={answer} onChange={e=>setAnswer(e.target.value)} className="p-2 rounded text-black" />
            <button onClick={submit} className="ml-2 px-3 py-1 bg-indigo-600 rounded">Submit</button>
          </>
        ) : <div>Loading question...</div>}
      </div>
      <div className="text-sm text-gray-300">
        <h4 className="font-semibold">Recent events</h4>
        <pre className="text-xs max-h-40 overflow-auto">{JSON.stringify(log.slice(-5),null,2)}</pre>
      </div>
    </div>
  );
}

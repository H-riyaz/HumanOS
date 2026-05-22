import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket;
export default function Arena(){
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(()=>{
    socket = io();
    socket.on('connect', ()=>console.log('socket connected'));
    socket.on('arena:message', msg => setMessages(m=>[...m,msg]));
    return ()=>{ socket.disconnect(); };
  },[]);

  function join(){
    socket.emit('arena:join', { ts: Date.now() });
    setJoined(true);
  }

  return (
    <div className="p-4 bg-white/5 rounded">
      <h3 className="mb-2">Live IQ Arena (stub)</h3>
      {!joined ? <button onClick={join} className="px-3 py-1 bg-indigo-600 rounded">Join Arena</button> : <div>Joined</div>}
      <div className="mt-3 text-sm max-h-36 overflow-auto">{messages.map((m,i)=><div key={i}>{JSON.stringify(m)}</div>)}</div>
    </div>
  );
}

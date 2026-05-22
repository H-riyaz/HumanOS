import React, { useState } from 'react';
import axios from 'axios';

export default function Onboarding(){
  const [form, setForm] = useState({ name: '', email: '', age: '', education: '', language: 'en', careerInterest: '', psychBackground: '' });
  const [msg, setMsg] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post('/api/onboard', form);
      setMsg('Onboarding saved. Proceeding to adaptive session (stub).');
      // TODO: store sessionId and redirect to test client
    }catch(err){ setMsg('Error: ' + (err?.response?.data?.message || err.message)); }
  };

  return (
    <form onSubmit={submit} className="max-w-xl mx-auto bg-white/5 p-6 rounded-lg">
      <h2 className="text-xl mb-4">Create your profile</h2>
      <label className="block mb-2">Name<input className="w-full p-2 rounded mt-1 text-black" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required/></label>
      <label className="block mb-2">Email<input type="email" className="w-full p-2 rounded mt-1 text-black" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required/></label>
      <label className="block mb-2">Age<input type="number" className="w-full p-2 rounded mt-1 text-black" value={form.age} onChange={e=>setForm({...form, age:e.target.value})} /></label>
      <label className="block mb-2">Education<input className="w-full p-2 rounded mt-1 text-black" value={form.education} onChange={e=>setForm({...form, education:e.target.value})} /></label>
      <label className="block mb-2">Language<select className="w-full p-2 rounded mt-1 text-black" value={form.language} onChange={e=>setForm({...form, language:e.target.value})}><option value="en">English</option><option value="es">Español</option></select></label>
      <label className="block mb-2">Career interest<input className="w-full p-2 rounded mt-1 text-black" value={form.careerInterest} onChange={e=>setForm({...form, careerInterest:e.target.value})} /></label>
      <label className="block mb-4">Optional psychological background<textarea className="w-full p-2 rounded mt-1 text-black" value={form.psychBackground} onChange={e=>setForm({...form, psychBackground:e.target.value})} /></label>
      <button className="px-4 py-2 bg-indigo-600 rounded">Start</button>
      {msg && <p className="mt-4 text-sm">{msg}</p>}
    </form>
  );
}

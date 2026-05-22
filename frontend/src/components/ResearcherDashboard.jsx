import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ResearcherDashboard(){
  const [summary, setSummary] = useState(null);
  useEffect(()=>{ fetchSummary(); },[]);
  async function fetchSummary(){
    try{
      const res = await axios.get('/api/export/summary');
      setSummary(res.data);
    }catch(e){ console.error(e); }
  }
  return (
    <div className="p-4 bg-white/5 rounded">
      <h3 className="mb-2">Researcher Summary</h3>
      <pre className="text-xs">{JSON.stringify(summary,null,2)}</pre>
    </div>
  );
}

import React from 'react';
import Onboarding from './components/Onboarding';

export default function App(){
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-black text-white">
      <header className="p-6 text-center text-2xl font-semibold">HumanOS — Adaptive Cognition Interface</header>
      <main className="p-6">
        <Onboarding />
      </main>
    </div>
  );
}

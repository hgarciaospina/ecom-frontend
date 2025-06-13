import './index.css';
import { useState } from 'react';
import { FaBeer } from 'react-icons/fa';

function App() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-800 text-white text-2xl font-bold">
      Welcome <FaBeer />
      <h1 className="text-4xl text-red-600 font-bold">¡Tailwind está funcionando!</h1>
    </div>
  );
}

export default App;

import React, { useState, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { YeastSimulation } from './YeastSimulation'
const FluorescentTimer = React.lazy(() => import('./timer-model/FluorescentTimer'))
import './index.css'
function App() {
  const [currentView, setCurrentView] = useState('yeast');
  return (
    <div className="min-h-screen bg-gray-100 w-full">
      <div className="p-4">
        <div className="mb-4 flex gap-2">
          <button 
            onClick={() => setCurrentView('yeast')}
            className={`px-4 py-2 rounded ${currentView === 'yeast' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
          >
            Yeast Growth Simulation
          </button>
          <button 
            onClick={() => setCurrentView('timer')}
            className={`px-4 py-2 rounded ${currentView === 'timer' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
          >
            Fluorescent Timer Model
          </button>
        </div>
        {currentView === 'yeast' && <YeastSimulation />}
        {currentView === 'timer' && (
          <Suspense fallback={<div className="p-4">Loading Fluorescent Timer model...</div>}>
            <FluorescentTimer />
          </Suspense>
        )}
      </div>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
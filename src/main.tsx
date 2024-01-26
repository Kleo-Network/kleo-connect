import React from 'react'
import './App.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import ParticleNetworkProvider from './components/profile/Onboarding/Particle/InitParticle'

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="w-full h-full">
        <ParticleNetworkProvider>
          <App />
        </ParticleNetworkProvider>
      </div>
    </BrowserRouter>
  </React.StrictMode>
)

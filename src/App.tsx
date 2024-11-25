import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Journal } from './pages/Journal';
import { Activities } from './pages/Activities';
import { Community } from './pages/Community';
import { Settings } from './pages/Settings';
import { StepWork } from './pages/StepWork';
import { Navigation } from './components/Navigation';
import { QuoteBar } from './components/QuoteBar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navigation />
        <main className="flex-1 container mx-auto px-4 py-8 mt-16 md:mt-20">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/community" element={<Community />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/stepwork" element={<StepWork />} />
          </Routes>
        </main>
        <QuoteBar />
      </div>
    </Router>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthProvider';
import { SignIn } from './components/SignIn';
import { Dashboard } from './pages/Dashboard';
import { Journal } from './pages/Journal';
import { Activities } from './pages/Activities';
import { Community } from './pages/Community';
import { Settings } from './pages/Settings';
import { StepWork } from './pages/StepWork';
import { Navigation } from './components/Navigation';
import { QuoteBar } from './components/QuoteBar';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/signin" />;
  }
  
  return <>{children}</>;
};

function AppContent() {
  const { user } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {user && <Navigation />}
        <main className={`flex-1 container mx-auto px-4 py-8 ${user ? 'mt-16 md:mt-20' : ''}`}>
          <Routes>
            <Route path="/signin" element={!user ? <SignIn /> : <Navigate to="/" />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/journal" element={
              <ProtectedRoute>
                <Journal />
              </ProtectedRoute>
            } />
            <Route path="/activities" element={
              <ProtectedRoute>
                <Activities />
              </ProtectedRoute>
            } />
            <Route path="/community" element={
              <ProtectedRoute>
                <Community />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
            <Route path="/stepwork" element={
              <ProtectedRoute>
                <StepWork />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        {user && <QuoteBar />}
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
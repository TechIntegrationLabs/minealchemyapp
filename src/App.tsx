import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton, RedirectToSignIn, useUser } from "@clerk/clerk-react";
import { Dashboard } from './pages/Dashboard';
import { Journal } from './pages/Journal';
import { Activities } from './pages/Activities';
import { Community } from './pages/Community';
import { Settings } from './pages/Settings';
import { StepWork } from './pages/StepWork';
import { Navigation } from './components/Navigation';
import { QuoteBar } from './components/QuoteBar';
import { LoadingScreen } from './components/LoadingScreen';
import { useUserSync } from './hooks/useUserSync';
import { useStore } from './store/useStore';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useFirebaseAuth } from './hooks/useFirebaseAuth';

function App() {
  const { isLoaded: isClerkLoaded } = useUser();
  const { userState } = useStore();
  const { isLoading: isFirebaseLoading, error: firebaseError } = useFirebaseAuth();
  useUserSync();

  useEffect(() => {
    if (userState?.settings?.theme) {
      document.documentElement.classList.remove('light', 'dark');
      if (userState.settings.theme !== 'system') {
        document.documentElement.classList.add(userState.settings.theme);
      } else {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.classList.add('dark');
        }
      }
    }
  }, [userState?.settings?.theme]);

  if (!isClerkLoaded || isFirebaseLoading) {
    return <LoadingScreen />;
  }

  if (firebaseError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="p-4 bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Authentication Error</h2>
          <p>{firebaseError.message}</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <ErrorBoundary>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
          <header className="fixed w-full top-0 bg-white dark:bg-gray-800 shadow-sm z-50 px-4 py-2 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="MineAlchemy" className="w-8 h-8" />
              <span className="font-semibold text-lg dark:text-white">MineAlchemy</span>
            </div>
            <div className="flex items-center space-x-4">
              <SignedIn>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10",
                      userButtonTrigger: "focus:shadow-none focus:ring-2 focus:ring-blue-500"
                    }
                  }}
                />
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal" />
              </SignedOut>
            </div>
          </header>
          <Navigation />
          <main className="flex-1 container mx-auto px-4 py-8 mt-16 md:mt-20">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route
                path="/journal"
                element={
                  <>
                    <SignedIn>
                      <Journal />
                    </SignedIn>
                    <SignedOut>
                      <RedirectToSignIn />
                    </SignedOut>
                  </>
                }
              />
              <Route
                path="/activities"
                element={
                  <>
                    <SignedIn>
                      <Activities />
                    </SignedIn>
                    <SignedOut>
                      <RedirectToSignIn />
                    </SignedOut>
                  </>
                }
              />
              <Route
                path="/community"
                element={
                  <>
                    <SignedIn>
                      <Community />
                    </SignedIn>
                    <SignedOut>
                      <RedirectToSignIn />
                    </SignedOut>
                  </>
                }
              />
              <Route
                path="/settings"
                element={
                  <>
                    <SignedIn>
                      <Settings />
                    </SignedIn>
                    <SignedOut>
                      <RedirectToSignIn />
                    </SignedOut>
                  </>
                }
              />
              <Route
                path="/stepwork"
                element={
                  <>
                    <SignedIn>
                      <StepWork />
                    </SignedIn>
                    <SignedOut>
                      <RedirectToSignIn />
                    </SignedOut>
                  </>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <QuoteBar />
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
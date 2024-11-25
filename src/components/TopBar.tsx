import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HealthBars } from './HealthBars';
import { QuoteDisplay } from './QuoteDisplay';
import { useStore } from '../store/useStore';
import { recoveryQuotes } from '../data/quotes';

export const TopBar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [currentQuote, setCurrentQuote] = useState(recoveryQuotes[0]);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // Temporary mock data
  const mockMetrics = {
    mental: 75,
    spiritual: 60,
    physical: 80,
    social: 65
  };

  const handleNextQuote = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * recoveryQuotes.length);
    } while (recoveryQuotes[newIndex].id === currentQuote.id);
    setCurrentQuote(recoveryQuotes[newIndex]);
  };

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * recoveryQuotes.length);
    setCurrentQuote(recoveryQuotes[randomIndex]);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Auto-expand when at the top
      if (currentScrollY === 0) {
        setIsExpanded(true);
      } else if (currentScrollY > lastScrollY) {
        // Collapse when scrolling down
        setIsExpanded(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const metricColors = {
    mental: 'bg-blue-500',
    spiritual: 'bg-purple-500',
    physical: 'bg-green-500',
    social: 'bg-pink-500'
  };

  return (
    <div 
      className="fixed top-16 left-0 right-0 z-40 transition-all duration-300"
      onMouseEnter={() => setIsExpanded(true)}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <AnimatePresence>
        {isExpanded ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white shadow-md"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <QuoteDisplay currentQuote={currentQuote} onNextQuote={handleNextQuote} />
                </div>
                <div>
                  <HealthBars 
                    metrics={mockMetrics} 
                    onMetricSelect={() => {}}
                    selectedMetric={null}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex space-x-1 px-4 py-1 bg-white/80 backdrop-blur-sm shadow-sm cursor-pointer"
          >
            {Object.entries(mockMetrics).map(([key, value]) => (
              <div 
                key={key}
                className="flex-1 flex items-center space-x-1"
              >
                <div 
                  className={`h-1 rounded-full ${metricColors[key as keyof typeof metricColors]}`}
                  style={{ width: `${value}%` }}
                />
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
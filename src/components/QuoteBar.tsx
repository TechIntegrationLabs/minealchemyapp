import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';
import { recoveryQuotes } from '../data/quotes';

export const QuoteBar: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState(recoveryQuotes[0]);
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * recoveryQuotes.length);
    setCurrentQuote(recoveryQuotes[randomIndex]);
  }, [location]);

  const handleNextQuote = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * recoveryQuotes.length);
    } while (recoveryQuotes[newIndex].id === currentQuote.id);
    setCurrentQuote(recoveryQuotes[newIndex]);
  };

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg"
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : 'calc(100% - 4px)' }}
      transition={{ duration: 0.3 }}
      onClick={() => setIsVisible(true)}
      onMouseEnter={() => setIsVisible(true)}
    >
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
      <div className="max-w-4xl mx-auto p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuote.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center pr-12"
          >
            <p className="text-gray-800 italic text-sm md:text-base">"{currentQuote.text}"</p>
            <p className="text-xs md:text-sm text-gray-600 mt-1">— {currentQuote.source}</p>
          </motion.div>
        </AnimatePresence>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNextQuote();
          }}
          className="absolute top-1/2 right-4 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Next quote"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};
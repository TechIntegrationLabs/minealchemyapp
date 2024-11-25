import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { recoveryQuotes } from '../data/quotes';

interface Props {
  currentQuote: typeof recoveryQuotes[0];
  onNextQuote: () => void;
}

export const QuoteDisplay: React.FC<Props> = ({ currentQuote, onNextQuote }) => {
  return (
    <div className="relative bg-gray-50 rounded-lg p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuote.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="pr-8"
        >
          <p className="text-gray-800 italic text-sm md:text-base">"{currentQuote.text}"</p>
          <p className="text-xs md:text-sm text-gray-600 mt-1">— {currentQuote.source}</p>
        </motion.div>
      </AnimatePresence>
      
      <button
        onClick={onNextQuote}
        className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Next quote"
      >
        <RefreshCw className="w-4 h-4" />
      </button>
    </div>
  );
};
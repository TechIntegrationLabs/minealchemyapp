import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Heart, Compass, ChevronDown, ChevronUp } from 'lucide-react';

export const Philosophy: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const principles = [
    {
      title: "Past → Acceptance",
      description: "Transform resentments from the past into acceptance through honest self-reflection and making amends.",
      icon: Lightbulb,
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      title: "Present → Love",
      description: "Convert anger from the present into love through practicing gratitude and service to others.",
      icon: Heart,
      color: "text-pink-500",
      bgColor: "bg-pink-50"
    },
    {
      title: "Future → Faith",
      description: "Turn fear of the future into faith by trusting the process and living one day at a time.",
      icon: Compass,
      color: "text-purple-500",
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <div className="space-y-6">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
      >
        <div className="text-left">
          <h2 className="text-2xl font-bold text-gray-900">The Purpose of Recovery</h2>
          <p className="text-gray-600 mt-1">
            A journey of transformation through the 12 Steps
          </p>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-6 h-6 text-gray-400" />
        ) : (
          <ChevronDown className="w-6 h-6 text-gray-400" />
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {principles.map((principle, index) => {
                const Icon = principle.icon;
                return (
                  <motion.div
                    key={principle.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className={`${principle.bgColor} ${principle.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {principle.title}
                    </h3>
                    <p className="text-gray-600">
                      {principle.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
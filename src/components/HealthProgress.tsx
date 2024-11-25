import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { HealthMetric } from '../types';
import { Brain, Heart, Users, Dumbbell } from 'lucide-react';

interface Props {
  metrics: HealthMetric;
  onMetricUpdate?: (key: keyof HealthMetric, value: number) => void;
  isInteractive?: boolean;
}

export const HealthProgress: React.FC<Props> = ({
  metrics,
  onMetricUpdate,
  isInteractive = false
}) => {
  const [hoveredMetric, setHoveredMetric] = useState<keyof HealthMetric | null>(null);

  const metricConfig = [
    { key: 'mental', icon: Brain, color: '#818CF8', label: 'Mental Health', radius: 120 },
    { key: 'spiritual', icon: Heart, color: '#F472B6', label: 'Spiritual Health', radius: 90 },
    { key: 'physical', icon: Dumbbell, color: '#34D399', label: 'Physical Health', radius: 60 },
    { key: 'social', icon: Users, color: '#FCD34D', label: 'Social Health', radius: 30 }
  ];

  const handleMetricClick = (metric: keyof HealthMetric) => {
    if (!isInteractive || !onMetricUpdate) return;
    const currentValue = metrics[metric];
    const newValue = currentValue + 5 <= 100 ? currentValue + 5 : 0;
    onMetricUpdate(metric, newValue);
  };

  return (
    <div className="relative w-[400px] h-[400px] flex items-center justify-center">
      {/* Decorative background circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          className="w-[420px] h-[420px] rounded-full bg-gradient-to-br from-blue-50 to-purple-50"
          animate={{ 
            scale: [1, 1.02, 1],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative">
        {/* Progress rings */}
        <svg className="w-[360px] h-[360px] -rotate-90 transform">
          {metricConfig.map(({ key, color, radius }) => {
            const metric = key as keyof HealthMetric;
            const circumference = 2 * Math.PI * radius;
            const progress = metrics[metric] / 100;
            const strokeDasharray = `${circumference * progress} ${circumference}`;
            const isHovered = hoveredMetric === metric;
            
            return (
              <g key={metric} className="transform translate-x-[180px] translate-y-[180px]">
                {/* Background circle */}
                <circle
                  r={radius}
                  fill="none"
                  stroke={`${color}20`}
                  strokeWidth="12"
                  className="transition-all duration-300"
                />
                {/* Progress circle */}
                <motion.circle
                  r={radius}
                  fill="none"
                  stroke={color}
                  strokeWidth={isHovered ? "16" : "12"}
                  strokeLinecap="round"
                  strokeDasharray={strokeDasharray}
                  initial={{ pathLength: 0 }}
                  animate={{ 
                    pathLength: progress,
                    strokeWidth: isHovered ? 16 : 12
                  }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="transition-all duration-300"
                  style={{
                    filter: isHovered ? 'drop-shadow(0 0 8px ${color}40)' : 'none'
                  }}
                />
              </g>
            );
          })}
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-2 gap-6 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
            {metricConfig.map(({ key, icon: Icon, color, label }) => {
              const metric = key as keyof HealthMetric;
              const isHovered = hoveredMetric === metric;
              const percentage = metrics[metric];

              return (
                <motion.button
                  key={metric}
                  className={`flex flex-col items-center p-3 rounded-xl transition-all duration-300 ${
                    isHovered ? 'bg-gray-50/80' : ''
                  }`}
                  whileHover={{ scale: 1.05 }}
                  onMouseEnter={() => setHoveredMetric(metric)}
                  onMouseLeave={() => setHoveredMetric(null)}
                  onClick={() => handleMetricClick(metric)}
                >
                  <div 
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 transition-all duration-300 ${
                      isHovered ? 'scale-110' : ''
                    }`}
                    style={{ 
                      backgroundColor: `${color}15`,
                      boxShadow: isHovered ? `0 0 20px ${color}30` : 'none'
                    }}
                  >
                    <Icon 
                      className="w-6 h-6 transition-colors duration-300" 
                      style={{ color: isHovered ? color : `${color}90` }} 
                    />
                  </div>
                  <motion.div 
                    className="text-2xl font-bold"
                    style={{ color }}
                    animate={{ scale: isHovered ? 1.1 : 1 }}
                  >
                    {percentage}%
                  </motion.div>
                  <div className="text-xs font-medium text-gray-500 mt-1">
                    {label.split(' ')[0]}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Hover tooltip */}
        <AnimatePresence>
          {hoveredMetric && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
            >
              <div className="bg-white px-6 py-2 rounded-full shadow-lg">
                <span className="text-sm font-medium text-gray-900">
                  {metricConfig.find(m => m.key === hoveredMetric)?.label}
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  {metrics[hoveredMetric]}% Complete
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
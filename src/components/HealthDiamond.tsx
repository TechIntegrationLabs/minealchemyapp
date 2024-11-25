import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { HealthMetric } from '../types';
import { Brain, Heart, Users, Dumbbell } from 'lucide-react';

interface Props {
  metrics: HealthMetric;
  onMetricUpdate?: (key: keyof HealthMetric, value: number) => void;
  isInteractive?: boolean;
}

export const HealthDiamond: React.FC<Props> = ({ 
  metrics, 
  onMetricUpdate,
  isInteractive = false 
}) => {
  const [hoveredMetric, setHoveredMetric] = useState<keyof HealthMetric | null>(null);

  const metricInfo = {
    mental: { icon: Brain, color: '#60A5FA', label: 'Mental Health', gradient: 'from-blue-500 to-blue-300' },
    spiritual: { icon: Heart, color: '#A78BFA', label: 'Spiritual Health', gradient: 'from-purple-500 to-purple-300' },
    physical: { icon: Dumbbell, color: '#34D399', label: 'Physical Health', gradient: 'from-green-500 to-green-300' },
    social: { icon: Users, color: '#F472B6', label: 'Social Health', gradient: 'from-pink-500 to-pink-300' }
  };

  const handleMetricClick = (metric: keyof HealthMetric) => {
    if (!isInteractive || !onMetricUpdate) return;
    const currentValue = metrics[metric];
    const newValue = currentValue + 5 <= 100 ? currentValue + 5 : 0;
    onMetricUpdate(metric, newValue);
  };

  const calculateStrokeDasharray = (percentage: number) => {
    const circumference = 2 * Math.PI * 40; // radius = 40
    return `${(percentage / 100) * circumference} ${circumference}`;
  };

  return (
    <div className="relative w-[400px] h-[400px]">
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full"
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

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="text-2xl font-bold text-gray-800 bg-white/80 px-6 py-3 rounded-full"
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          MINE
        </motion.div>
      </div>

      {Object.entries(metrics).map(([key, value], index) => {
        const metric = key as keyof HealthMetric;
        const info = metricInfo[metric];
        const Icon = info.icon;
        const rotation = index * 90;
        const isHovered = hoveredMetric === metric;

        return (
          <motion.div
            key={metric}
            className="absolute inset-0"
            style={{ rotate: `${rotation}deg` }}
            whileHover={{ scale: 1.05 }}
          >
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full transform -rotate-90"
            >
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="8"
                className="opacity-30"
              />
              
              {/* Progress circle */}
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={info.color}
                strokeWidth="8"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: value / 100 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`drop-shadow-lg ${isHovered ? 'stroke-[10]' : ''}`}
                style={{
                  strokeDasharray: calculateStrokeDasharray(value)
                }}
              />

              {/* Icon container */}
              <motion.g
                transform={`translate(50, 10) rotate(${90 + rotation})`}
                animate={{ scale: isHovered ? 1.2 : 1 }}
                className="cursor-pointer"
                onClick={() => handleMetricClick(metric)}
                onMouseEnter={() => setHoveredMetric(metric)}
                onMouseLeave={() => setHoveredMetric(null)}
              >
                <circle
                  r="15"
                  fill="white"
                  className="drop-shadow-md"
                />
                <foreignObject
                  x="-8"
                  y="-8"
                  width="16"
                  height="16"
                  className="overflow-visible"
                >
                  <Icon className="w-4 h-4" style={{ color: info.color }} />
                </foreignObject>
              </motion.g>
            </svg>

            {isHovered && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="bg-white px-4 py-2 rounded-full shadow-lg text-sm font-medium">
                  {info.label}: {value}%
                </div>
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};
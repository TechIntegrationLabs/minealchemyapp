import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart, Users, Dumbbell } from 'lucide-react';
import type { HealthMetric } from '../types';

interface Props {
  metrics: HealthMetric;
  onMetricSelect: (metric: keyof HealthMetric) => void;
  selectedMetric: keyof HealthMetric | null;
}

export const HealthBars: React.FC<Props> = ({ metrics, onMetricSelect, selectedMetric }) => {
  const metricConfig = [
    { key: 'mental', icon: Brain, color: '#60A5FA', label: 'Mental', gradient: 'from-blue-500 to-blue-600' },
    { key: 'spiritual', icon: Heart, color: '#F472B6', label: 'Spiritual', gradient: 'from-purple-500 to-purple-600' },
    { key: 'physical', icon: Dumbbell, color: '#34D399', label: 'Physical', gradient: 'from-green-500 to-green-600' },
    { key: 'social', icon: Users, color: '#FCD34D', label: 'Social', gradient: 'from-pink-500 to-pink-600' }
  ];

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="space-y-2">
        {metricConfig.map(({ key, icon: Icon, color, label, gradient }) => {
          const metric = key as keyof HealthMetric;
          const value = metrics[metric];
          const isSelected = selectedMetric === metric;
          
          return (
            <div 
              key={metric} 
              className={`relative cursor-pointer transition-transform ${isSelected ? 'scale-105' : 'hover:scale-102'}`}
              onClick={() => onMetricSelect(metric)}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <Icon className="w-4 h-4 mr-1.5" style={{ color }} />
                  <span className="text-gray-700 text-xs font-medium">{label}</span>
                </div>
                <span className="text-gray-700 text-xs font-bold">{value}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${gradient}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${value}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
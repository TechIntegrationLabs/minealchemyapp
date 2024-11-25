import React from 'react';
import { useLocation } from 'react-router-dom';
import { Brain, Heart, Users, Dumbbell } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { HealthMetric } from '../types';

interface Props {
  onMetricSelect?: (metric: keyof HealthMetric) => void;
}

export const HealthMetricsTab: React.FC<Props> = ({ onMetricSelect }) => {
  const location = useLocation();
  const isDashboard = location.pathname === '/';

  // Mock metrics - replace with actual store data
  const metrics = {
    mental: 75,
    spiritual: 60,
    physical: 80,
    social: 65
  };

  const metricConfig = [
    { key: 'mental', icon: Brain, color: 'bg-blue-500', textColor: 'text-blue-500' },
    { key: 'spiritual', icon: Heart, color: 'bg-purple-500', textColor: 'text-purple-500' },
    { key: 'physical', icon: Dumbbell, color: 'bg-green-500', textColor: 'text-green-500' },
    { key: 'social', icon: Users, color: 'bg-pink-500', textColor: 'text-pink-500' }
  ];

  if (!isDashboard) {
    return (
      <div className="fixed top-3 right-20 bg-white rounded-lg shadow-md z-50 overflow-hidden cursor-pointer p-1">
        <div className="flex h-8 items-center gap-px">
          {metricConfig.map(({ key, color }) => {
            const value = metrics[key as keyof HealthMetric];
            return (
              <div
                key={key}
                className={`w-12 h-full ${color} opacity-80 hover:opacity-100 transition-opacity flex items-center justify-center`}
              >
                <span className="text-[10px] font-bold text-white">
                  {value}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
};
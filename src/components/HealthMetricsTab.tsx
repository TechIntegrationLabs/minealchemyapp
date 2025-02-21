import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Brain, Heart, Users, Dumbbell } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useAuth } from './AuthProvider';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { updateHealthMetrics } from '../lib/firebaseFunctions';
import type { HealthMetric } from '../types';

interface Props {
  onMetricSelect?: (metric: keyof HealthMetric) => void;
}

export const HealthMetricsTab: React.FC<Props> = ({ onMetricSelect }) => {
  const location = useLocation();
  const isDashboard = location.pathname === '/';
  const { user } = useAuth();
  const [metrics, setMetrics] = useState({
    mental: 0,
    spiritual: 0,
    physical: 0,
    social: 0
  });

  useEffect(() => {
    if (!user) return;

    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(doc(db, 'users', user.uid), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        if (data.healthMetrics) {
          setMetrics({
            mental: data.healthMetrics.mental?.value || 0,
            spiritual: data.healthMetrics.spiritual?.value || 0,
            physical: data.healthMetrics.physical?.value || 0,
            social: data.healthMetrics.social?.value || 0
          });
        }
      }
    });

    return () => unsubscribe();
  }, [user]);

  const metricConfig = [
    { key: 'mental', icon: Brain, color: 'bg-blue-500', textColor: 'text-blue-500' },
    { key: 'spiritual', icon: Heart, color: 'bg-purple-500', textColor: 'text-purple-500' },
    { key: 'physical', icon: Dumbbell, color: 'bg-green-500', textColor: 'text-green-500' },
    { key: 'social', icon: Users, color: 'bg-pink-500', textColor: 'text-pink-500' }
  ];

  const handleMetricClick = async (key: keyof HealthMetric) => {
    if (onMetricSelect) {
      onMetricSelect(key);
    }
    
    // Update the metric in Firestore (example of how to update)
    if (user) {
      try {
        await updateHealthMetrics(user.uid, {
          [key]: {
            value: metrics[key],
            lastUpdated: new Date()
          }
        });
      } catch (error) {
        console.error('Error updating health metric:', error);
      }
    }
  };

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
                onClick={() => handleMetricClick(key as keyof HealthMetric)}
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

  return (
    <div className="grid grid-cols-4 gap-4">
      {metricConfig.map(({ key, icon: Icon, color, textColor }) => {
        const value = metrics[key as keyof HealthMetric];
        return (
          <button
            key={key}
            onClick={() => handleMetricClick(key as keyof HealthMetric)}
            className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <Icon className={`w-6 h-6 ${textColor} mb-2`} />
            <div className={`w-full h-2 ${color} rounded-full mb-2`}>
              <div
                className={`h-full ${color} rounded-full`}
                style={{ width: `${value}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-600">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </span>
          </button>
        );
      })}
    </div>
  );
};
import React, { useState } from 'react';
import { Plus, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import { defaultActivities } from '../../data/defaultActivities';
import type { Activity, HealthMetric } from '../../types';
import { AddActivityModal } from './AddActivityModal';
import { useStore } from '../../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  metricType: keyof HealthMetric;
  onAddActivity: () => void;
}

const metricConfig = {
  mental: {
    color: 'blue',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    hoverBg: 'hover:bg-blue-100',
    borderHover: 'hover:border-blue-300'
  },
  spiritual: {
    color: 'purple',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600',
    hoverBg: 'hover:bg-purple-100',
    borderHover: 'hover:border-purple-300'
  },
  physical: {
    color: 'green',
    bgColor: 'bg-green-50',
    textColor: 'text-green-600',
    hoverBg: 'hover:bg-green-100',
    borderHover: 'hover:border-green-300'
  },
  social: {
    color: 'pink',
    bgColor: 'bg-pink-50',
    textColor: 'text-pink-600',
    hoverBg: 'hover:bg-pink-100',
    borderHover: 'hover:border-pink-300'
  }
};

export const ActivityList: React.FC<Props> = ({ metricType, onAddActivity }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { customActivities, activityCompletions, incrementActivityCount } = useStore();
  const activities = [
    ...defaultActivities[metricType],
    ...(customActivities?.filter(a => a.type === metricType) || [])
  ];
  const config = metricConfig[metricType];

  const handleActivityClick = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleComplete = (activity: Activity, e: React.MouseEvent) => {
    e.stopPropagation();
    incrementActivityCount(activity.id);
  };

  const getCompletionCount = (activityId: string) => {
    return activityCompletions[activityId] || 0;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          {metricType.charAt(0).toUpperCase() + metricType.slice(1)} Activities
        </h2>
        <button 
          onClick={onAddActivity}
          className={`p-2 ${config.hoverBg} rounded-lg transition-colors`}
          aria-label="Add custom activity"
        >
          <Plus className={`w-5 h-5 ${config.textColor}`} />
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <motion.div 
            key={activity.id}
            className={`
              bg-white border border-gray-200 rounded-lg overflow-hidden
              cursor-pointer transition-all duration-200
              hover:shadow-md ${config.borderHover}
            `}
            onClick={() => handleActivityClick(activity.id)}
            layout
          >
            <div className={`
              p-4 flex items-center justify-between
              ${expandedId === activity.id ? config.bgColor : ''}
            `}>
              <div className="flex items-center space-x-4">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${config.bgColor} ${config.textColor}
                `}>
                  <span className="font-semibold">{getCompletionCount(activity.id)}</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900">{activity.name}</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => handleComplete(activity, e)}
                  className={`
                    p-2 rounded-full ${config.hoverBg}
                    ${config.textColor} transition-colors
                  `}
                >
                  <CheckCircle className="w-5 h-5" />
                </button>
                {expandedId === activity.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </div>

            <AnimatePresence>
              {expandedId === activity.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-t border-gray-200"
                >
                  <div className="p-4 space-y-3">
                    <p className="text-gray-600">{activity.description}</p>
                    <div className="flex items-center space-x-2">
                      <span className={`${config.textColor} font-medium`}>Health Boost:</span>
                      <span className="text-gray-600">{activity.healthBoost}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
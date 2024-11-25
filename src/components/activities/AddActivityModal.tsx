import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { HealthMetric } from '../../types';
import { useStore } from '../../store/useStore';

interface Props {
  metricType: keyof HealthMetric;
  onClose: () => void;
}

export const AddActivityModal: React.FC<Props> = ({ metricType, onClose }) => {
  const [activityName, setActivityName] = useState('');
  const [description, setDescription] = useState('');
  const [healthBoost, setHealthBoost] = useState('');
  const { addCustomActivity } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activityName.trim()) {
      addCustomActivity({
        id: crypto.randomUUID(),
        name: activityName.trim(),
        type: metricType,
        description: description.trim(),
        healthBoost: healthBoost.trim(),
        completionCount: 0,
        isCustom: true
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Custom Activity</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Activity Name
            </label>
            <input
              type="text"
              value={activityName}
              onChange={(e) => setActivityName(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter activity name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Describe the activity"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Health Boost
            </label>
            <input
              type="text"
              value={healthBoost}
              onChange={(e) => setHealthBoost(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="What health benefits does this activity provide?"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full btn"
          >
            Add Activity
          </button>
        </form>
      </div>
    </div>
  );
};
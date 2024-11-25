import React from 'react';
import { X, Mountain } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const TrackerModal: React.FC = () => {
  const { setActivityModal } = useStore();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Track Activity</h2>
          <button 
            onClick={() => setActivityModal('showTracker', false)}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Activity Type
            </label>
            <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option>Hiking</option>
              <option>Meditation</option>
              <option>Yoga</option>
              <option>Running</option>
              <option>Swimming</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (minutes)
            </label>
            <input 
              type="number" 
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Intensity Level
            </label>
            <div className="flex gap-2">
              {['Light', 'Moderate', 'Intense'].map((level) => (
                <button
                  key={level}
                  className="flex-1 py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-50"
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea 
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
              placeholder="How did you feel during and after the activity?"
            />
          </div>

          <button 
            className="w-full btn"
            onClick={() => setActivityModal('showTracker', false)}
          >
            <Mountain className="w-4 h-4 mr-2" />
            Log Activity
          </button>
        </div>
      </div>
    </div>
  );
};
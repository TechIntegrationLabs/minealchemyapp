import React from 'react';
import { X, Calendar } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const ScheduleModal: React.FC = () => {
  const { setActivityModal } = useStore();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Schedule a Session</h2>
          <button 
            onClick={() => setActivityModal('showScheduler', false)}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Session Type
            </label>
            <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option>Therapy Session</option>
              <option>Group Meditation</option>
              <option>Art Therapy</option>
              <option>Physical Activity</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date & Time
            </label>
            <input 
              type="datetime-local" 
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea 
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
              placeholder="Any specific requirements or preferences..."
            />
          </div>

          <button 
            className="w-full btn"
            onClick={() => setActivityModal('showScheduler', false)}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Session
          </button>
        </div>
      </div>
    </div>
  );
};
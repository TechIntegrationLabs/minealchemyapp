import React from 'react';
import { X, Utensils } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const NutritionModal: React.FC = () => {
  const { setActivityModal } = useStore();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Log Meal</h2>
          <button 
            onClick={() => setActivityModal('showNutrition', false)}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meal Type
            </label>
            <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
              <option>Snack</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Foods Consumed
            </label>
            <textarea 
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
              placeholder="List the foods you ate..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Portion Size
            </label>
            <div className="flex gap-2">
              {['Small', 'Medium', 'Large'].map((size) => (
                <button
                  key={size}
                  className="flex-1 py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-50"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              How did you feel?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['Energized', 'Satisfied', 'Heavy', 'Hungry'].map((feeling) => (
                <button
                  key={feeling}
                  className="py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-50"
                >
                  {feeling}
                </button>
              ))}
            </div>
          </div>

          <button 
            className="w-full btn"
            onClick={() => setActivityModal('showNutrition', false)}
          >
            <Utensils className="w-4 h-4 mr-2" />
            Log Meal
          </button>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Calendar, Mountain, Utensils } from 'lucide-react';
import { useStore } from '../store/useStore';

export const QuickActions: React.FC = () => {
  const navigate = useNavigate();
  const { addJournalEntry, scheduleSession, trackActivity, logMeal } = useStore();

  const actions = [
    { 
      icon: BookOpen, 
      label: 'Journal Entry', 
      color: 'text-blue-500',
      onClick: () => {
        navigate('/journal');
      }
    },
    { 
      icon: Calendar, 
      label: 'Schedule Session', 
      color: 'text-purple-500',
      onClick: () => {
        navigate('/activities', { state: { openScheduler: true } });
      }
    },
    { 
      icon: Mountain, 
      label: 'Track Activity', 
      color: 'text-green-500',
      onClick: () => {
        navigate('/activities', { state: { openTracker: true } });
      }
    },
    { 
      icon: Utensils, 
      label: 'Log Meal', 
      color: 'text-orange-500',
      onClick: () => {
        navigate('/activities', { state: { openNutrition: true } });
      }
    }
  ];

  return (
    <div className="space-y-4">
      {actions.map(({ icon: Icon, label, color, onClick }) => (
        <button
          key={label}
          onClick={onClick}
          className="w-full flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200 hover:border-gray-300 hover:shadow-sm"
        >
          <Icon className={`w-5 h-5 ${color} mr-3`} />
          <span className="text-gray-700">{label}</span>
        </button>
      ))}
    </div>
  );
};
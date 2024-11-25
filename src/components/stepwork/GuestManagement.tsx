import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { format } from 'date-fns';
import { UserPlus, Trash2, Key } from 'lucide-react';
import type { GuestAccess } from '../../types';

export const GuestManagement: React.FC = () => {
  const { guestPins, addGuestAccess, removeGuestAccess } = useStore();
  const [name, setName] = useState('');
  const [role, setRole] = useState<GuestAccess['role']>('sponsor');
  const [accessLevel, setAccessLevel] = useState<GuestAccess['accessLevel']>('all');
  const [specificSteps, setSpecificSteps] = useState<number[]>([]);

  const generatePin = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      addGuestAccess({
        pin: generatePin(),
        name: name.trim(),
        role,
        accessLevel,
        specificSteps: accessLevel === 'specific' ? specificSteps : undefined,
      });
      setName('');
      setRole('sponsor');
      setAccessLevel('all');
      setSpecificSteps([]);
    }
  };

  const handleStepToggle = (step: number) => {
    setSpecificSteps((current) =>
      current.includes(step)
        ? current.filter((s) => s !== step)
        : [...current, step]
    );
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Add Guest Access
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Guest Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter guest name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as GuestAccess['role'])}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="sponsor">Sponsor</option>
              <option value="mentor">Mentor</option>
              <option value="therapist">Therapist</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Access Level
            </label>
            <select
              value={accessLevel}
              onChange={(e) => setAccessLevel(e.target.value as GuestAccess['accessLevel'])}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="all">All Steps</option>
              <option value="specific">Specific Steps</option>
            </select>
          </div>

          {accessLevel === 'specific' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Steps
              </label>
              <div className="grid grid-cols-3 gap-2">
                {Array.from({ length: 12 }, (_, i) => (
                  <button
                    key={i + 1}
                    type="button"
                    onClick={() => handleStepToggle(i + 1)}
                    className={`p-2 rounded-md border ${
                      specificSteps.includes(i + 1)
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'border-gray-300 text-gray-700'
                    }`}
                  >
                    Step {i + 1}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button type="submit" className="btn w-full">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Guest
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {guestPins.map((guest) => (
          <div
            key={guest.id}
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-medium text-gray-900">
                  {guest.name}
                </h4>
                <p className="text-sm text-gray-500">
                  {guest.role.charAt(0).toUpperCase() + guest.role.slice(1)}
                </p>
              </div>
              <button
                onClick={() => removeGuestAccess(guest.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 flex items-center space-x-4">
              <div className="flex items-center">
                <Key className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm font-medium">{guest.pin}</span>
              </div>
              <span className="text-sm text-gray-500">
                Created: {format(new Date(guest.createdAt), 'MMM d, yyyy')}
              </span>
              {guest.lastAccess && (
                <span className="text-sm text-gray-500">
                  Last access: {format(new Date(guest.lastAccess), 'MMM d, yyyy')}
                </span>
              )}
            </div>

            {guest.accessLevel === 'specific' && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">
                  Access to steps:{' '}
                  {guest.specificSteps?.join(', ')}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
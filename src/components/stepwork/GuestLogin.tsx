import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Key, AlertCircle } from 'lucide-react';

interface Props {
  onSuccess: () => void;
}

export const GuestLogin: React.FC<Props> = ({ onSuccess }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const { verifyGuestPin } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const guest = verifyGuestPin(pin);
    if (guest) {
      onSuccess();
    } else {
      setError('Invalid PIN. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-sm">
        <div className="text-center mb-6">
          <Key className="w-12 h-12 text-blue-500 mx-auto mb-2" />
          <h2 className="text-xl font-semibold text-gray-900">Guest Access</h2>
          <p className="text-sm text-gray-600">
            Enter your PIN to access step work
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              PIN
            </label>
            <input
              type="text"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError('');
              }}
              maxLength={4}
              pattern="[0-9]*"
              inputMode="numeric"
              className="w-full text-center text-2xl tracking-widest rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="••••"
              required
            />
          </div>

          {error && (
            <div className="flex items-center text-red-600 text-sm">
              <AlertCircle className="w-4 h-4 mr-2" />
              {error}
            </div>
          )}

          <button type="submit" className="btn w-full">
            Access Step Work
          </button>
        </div>
      </form>
    </div>
  );
};
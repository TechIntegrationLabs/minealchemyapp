import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { PersonalInfo } from '../types';

export const PersonalInfoTab: React.FC = () => {
  const { user } = useAuth();
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    occupation: '',
    location: '',
    emergencyContact: {
      name: '',
      relationship: '',
      phone: ''
    },
    recoveryStartDate: '',
    preferredName: '',
    pronouns: '',
    bio: '',
    supportGroups: [],
    triggers: [],
    copingStrategies: [],
    goals: {
      shortTerm: [],
      longTerm: []
    }
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      if (user) {
        const userDoc = doc(db, 'users', user.uid);
        const userSnap = await userDoc.get();
        if (userSnap.exists()) {
          const data = userSnap.data();
          setPersonalInfo(data.personalInfo || personalInfo);
        }
      }
    };

    fetchPersonalInfo();
  }, [user]);

  const handleInputChange = (field: string, value: string) => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEmergencyContactChange = (field: string, value: string) => {
    setPersonalInfo(prev => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [field]: value
      }
    }));
  };

  const handleArrayInputChange = (field: keyof PersonalInfo, value: string) => {
    const items = value.split(',').map(item => item.trim());
    setPersonalInfo(prev => ({
      ...prev,
      [field]: items
    }));
  };

  const handleGoalsChange = (type: 'shortTerm' | 'longTerm', value: string) => {
    const goals = value.split(',').map(goal => goal.trim());
    setPersonalInfo(prev => ({
      ...prev,
      goals: {
        ...prev.goals,
        [type]: goals
      }
    }));
  };

  const handleSave = async () => {
    if (!user) return;

    setIsSaving(true);
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        personalInfo,
        updatedAt: new Date()
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving personal info:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Edit
          </button>
        ) : (
          <div className="space-x-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              value={personalInfo.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              value={personalInfo.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Preferred Name</label>
            <input
              type="text"
              value={personalInfo.preferredName}
              onChange={(e) => handleInputChange('preferredName', e.target.value)}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Pronouns</label>
            <input
              type="text"
              value={personalInfo.pronouns}
              onChange={(e) => handleInputChange('pronouns', e.target.value)}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              value={personalInfo.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <input
              type="text"
              value={personalInfo.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Occupation</label>
            <input
              type="text"
              value={personalInfo.occupation}
              onChange={(e) => handleInputChange('occupation', e.target.value)}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              value={personalInfo.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Recovery Start Date</label>
            <input
              type="date"
              value={personalInfo.recoveryStartDate}
              onChange={(e) => handleInputChange('recoveryStartDate', e.target.value)}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              value={personalInfo.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              disabled={!isEditing}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Emergency Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={personalInfo.emergencyContact.name}
              onChange={(e) => handleEmergencyContactChange('name', e.target.value)}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Relationship</label>
            <input
              type="text"
              value={personalInfo.emergencyContact.relationship}
              onChange={(e) => handleEmergencyContactChange('relationship', e.target.value)}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              value={personalInfo.emergencyContact.phone}
              onChange={(e) => handleEmergencyContactChange('phone', e.target.value)}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Recovery Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Support Groups (comma-separated)</label>
            <input
              type="text"
              value={personalInfo.supportGroups.join(', ')}
              onChange={(e) => handleArrayInputChange('supportGroups', e.target.value)}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Triggers (comma-separated)</label>
            <input
              type="text"
              value={personalInfo.triggers.join(', ')}
              onChange={(e) => handleArrayInputChange('triggers', e.target.value)}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Coping Strategies (comma-separated)</label>
            <input
              type="text"
              value={personalInfo.copingStrategies.join(', ')}
              onChange={(e) => handleArrayInputChange('copingStrategies', e.target.value)}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Goals</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Short-term Goals (comma-separated)</label>
            <textarea
              value={personalInfo.goals.shortTerm.join(', ')}
              onChange={(e) => handleGoalsChange('shortTerm', e.target.value)}
              disabled={!isEditing}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Long-term Goals (comma-separated)</label>
            <textarea
              value={personalInfo.goals.longTerm.join(', ')}
              onChange={(e) => handleGoalsChange('longTerm', e.target.value)}
              disabled={!isEditing}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

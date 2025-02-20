import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { useUser } from "@clerk/clerk-react";
import { useStore } from '../store/useStore';
import { 
  Bell, 
  Lock, 
  User, 
  Moon,
  Globe, 
  HelpCircle,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { FirestoreTest } from '../components/FirestoreTest';

export const Settings: React.FC = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const { userState, updateSettings } = useStore();

  const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
    if (!userState?.settings) return;
    
    document.documentElement.classList.remove('light', 'dark');
    if (theme !== 'system') {
      document.documentElement.classList.add(theme);
    } else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      }
    }
    
    updateSettings({ theme });
  };

  const handleNotificationChange = (key: keyof typeof userState.settings.notifications) => {
    if (!userState?.settings?.notifications) return;
    updateSettings({
      notifications: {
        ...userState.settings.notifications,
        [key]: !userState.settings.notifications[key],
      },
    });
  };

  const handlePrivacyChange = (key: keyof typeof userState.settings.privacy) => {
    if (!userState?.settings?.privacy) return;
    updateSettings({
      privacy: {
        ...userState.settings.privacy,
        [key]: !userState.settings.privacy[key],
      },
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title="Settings" description="Manage your account preferences and application settings" />

      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <img
                src={user?.imageUrl || `https://ui-avatars.com/api/?name=${user?.fullName || 'User'}`}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-900">{user?.fullName}</h2>
                <p className="text-sm text-gray-500">{user?.primaryEmailAddress?.emailAddress}</p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            <div className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <Moon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">Theme</h3>
                    <p className="text-sm text-gray-500">Choose your preferred theme</p>
                  </div>
                </div>
                <select
                  value={userState?.settings.theme}
                  onChange={(e) => handleThemeChange(e.target.value as 'light' | 'dark' | 'system')}
                  className="rounded-md border-gray-300 text-sm"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>
            </div>

            <div className="p-4 hover:bg-gray-50">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-blue-600" />
                </div>
                <div className="ml-4 flex-grow">
                  <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                  <div className="mt-2 space-y-2">
                    {Object.entries(userState?.settings.notifications || {}).map(([key, value]) => (
                      <label key={key} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={() => handleNotificationChange(key as keyof typeof userState.settings.notifications)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">
                          {key.charAt(0).toUpperCase() + key.slice(1)} notifications
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 hover:bg-gray-50">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-blue-600" />
                </div>
                <div className="ml-4 flex-grow">
                  <h3 className="text-sm font-medium text-gray-900">Privacy</h3>
                  <div className="mt-2 space-y-2">
                    {Object.entries(userState?.settings.privacy || {}).map(([key, value]) => (
                      <label key={key} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={() => handlePrivacyChange(key as keyof typeof userState.settings.privacy)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">
                          Show {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">Language</h3>
                    <p className="text-sm text-gray-500">Change your preferred language</p>
                  </div>
                </div>
                <select
                  value={userState?.settings.language}
                  onChange={(e) => updateSettings({ language: e.target.value })}
                  className="rounded-md border-gray-300 text-sm"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                </select>
              </div>
            </div>

            <div className="p-4 hover:bg-gray-50">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-900">Help & Support</h3>
                  <p className="text-sm text-gray-500">Get help or contact support</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
              </div>
            </div>
          </div>
        </div>

        {/* Add Firestore Test Section */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Database Connection Test
          </h3>
          <FirestoreTest />
        </div>

        <div className="text-center">
          <button
            onClick={() => signOut()}
            className="inline-flex items-center text-sm text-red-600 hover:text-red-700 font-medium"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};
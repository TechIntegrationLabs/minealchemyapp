import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { PersonalInfoTab } from '../components/PersonalInfoTab';
import { 
  Bell, 
  Lock, 
  User, 
  Palette, 
  Globe, 
  HelpCircle,
  ChevronRight,
  Moon,
  X
} from 'lucide-react';
import { useAuth } from '../components/AuthProvider';

type SettingTab = 'overview' | 'personal' | 'notifications' | 'appearance' | 'security' | 'help';

const SettingSection: React.FC<{
  icon: React.ElementType;
  title: string;
  description: string;
  onClick?: () => void;
}> = ({ icon: Icon, title, description, onClick }) => (
  <div 
    className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
    onClick={onClick}
  >
    <div className="flex items-center">
      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
        <Icon className="w-5 h-5 text-blue-600" />
      </div>
      <div className="ml-4">
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
    <ChevronRight className="w-5 h-5 text-gray-400" />
  </div>
);

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingTab>('overview');
  const { user } = useAuth();

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalInfoTab />;
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center">
                  <img
                    src={user?.photoURL || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h2 className="text-lg font-medium text-gray-900">{user?.email}</h2>
                    <p className="text-sm text-gray-500">Free Account</p>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                <SettingSection
                  icon={User}
                  title="Personal Information"
                  description="Update your personal details and preferences"
                  onClick={() => setActiveTab('personal')}
                />
                <SettingSection
                  icon={Bell}
                  title="Notifications"
                  description="Choose what updates you want to receive"
                  onClick={() => setActiveTab('notifications')}
                />
                <SettingSection
                  icon={Palette}
                  title="Appearance"
                  description="Customize the look and feel of the application"
                  onClick={() => setActiveTab('appearance')}
                />
                <SettingSection
                  icon={Lock}
                  title="Security"
                  description="Manage your password and security settings"
                  onClick={() => setActiveTab('security')}
                />
                <SettingSection
                  icon={Globe}
                  title="Language"
                  description="Choose your preferred language"
                />
                <SettingSection
                  icon={HelpCircle}
                  title="Help & Support"
                  description="Get help or contact support"
                  onClick={() => setActiveTab('help')}
                />
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900">Coming Soon</h3>
            <p className="text-sm text-gray-500">This section is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <PageHeader
          title="Settings"
          description="Manage your account preferences and application settings"
        />
        {activeTab !== 'overview' && (
          <button
            onClick={() => setActiveTab('overview')}
            className="flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <X className="w-4 h-4 mr-1" />
            Close
          </button>
        )}
      </div>

      {renderTabContent()}
    </div>
  );
};
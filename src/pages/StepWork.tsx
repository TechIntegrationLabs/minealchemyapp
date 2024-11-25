import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { StepWorkLog } from '../components/stepwork/StepWorkLog';
import { GuestManagement } from '../components/stepwork/GuestManagement';
import { GuestLogin } from '../components/stepwork/GuestLogin';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { Book, Users, Key } from 'lucide-react';

export const StepWork: React.FC = () => {
  const [activeTab, setActiveTab] = useState('log');
  const [isGuest, setIsGuest] = useState(false);

  if (isGuest) {
    return (
      <div className="max-w-7xl mx-auto">
        <PageHeader
          title="Step Work Review"
          description="Review and provide feedback on step work"
        />
        <StepWorkLog />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        title="Step Work"
        description="Track your progress through the 12 steps and manage guest access"
      />

      <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Welcome to Step Work</h2>
        <p className="text-gray-600 mb-4">
          This section helps you work through the 12 steps with guidance and support. You can:
        </p>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-center">
            <Book className="w-5 h-5 mr-2 text-blue-500" />
            Write and track your step work progress
          </li>
          <li className="flex items-center">
            <Users className="w-5 h-5 mr-2 text-green-500" />
            Add sponsors or mentors to review your work
          </li>
          <li className="flex items-center">
            <Key className="w-5 h-5 mr-2 text-purple-500" />
            Access your step work as a guest (for sponsors/mentors)
          </li>
        </ul>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="log">
            <Book className="w-4 h-4 mr-2" />
            Step Work Log
          </TabsTrigger>
          <TabsTrigger value="guests">
            <Users className="w-4 h-4 mr-2" />
            Guest Access
          </TabsTrigger>
          <TabsTrigger value="guest-login">
            <Key className="w-4 h-4 mr-2" />
            Guest Login
          </TabsTrigger>
        </TabsList>

        <TabsContent value="log">
          <StepWorkLog />
        </TabsContent>

        <TabsContent value="guests">
          <GuestManagement />
        </TabsContent>

        <TabsContent value="guest-login">
          <GuestLogin onSuccess={() => setIsGuest(true)} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { MemberCard } from '../components/community/MemberCard';

const mockMembers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    bio: 'On a journey of self-discovery and healing. Passionate about meditation and outdoor activities.',
    interests: ['Meditation', 'Hiking', 'Art Therapy'],
  },
  {
    id: '2',
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    bio: 'Recovery coach and meditation guide. Here to support others on their journey.',
    interests: ['Coaching', 'Mindfulness', 'Yoga'],
  },
  {
    id: '3',
    name: 'Emma Wilson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
    bio: 'Finding strength through community and shared experiences. Love connecting with fellow travelers.',
    interests: ['Group Support', 'Nature', 'Writing'],
  },
];

export const Community: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        title="Community"
        description="Connect with others on similar journeys of healing and growth"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockMembers.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};
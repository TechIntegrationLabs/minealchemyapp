import React from 'react';
import { MessageCircle, UserPlus } from 'lucide-react';

interface Member {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  interests: string[];
}

interface Props {
  member: Member;
}

export const MemberCard: React.FC<Props> = ({ member }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-4">
        <img
          src={member.avatar}
          alt={member.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
          <div className="flex gap-2">
            {member.interests.map((interest) => (
              <span
                key={interest}
                className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
      <div className="flex gap-2">
        <button className="btn-secondary flex-1">
          <MessageCircle className="w-4 h-4 mr-2" />
          Message
        </button>
        <button className="btn flex-1">
          <UserPlus className="w-4 h-4 mr-2" />
          Connect
        </button>
      </div>
    </div>
  );
};
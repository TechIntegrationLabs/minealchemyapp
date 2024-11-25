import React from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

interface Activity {
  id: string;
  title: string;
  type: string;
  date: Date;
  location: string;
  participants: number;
  image: string;
}

interface Props {
  activity: Activity;
}

export const ActivityCard: React.FC<Props> = ({ activity }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <img
        src={activity.image}
        alt={activity.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{activity.title}</h3>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-2" />
            {new Date(activity.date).toLocaleDateString()}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-2" />
            {activity.location}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="w-4 h-4 mr-2" />
            {activity.participants} participants
          </div>
        </div>
        <button className="btn w-full mt-4">Join Activity</button>
      </div>
    </div>
  );
};
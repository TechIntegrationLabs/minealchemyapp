import React from 'react';
import { Clock, Tag, Mic, Edit } from 'lucide-react';
import type { JournalEntry as JournalEntryType } from '../../types';

interface Props {
  entry: JournalEntryType;
}

export const JournalEntry: React.FC<Props> = ({ entry }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {entry.type === 'voice' ? (
            <Mic className="w-5 h-5 text-blue-500 mr-2" />
          ) : (
            <Edit className="w-5 h-5 text-green-500 mr-2" />
          )}
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            {new Date(entry.date).toLocaleDateString()}
          </div>
        </div>
      </div>
      <p className="text-gray-800 mb-4">{entry.content}</p>
      <div className="flex flex-wrap gap-2">
        {entry.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
          >
            <Tag className="w-3 h-3 mr-1" />
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
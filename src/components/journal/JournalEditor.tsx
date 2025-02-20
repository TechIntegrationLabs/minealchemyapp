import React, { useState } from 'react';
import { Tag, Mic, Save, Smile } from 'lucide-react';

interface Props {
  onSave: (content: string, tags: string[]) => void;
}

export const JournalEditor: React.FC<Props> = ({ onSave }) => {
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [mood, setMood] = useState('neutral');

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const handleSave = () => {
    if (content.trim()) {
      onSave(content, tags);
      setContent('');
      setTags([]);
      setMood('neutral');
    }
  };

  const moods = ['happy', 'neutral', 'sad', 'anxious', 'grateful', 'hopeful'];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <textarea
        className="w-full h-32 p-4 mb-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Write your thoughts..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
          >
            <Tag className="w-3 h-3 mr-1" />
            {tag}
            <button
              onClick={() => setTags(tags.filter(t => t !== tag))}
              className="ml-1 hover:text-blue-600"
            >
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          className="flex-1 min-w-[150px] px-3 py-1 border rounded-full text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Add tags (press Enter)"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleAddTag}
        />
      </div>
      <div className="flex items-center mb-4">
        <Smile className="w-4 h-4 mr-2 text-gray-500" />
        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="border rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {moods.map((m) => (
            <option key={m} value={m}>
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <button className="btn-secondary">
          <Mic className="w-4 h-4 mr-2" />
          Record Voice
        </button>
        <button 
          className="btn"
          onClick={handleSave}
          disabled={!content.trim()}
        >
          <Save className="w-4 h-4 mr-2" />
          Save Entry
        </button>
      </div>
    </div>
  );
};
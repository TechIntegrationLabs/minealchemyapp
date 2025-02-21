import React, { useState } from 'react';
import { VoiceRecorder } from './VoiceRecorder';

interface Props {
  onSave: (content: string, tags: string[]) => void;
}

export const JournalEditor: React.FC<Props> = ({ onSave }) => {
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const handleSave = () => {
    if (content.trim()) {
      onSave(content, tags);
      setContent('');
      setTags([]);
      setTagInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTranscriptionComplete = (text: string) => {
    setContent(prevContent => {
      const newContent = prevContent.trim() ? `${prevContent}\n\n${text}` : text;
      return newContent;
    });
  };

  return (
    <div className="mb-8 bg-white rounded-lg shadow p-6">
      <div className="mb-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your journal entry here..."
          className="w-full h-40 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center"
          >
            #{tag}
            <button
              onClick={() => removeTag(tag)}
              className="ml-2 text-blue-600 hover:text-blue-800"
            >
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add tags..."
          className="px-3 py-1 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-between items-center">
        <VoiceRecorder onTranscriptionComplete={handleTranscriptionComplete} />
        
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save Entry
        </button>
      </div>
    </div>
  );
};
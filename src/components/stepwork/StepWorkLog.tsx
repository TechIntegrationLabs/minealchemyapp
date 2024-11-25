import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { format } from 'date-fns';
import { Book, Lock, Eye, MessageSquare, Check, ChevronRight } from 'lucide-react';
import type { StepWork } from '../../types';

export const StepWorkLog: React.FC = () => {
  const { stepWork, addStepWork } = useStore();
  const [selectedStep, setSelectedStep] = useState<number>(1);
  const [content, setContent] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      addStepWork({
        step: selectedStep,
        content: content.trim(),
        status: 'draft',
        isPrivate,
      });
      setContent('');
    }
  };

  const getStepStatus = (work: StepWork) => {
    switch (work.status) {
      case 'submitted':
        return <Eye className="w-5 h-5 text-blue-500" />;
      case 'reviewed':
        return <Check className="w-5 h-5 text-green-500" />;
      default:
        return <Book className="w-5 h-5 text-gray-500" />;
    }
  };

  const stepDescriptions: Record<number, string> = {
    1: "Honesty - We admitted we were powerless over our addiction, that our lives had become unmanageable.",
    2: "Hope - Came to believe that a Power greater than ourselves could restore us to sanity.",
    3: "Faith - Made a decision to turn our will and our lives over to the care of God as we understood Him.",
    4: "Courage - Made a searching and fearless moral inventory of ourselves.",
    5: "Integrity - Admitted to God, to ourselves, and to another human being the exact nature of our wrongs.",
    6: "Willingness - Were entirely ready to have God remove all these defects of character.",
    7: "Humility - Humbly asked Him to remove our shortcomings.",
    8: "Love - Made a list of all persons we had harmed and became willing to make amends to them all.",
    9: "Justice - Made direct amends to such people wherever possible, except when to do so would injure them or others.",
    10: "Perseverance - Continued to take personal inventory and when we were wrong promptly admitted it.",
    11: "Spirituality - Sought through prayer and meditation to improve our conscious contact with God, as we understood Him.",
    12: "Service - Having had a spiritual awakening as the result of these steps, we tried to carry this message to others."
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Getting Started with Step Work</h3>
        <p className="text-blue-800 mb-4">
          Working the steps is a journey of self-discovery and healing. Here's how to begin:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-blue-800">
          <li>Select which step you're currently working on</li>
          <li>Read the step's description and reflect on its meaning</li>
          <li>Write your thoughts, feelings, and experiences honestly</li>
          <li>Choose whether to keep your work private or share it with your sponsor</li>
          <li>Save your work and return to it as needed</li>
        </ol>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-sm">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Step
          </label>
          <select
            value={selectedStep}
            onChange={(e) => setSelectedStep(Number(e.target.value))}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                Step {i + 1}
              </option>
            ))}
          </select>
          <div className="mt-2 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700">{stepDescriptions[selectedStep]}</p>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Step Work
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={6}
            placeholder="Share your thoughts, feelings, and experiences working this step..."
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-600">Keep private</span>
          </label>

          <button type="submit" className="btn">
            Save Step Work
          </button>
        </div>
      </form>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Your Step Work History</h3>
        {stepWork.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <p className="text-gray-600">No step work entries yet. Start your journey by working on Step 1.</p>
          </div>
        ) : (
          stepWork.map((work) => (
            <div
              key={work.id}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  {getStepStatus(work)}
                  <h3 className="text-lg font-medium text-gray-900">
                    Step {work.step}
                  </h3>
                  {work.isPrivate && (
                    <Lock className="w-4 h-4 text-gray-400" />
                  )}
                </div>
                <span className="text-sm text-gray-500">
                  {format(new Date(work.date), 'MMM d, yyyy')}
                </span>
              </div>

              <p className="text-gray-600 mb-4">{work.content}</p>

              {work.feedback.length > 0 && (
                <div className="border-t pt-4 mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Feedback ({work.feedback.length})
                  </h4>
                  <div className="space-y-2">
                    {work.feedback.map((fb) => (
                      <div key={fb.id} className="bg-gray-50 rounded-lg p-3">
                        <p className="text-gray-600 text-sm">{fb.content}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">
                            {fb.isAnonymous ? 'Anonymous' : fb.guestId}
                          </span>
                          <span className="text-xs text-gray-500">
                            {format(new Date(fb.date), 'MMM d, yyyy')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
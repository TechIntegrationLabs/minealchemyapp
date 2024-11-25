import type { Activity } from '../types';

export const defaultActivities: Record<string, Activity[]> = {
  spiritual: [
    {
      id: 'sp1',
      name: 'Meditation Practice',
      type: 'spiritual',
      description: 'Sit quietly and focus on your breath or a mantra to build mindfulness and spiritual clarity.',
      healthBoost: 'Reduces stress, enhances self-awareness.',
      completionCount: 0,
      isDefault: true
    },
    {
      id: 'sp2',
      name: 'Gratitude Journaling',
      type: 'spiritual',
      description: 'Write down three things you\'re grateful for each day to foster positivity.',
      healthBoost: 'Improves emotional resilience and spiritual connection.',
      completionCount: 0,
      isDefault: true
    },
    {
      id: 'sp3',
      name: 'Acts of Service',
      type: 'spiritual',
      description: 'Volunteer for a community project or do something kind for someone else.',
      healthBoost: 'Builds a sense of purpose and fulfillment.',
      completionCount: 0,
      isDefault: true
    },
    {
      id: 'sp4',
      name: 'Spiritual Reading',
      type: 'spiritual',
      description: 'Read inspirational or spiritual texts (e.g., books on recovery, religious/spiritual scriptures).',
      healthBoost: 'Encourages self-reflection and growth.',
      completionCount: 0,
      isDefault: true
    },
    {
      id: 'sp5',
      name: 'Nature Connection Walk',
      type: 'spiritual',
      description: 'Spend time in nature to reflect and connect with something greater than yourself.',
      healthBoost: 'Enhances feelings of serenity and grounding.',
      completionCount: 0,
      isDefault: true
    },
    {
      id: 'sp6',
      name: 'Mindfulness Body Scan',
      type: 'spiritual',
      description: 'A guided exercise where you focus on each part of your body to build awareness and presence.',
      healthBoost: 'Promotes relaxation and a deeper connection to self.',
      completionCount: 0,
      isDefault: true
    }
  ],
  physical: [
    {
      id: 'ph1',
      name: 'Stretching Routine',
      type: 'physical',
      description: 'Spend 10–15 minutes stretching major muscle groups.',
      healthBoost: 'Increases flexibility and reduces physical tension.',
      completionCount: 0,
      isDefault: true
    },
    {
      id: 'ph2',
      name: 'Yoga Session',
      type: 'physical',
      description: 'Follow a yoga sequence that aligns with your fitness level.',
      healthBoost: 'Improves physical strength, balance, and mental clarity.',
      completionCount: 0,
      isDefault: true
    },
    {
      id: 'ph3',
      name: 'Take a Walk or Hike',
      type: 'physical',
      description: 'Walk for 20–30 minutes in your neighborhood or on a nature trail.',
      healthBoost: 'Boosts cardiovascular health and reduces stress.',
      completionCount: 0,
      isDefault: true
    },
    {
      id: 'ph4',
      name: 'Balanced Meal Preparation',
      type: 'physical',
      description: 'Plan and cook a meal that includes proteins, healthy fats, and vegetables.',
      healthBoost: 'Supports energy levels and overall wellness.',
      completionCount: 0,
      isDefault: true
    },
    {
      id: 'ph5',
      name: 'Hydration Check-In',
      type: 'physical',
      description: 'Track your water intake and aim for at least 8 glasses daily.',
      healthBoost: 'Maintains energy and improves body function.',
      completionCount: 0,
      isDefault: true
    },
    {
      id: 'ph6',
      name: 'Daily Workout',
      type: 'physical',
      description: 'Do 20–30 minutes of moderate exercise, such as bodyweight exercises or jogging.',
      healthBoost: 'Strengthens muscles and improves cardiovascular health.',
      completionCount: 0,
      isDefault: true
    }
  ],
  social: [
    {
      id: 'so1',
      name: 'Call or Text a Friend',
      type: 'social',
      description: 'Reach out to someone to check in or share how you\'re doing.',
      healthBoost: 'Strengthens social bonds and reduces isolation.',
      completionCount: 0,
      isDefault: true
    },
    {
      id: 'so2',
      name: 'Plan a Social Activity',
      type: 'social',
      description: 'Arrange a lunch, coffee, or activity with a friend or family member.',
      healthBoost: 'Builds positive interactions and creates shared experiences.',
      completionCount: 0,
      isDefault: true
    },
    {
      id: 'so3',
      name: 'Attend a Support Group',
      type: 'social',
      description: 'Join a recovery meeting or group to connect with others on similar journeys.',
      healthBoost: 'Builds a sense of community and shared support.',
      completionCount: 0,
      isDefault: true
    },
    {
      id: 'so4',
      name: 'Compliment Someone',
      type: 'social',
      description: 'Give a sincere compliment to a stranger, friend, or coworker.',
      healthBoost: 'Fosters positive connections and spreads goodwill.',
      completionCount: 0,
      isDefault: true
    },
    {
      id: 'so5',
      name: 'Write a Letter to Someone',
      type: 'social',
      description: 'Send a note or email expressing gratitude or sharing positive memories.',
      healthBoost: 'Enhances relationships and reduces feelings of disconnection.',
      completionCount: 0,
      isDefault: true
    },
    {
      id: 'so6',
      name: 'Strike Up a Conversation',
      type: 'social',
      description: 'Engage in small talk with someone new (e.g., barista, neighbor).',
      healthBoost: 'Builds social confidence and reduces loneliness.',
      completionCount: 0,
      isDefault: true
    }
  ],
  mental: [
    {
      id: 'me1',
      name: 'Journal Your Thoughts',
      type: 'mental',
      description: 'Write down what\'s on your mind or how you\'re feeling today.',
      healthBoost: 'Provides clarity and emotional release.',
      completionCount: 0,
      isDefault: true
    },
    {
      id: 'me2',
      name: 'Deep Breathing Exercises',
      type: 'mental',
      description: 'Practice slow, intentional breathing for 5 minutes.',
      healthBoost: 'Reduces anxiety and improves focus.',
      completionCount: 0,
      isDefault: true
    },
    {
      id: 'me3',
      name: 'Therapy Session Check-In',
      type: 'mental',
      description: 'Reflect on key insights or progress made during therapy sessions.',
      healthBoost: 'Reinforces therapeutic growth and self-awareness.',
      completionCount: 0,
      isDefault: true
    },
    {
      id: 'me4',
      name: 'Creative Expression',
      type: 'mental',
      description: 'Spend time drawing, painting, writing, or playing music.',
      healthBoost: 'Encourages emotional expression and relaxation.',
      completionCount: 0,
      isDefault: true
    },
    {
      id: 'me5',
      name: 'Read a Book',
      type: 'mental',
      description: 'Read a chapter of a book for pleasure or self-improvement.',
      healthBoost: 'Reduces stress and stimulates the mind.',
      completionCount: 0,
      isDefault: true
    },
    {
      id: 'me6',
      name: 'Make Amends',
      type: 'mental',
      description: 'Identify someone you may have hurt and reach out to make amends (as appropriate).',
      healthBoost: 'Promotes emotional healing and closure.',
      completionCount: 0,
      isDefault: true
    }
  ]
};
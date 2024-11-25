import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { ActivityCard } from '../components/activities/ActivityCard';
import { useStore } from '../store/useStore';
import { ScheduleModal } from '../components/activities/ScheduleModal';
import { TrackerModal } from '../components/activities/TrackerModal';
import { NutritionModal } from '../components/activities/NutritionModal';

const mockActivities = [
  {
    id: '1',
    title: 'Mountain Hiking - Wellness Trail',
    type: 'physical',
    date: new Date('2024-03-15'),
    location: 'Blue Ridge Mountains',
    participants: 8,
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: '2',
    title: 'Group Meditation Session',
    type: 'spiritual',
    date: new Date('2024-03-16'),
    location: 'Serenity Garden',
    participants: 12,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: '3',
    title: 'Art Therapy Workshop',
    type: 'mental',
    date: new Date('2024-03-17'),
    location: 'Creative Space',
    participants: 6,
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=1200',
  },
];

export const Activities: React.FC = () => {
  const location = useLocation();
  const { setActivityModal } = useStore();
  const { activities } = useStore();

  useEffect(() => {
    const state = location.state as { openScheduler?: boolean; openTracker?: boolean; openNutrition?: boolean } | null;
    if (state?.openScheduler) setActivityModal('showScheduler', true);
    if (state?.openTracker) setActivityModal('showTracker', true);
    if (state?.openNutrition) setActivityModal('showNutrition', true);
  }, [location.state, setActivityModal]);

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        title="Activities"
        description="Join group activities to support your recovery journey"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockActivities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>

      {activities.showScheduler && <ScheduleModal />}
      {activities.showTracker && <TrackerModal />}
      {activities.showNutrition && <NutritionModal />}
    </div>
  );
};
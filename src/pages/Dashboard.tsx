import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { DashboardCard } from '../components/DashboardCard';
import { ActivityList } from '../components/activities/ActivityList';
import { AddActivityModal } from '../components/activities/AddActivityModal';
import { Philosophy } from '../components/Philosophy';
import { HealthBars } from '../components/HealthBars';
import type { HealthMetric } from '../types';

export const Dashboard: React.FC = () => {
  const { activities, setActivityModal } = useStore();
  const [selectedMetric, setSelectedMetric] = useState<keyof HealthMetric>('mental');
  
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <DashboardCard title="Activities">
          <ActivityList 
            metricType={selectedMetric}
            onAddActivity={() => setActivityModal('showAddActivity', true)}
          />
        </DashboardCard>
      </div>

      <div className="space-y-6">
        <DashboardCard title="Health Metrics">
          <HealthBars 
            metrics={{
              mental: 75,
              spiritual: 60,
              physical: 80,
              social: 65
            }}
            onMetricSelect={setSelectedMetric}
            selectedMetric={selectedMetric}
          />
        </DashboardCard>
        <DashboardCard title="Philosophy">
          <Philosophy />
        </DashboardCard>
      </div>

      {activities.showAddActivity && (
        <AddActivityModal 
          metricType={selectedMetric}
          onClose={() => setActivityModal('showAddActivity', false)}
        />
      )}
    </div>
  );
};
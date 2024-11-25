import React from 'react';
import type { ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
  className?: string;
}

export const DashboardCard: React.FC<Props> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
      <h3 className="text-lg font-semibold text-gray-800 p-4 border-b border-gray-100">
        {title}
      </h3>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};
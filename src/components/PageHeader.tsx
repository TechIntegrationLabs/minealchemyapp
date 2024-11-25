import React from 'react';

interface Props {
  title: string;
  description: string;
}

export const PageHeader: React.FC<Props> = ({ title, description }) => {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      <p className="text-gray-600 mt-2">{description}</p>
    </header>
  );
};
import React from 'react';
import './WidgetCard.css';

interface WidgetCardProps {
  children: React.ReactNode;
  className?: string;
}

export const WidgetCard: React.FC<WidgetCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`om-widget-card ${className}`}>
      {children}
    </div>
  );
};

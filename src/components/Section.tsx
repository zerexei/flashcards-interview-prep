import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({ children, id, className = '' }) => {
  return (
    <section id={id} className={`w-full px-6 py-20 mx-auto ${className}`}>
      {children}
    </section>
  );
};

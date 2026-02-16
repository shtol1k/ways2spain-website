import React from 'react';

interface CategoryTagProps {
  children: React.ReactNode;
  className?: string; // Allow overriding styles
}

export const CategoryTag = ({ children, className = '' }: CategoryTagProps) => {
  return (
    <div
      className={`
        inline-flex items-center justify-center rounded-full border border-orange-500 text-orange-500 font-medium px-3
        h-6 text-xs
        md:h-8 md:text-sm
        ${className}
      `}
    >
      {children}
    </div>
  );
};

import React from 'react';
import { cn } from '@/lib/utils';

interface CategoryTagProps {
  children: React.ReactNode;
  className?: string;
}

export const CategoryTag = ({ children, className }: CategoryTagProps) => {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center h-6 px-2 rounded-full',
        'border border-(--color-border-brand)',
        'text-body-small color-content-brand',
        'whitespace-nowrap shrink-0',
        className
      )}
    >
      {children}
    </div>
  );
};

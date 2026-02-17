import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cn } from '@/lib/utils';
import { iconsRegistry } from './registry';
import { IconProps, IconSize } from './types';

// Container size mapping (Tailwind classes) to enforce specific boundary boxes
// FA icons are scalable, but we wrap them to maintain layout stability
const containerSizes: Record<IconSize, string> = {
  sm: 'w-4 h-4 text-xs', // 16px
  md: 'w-5 h-5 text-sm', // 20px
  lg: 'w-6 h-6 text-base', // 24px
  xl: 'w-8 h-8 text-xl', // 32px
  responsive: '', // No fixed size classes, relies on className
};

export const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 'md', 
  className, 
  spin,
  rotation,
  ...props 
}) => {
  const iconDefinition = iconsRegistry[name];

  if (!iconDefinition) {
     if (process.env.NODE_ENV === 'development') {
        console.warn(`Icon "${name}" not found in registry.`);
     }
     return null;
  }

  return (
    <div 
      className={cn(
        "inline-flex items-center justify-center shrink-0 leading-none", 
        // Only apply containerSizes if it's not 'responsive', or let className override it if needed
        containerSizes[size], 
        className
      )}
      aria-hidden="true"
      {...props}
    >
      <FontAwesomeIcon icon={iconDefinition} className="w-full h-full" spin={spin} rotation={rotation} />
    </div>
  );
};

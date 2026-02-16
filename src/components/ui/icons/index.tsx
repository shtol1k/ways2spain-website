import React from 'react';
import { cn } from '@/lib/utils';
import { iconsRegistry } from './registry';
import { IconProps, IconSize } from './types';

// Container size mapping (Tailwind classes)
const containerSizes: Record<IconSize, string> = {
  md: 'w-5 h-5', // 20px
  lg: 'w-6 h-6', // 24px
};

export const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 'md', 
  className, 
  ...props 
}) => {
  const registryEntry = iconsRegistry[name];

  if (!registryEntry) {
     if (process.env.NODE_ENV === 'development') {
        console.warn(`Icon "${name}" not found in registry.`);
     }
     return null;
  }

  // Type guard: Check if it's a size-specific configuration object
  // Lucide icons are functions. Size maps are objects.
  const isSizeMap = typeof registryEntry === 'object' && registryEntry !== null && ('md' in registryEntry || 'lg' in registryEntry);

  let IconComponent;

  if (isSizeMap) {
     // Start with desired size, fallback to other size
     // @ts-ignore - TS guarantees existence if isSizeMap is true
     IconComponent = registryEntry[size] || registryEntry[size === 'md' ? 'lg' : 'md'];
  } else {
     IconComponent = registryEntry;
  }

  if (!IconComponent) return null;

  const Component = IconComponent as React.ElementType;

  return (
    <div 
      className={cn(
        "inline-flex items-center justify-center shrink-0", 
        containerSizes[size], 
        className
      )}
      aria-hidden="true"
    >
      <Component 
        className="w-full h-full" 
        {...props} 
      />
    </div>
  );
};

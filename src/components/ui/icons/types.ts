import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { iconsRegistry, IconName } from './registry';

export type { IconName };
export type IconSize = 'sm' | 'md' | 'lg' | 'xl' | 'responsive'; // Added responsive option

export interface IconProps {
  name: IconName;
  size?: IconSize; // Defaults to 'md' if not specified
  className?: string; // Additional classes for color, margin, etc.
  spin?: boolean; // FA support
  rotation?: 90 | 180 | 270; // FA support
}

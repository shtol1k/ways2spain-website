import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { iconsRegistry, IconName } from './registry';

export type { IconName };
export type IconSize = 'sm' | 'md' | 'lg' | 'xl'; // Added more sizes if needed, keeping md/lg as primary

export interface IconProps {
  name: IconName;
  size?: IconSize;
  className?: string; // Additional classes for color, margin, etc.
  spin?: boolean; // FA support
  rotation?: 90 | 180 | 270; // FA support
}

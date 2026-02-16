import { LucideProps } from 'lucide-react';
import { iconsRegistry } from './registry';

// Size definitions for consistent usage
export type IconSize = 'md' | 'lg';

// Valid icon names are derived from the registry keys
export type IconName = keyof typeof iconsRegistry;

// Props extend LucideProps but override size and add name
export interface IconProps extends Omit<LucideProps, 'size'> {
  name: IconName;
  size?: IconSize;
}

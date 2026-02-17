import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { 
  faCalendar,
  faClock,
  faUser,
  faArrowRight,
  faGrip, // menu/layout-grid
  faXmark, // close/x
  faInfoCircle,
  faCheckCircle,
  faExclamationCircle, // warning/error
  faShareNodes // share
} from '@fortawesome/pro-regular-svg-icons'; // Using Regular as base style

// Define a type for the registry that maps our internal names to FA icons
export type IconName = 
  | 'calendar' 
  | 'clock' 
  | 'user' 
  | 'arrowRight' 
  | 'menu' 
  | 'close' 
  | 'info' 
  | 'success' 
  | 'error' 
  | 'warning'
  | 'share';

export const iconsRegistry: Record<IconName, IconDefinition> = {
  // Mapping internal names to Font Awesome icons
  calendar: faCalendar,
  clock: faClock,
  user: faUser,
  arrowRight: faArrowRight,
  menu: faGrip,
  close: faXmark,
  info: faInfoCircle,
  success: faCheckCircle,
  error: faExclamationCircle,
  warning: faExclamationCircle,
  share: faShareNodes
};

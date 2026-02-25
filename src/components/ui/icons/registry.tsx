import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faCalendar,
  faClock,
  faUser,
  faArrowRight,
  faAngleRight,
  faGrip, // menu/layout-grid
  faXmark, // close/x
  faInfoCircle,
  faCheckCircle,
  faExclamationCircle, // warning/error
  faShareNodes, // share
  faCookieBite // cookie consent
} from '@fortawesome/pro-regular-svg-icons'; // Using Regular as base style
import {
  faTelegram,
  faInstagram,
  faFacebook,
  faXTwitter,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';

// Define a type for the registry that maps our internal names to FA icons
export type IconName =
  | 'calendar'
  | 'clock'
  | 'user'
  | 'arrowRight'
  | 'angleRight'
  | 'menu'
  | 'close'
  | 'xmark'
  | 'info'
  | 'success'
  | 'circleCheck'
  | 'error'
  | 'warning'
  | 'share'
  | 'cookieBite'
  | 'telegram'
  | 'instagram'
  | 'facebook'
  | 'xTwitter'
  | 'linkedin';

export const iconsRegistry: Record<IconName, IconDefinition> = {
  // Mapping internal names to Font Awesome icons
  calendar: faCalendar,
  clock: faClock,
  user: faUser,
  arrowRight: faArrowRight,
  angleRight: faAngleRight,
  menu: faGrip,
  close: faXmark,
  xmark: faXmark,
  info: faInfoCircle,
  success: faCheckCircle,
  circleCheck: faCheckCircle,
  error: faExclamationCircle,
  warning: faExclamationCircle,
  share: faShareNodes,
  cookieBite: faCookieBite,
  // Social / brand icons
  telegram: faTelegram,
  instagram: faInstagram,
  facebook: faFacebook,
  xTwitter: faXTwitter,
  linkedin: faLinkedin,
};

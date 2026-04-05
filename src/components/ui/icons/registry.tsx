import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faCalendar,
  faClock,
  faUser,
  faArrowRight,
  faAngleRight,
  faAngleDown,
  faGrip, // menu/layout-grid
  faXmark, // close/x
  faInfoCircle,
  faCheckCircle,
  faExclamationCircle, // warning/error
  faShareNodes, // share
  faLink, // copy link
  faCheck, // copied confirmation
  faCookieBite, // cookie consent
  faCube, // guide summary: format
  faWallet, // guide summary: costs
  faClipboardList, // guide summary: requirements
} from '@fortawesome/pro-regular-svg-icons'; // Using Regular as base style
import {
  faCheckCircle as faCheckCircleSolid,
  faCircleInfo as faCircleInfoSolid,
  faCircleExclamation as faCircleExclamationSolid,
  faTriangleExclamation as faTriangleExclamationSolid,
} from '@fortawesome/pro-solid-svg-icons';
import {
  faTelegram,
  faWhatsapp,
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
  | 'angleDown'
  | 'menu'
  | 'close'
  | 'xmark'
  | 'info'
  | 'success'
  | 'circleCheck'
  | 'circleCheckSolid'
  | 'error'
  | 'warning'
  | 'share'
  | 'link'
  | 'check'
  | 'cookieBite'
  | 'cube'
  | 'wallet'
  | 'clipboardList'
  | 'telegram'
  | 'whatsapp'
  | 'instagram'
  | 'facebook'
  | 'xTwitter'
  | 'linkedin'
  | 'circleInfoSolid'
  | 'circleExclamationSolid'
  | 'triangleExclamationSolid';

export const iconsRegistry: Record<IconName, IconDefinition> = {
  // Mapping internal names to Font Awesome icons
  calendar: faCalendar,
  clock: faClock,
  user: faUser,
  arrowRight: faArrowRight,
  angleRight: faAngleRight,
  angleDown: faAngleDown,
  menu: faGrip,
  close: faXmark,
  xmark: faXmark,
  info: faInfoCircle,
  success: faCheckCircle,
  circleCheck: faCheckCircle,
  circleCheckSolid: faCheckCircleSolid,
  error: faExclamationCircle,
  warning: faExclamationCircle,
  share: faShareNodes,
  link: faLink,
  check: faCheck,
  cookieBite: faCookieBite,
  cube: faCube,
  wallet: faWallet,
  clipboardList: faClipboardList,
  circleInfoSolid: faCircleInfoSolid,
  circleExclamationSolid: faCircleExclamationSolid,
  triangleExclamationSolid: faTriangleExclamationSolid,
  // Social / brand icons
  telegram: faTelegram,
  whatsapp: faWhatsapp,
  instagram: faInstagram,
  facebook: faFacebook,
  xTwitter: faXTwitter,
  linkedin: faLinkedin,
};

import { Calendar, User, ArrowRight, LayoutGrid, AlertCircle, CheckCircle, Info, X } from 'lucide-react';
import { CalendarMd } from './custom/calendar/CalendarMd';
import { CalendarLg } from './custom/calendar/CalendarLg';
import { ClockMd } from './custom/clock/ClockMd';
import { ClockLg } from './custom/clock/ClockLg';

export const iconsRegistry = {
  // Common UI icons (Lucide defaults)
  // 'calendar' overridden below with custom implementation
  user: User, 
  arrowRight: ArrowRight,
  menu: LayoutGrid,
  close: X,
  info: Info,
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertCircle,

  // Custom Icons
  calendar: {
    md: CalendarMd,
    lg: CalendarLg
  },
  clock: {
    md: ClockMd,
    lg: ClockLg
  }
};

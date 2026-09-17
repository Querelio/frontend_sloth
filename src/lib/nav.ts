import {
  FiBookOpen,
  FiBriefcase,
  FiCalendar,
  FiClock,
  FiFileText,
} from 'react-icons/fi'
import { ROUTES } from './routes'

export const navItems = [
  {
    to: ROUTES.AGENDA,
    labelKey: 'nav.agenda',
    icon: FiClock,
  },
  {
    to: ROUTES.INSTITUTIONS,
    labelKey: 'nav.institutions',
    icon: FiBriefcase,
  },
  {
    to: ROUTES.CLASSES,
    labelKey: 'nav.classes',
    icon: FiBookOpen,
  },
  {
    to: ROUTES.CONTRACTS,
    labelKey: 'nav.contracts',
    icon: FiFileText,
  },
  {
    to: ROUTES.SESSIONS,
    labelKey: 'nav.sessions',
    icon: FiCalendar,
  },
] as const

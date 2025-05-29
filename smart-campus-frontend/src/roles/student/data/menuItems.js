import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EventIcon from '@mui/icons-material/Event';
import HelpIcon from '@mui/icons-material/Help';
import ScheduleIcon from '@mui/icons-material/Schedule';
import GradeIcon from '@mui/icons-material/Grade';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PaymentsIcon from '@mui/icons-material/Payments';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import MailIcon from '@mui/icons-material/Mail';

const menuItems = [
  {
    label: 'Academics',
    icon: <SchoolIcon />,
    subItems: [
      { label: 'Courses', route: '/student/academics/courses', icon: <MenuBookIcon /> },
      { label: 'Time Table', route: '/student/academics/timetable', icon: <ScheduleIcon /> },
      { label: 'Results', route: '/student/academics/results', icon: <GradeIcon /> },
      { label: 'Assignments', route: '/student/academics/assignments', icon: <AssignmentIcon /> },
    ],
  },
  {
    label: 'Resources',
    icon: <SchoolIcon />,
    subItems: [
      { label: 'IT Lab', route: '/student/resources/it-lab', icon: <MenuBookIcon /> },
      { label: 'Library', route: '/student/resources/library', icon: <SchoolIcon /> },
      { label: 'Canteen', route: '/student/resources/canteen', icon: <EventIcon /> },
      { label: 'Health Complex', route: '/student/resources/health-complex', icon: <HelpIcon /> },
      { label: 'Sports Complex', route: '/student/resources/sports-complex', icon: <EventIcon /> },
    ],
  },
  {
    label: 'Finances',
    icon: <BarChartIcon />,
    subItems: [
      { label: 'Personal Accounts', route: '/student/finances/personal-accounts', icon: <PaymentsIcon /> },
      { label: 'Fees Payment', route: '/student/finances/fees-payment', icon: <PaymentsIcon /> },
    ],
  },
  {
    label: 'Socials',
    icon: <PeopleIcon />,
    subItems: [
      { label: 'Message', route: '/student/socials/message', icon: <MailIcon /> },
      { label: 'Market', route: '/student/socials/market', icon: <PeopleIcon /> },
      { label: 'Community', route: '/student/socials/community', icon: <PeopleIcon /> },
    ],
  },
  {
    label: 'Settings',
    icon: <SettingsIcon />,
    subItems: [
      { label: 'Theme Setting', route: '/student/settings/theme', icon: <SettingsIcon /> },
      { label: 'Font Setting', route: '/student/settings/font', icon: <SettingsIcon /> },
    ],
  },
];

export default menuItems;

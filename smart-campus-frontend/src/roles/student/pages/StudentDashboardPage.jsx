// // src/roles/student/pages/StudentDashboardPage.jsx
// import React from 'react';
// import {
//   Box, Typography, Grid, Card, CardActionArea, Container, Avatar, useTheme
// } from '@mui/material';
// import { motion } from 'framer-motion';
// import {
//   MenuBook as MenuBookIcon, Schedule as ScheduleIcon, Grade as GradeIcon,
//   Assignment as AssignmentIcon, School as SchoolIcon, Event as EventIcon,
//   Help as HelpIcon
// } from '@mui/icons-material';
// import {
//   ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip as RechartTooltip,
//   PieChart, Pie, Cell
// } from 'recharts';
// import { useNavigate } from 'react-router-dom';

// import { useAuth } from '../../../common/context/AuthContext';
// import StudentLayout from '../components/StudentLayout';

// const COLORS = ['#4caf50', '#f44336'];

// const sidebarSections = [
//   {
//     title: 'Academics',
//     items: [
//       { label: 'Courses', icon: <MenuBookIcon fontSize="large" />, link: 'courses' },
//       { label: 'Timetable', icon: <ScheduleIcon fontSize="large" />, link: 'timetable' },
//       { label: 'Results', icon: <GradeIcon fontSize="large" />, link: 'results' },
//       { label: 'Assignments', icon: <AssignmentIcon fontSize="large" />, link: 'assignments' },
//     ],
//   },
//   {
//     title: 'Resources',
//     items: [
//       { label: 'Library', icon: <SchoolIcon fontSize="large" />, link: 'library' },
//       { label: 'IT Lab', icon: <MenuBookIcon fontSize="large" />, link: 'it-lab' },
//       { label: 'Canteen', icon: <EventIcon fontSize="large" />, link: 'canteen' },
//       { label: 'Health Complex', icon: <HelpIcon fontSize="large" />, link: 'health-complex' },
//       { label: 'Sports Complex', icon: <EventIcon fontSize="large" />, link: 'sports-complex' },
//     ],
//   }
// ];

// const stats = [
//   { title: 'Courses', value: 6 },
//   { title: 'Assignments', value: 2 },
//   { title: 'GPA', value: '3.7' },
//   { title: 'Messages', value: 4 },
// ];

// const gpaData = [
//   { semester: 'Sem 1', gpa: 3.5 },
//   { semester: 'Sem 2', gpa: 3.6 },
//   { semester: 'Sem 3', gpa: 3.7 },
//   { semester: 'Sem 4', gpa: 3.7 },
// ];

// const assignmentData = [
//   { name: 'Done', value: 8 },
//   { name: 'Pending', value: 2 }
// ];

// const StudentDashboardPage = ({ toggleColorMode }) => {
//   const { user } = useAuth();
//   const theme = useTheme();
//   const navigate = useNavigate();

//   return (
//     <StudentLayout sidebarSections={sidebarSections} toggleColorMode={toggleColorMode}>
//       <Container maxWidth="lg" sx={{ pt: 4, pb: 6 }}>

//         <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
//           <Box display="flex" alignItems="center" mb={5}>
//             <Avatar sx={{ width: 64, height: 64, mr: 3, bgcolor: 'primary.main', fontSize: 28 }}>
//               {user?.username?.[0]?.toUpperCase() || 'S'}
//             </Avatar>
//             <Box>
//               <Typography variant="h4" fontWeight={600} gutterBottom>
//                 Welcome, {user?.username}
//               </Typography>
//               <Typography variant="subtitle2" color="text.secondary">
//                 {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
//               </Typography>
//             </Box>
//           </Box>
//         </motion.div>

//         <Grid container spacing={3} mb={5}>
//           {stats.map((s, i) => (
//             <Grid item xs={12} sm={6} md={3} key={i}>
//               <motion.div whileHover={{ scale: 1.05 }}>
//                 <Card sx={{ p: 3, textAlign: 'center', borderRadius: 3, backgroundColor: theme.palette.background.paper, boxShadow: 4 }}>
//                   <Typography variant="h4" color="primary" fontWeight={700}>{s.value}</Typography>
//                   <Typography variant="body2" color="text.secondary">{s.title}</Typography>
//                 </Card>
//               </motion.div>
//             </Grid>
//           ))}
//         </Grid>

//         <Grid container spacing={4} mb={6}>
//           <Grid item xs={12} md={6}>
//             <Card sx={{ p: 3, borderRadius: 3, boxShadow: 4 }}>
//               <Typography variant="h6" fontWeight={600} mb={2}>Academic Progress</Typography>
//               <ResponsiveContainer width="100%" height={200}>
//                 <LineChart data={gpaData}>
//                   <XAxis dataKey="semester" tick={{ fill: theme.palette.text.secondary }} />
//                   <YAxis domain={[3.0, 4.0]} tick={{ fill: theme.palette.text.secondary }} />
//                   <RechartTooltip />
//                   <Line type="monotone" dataKey="gpa" stroke={theme.palette.primary.main} strokeWidth={2} />
//                 </LineChart>
//               </ResponsiveContainer>
//             </Card>
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Card sx={{ p: 3, borderRadius: 3, boxShadow: 4 }}>
//               <Typography variant="h6" fontWeight={600} mb={2}>Assignment Status</Typography>
//               <ResponsiveContainer width="100%" height={200}>
//                 <PieChart>
//                   <Pie data={assignmentData} outerRadius={70} dataKey="value" label>
//                     {assignmentData.map((entry, idx) => (
//                       <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <RechartTooltip />
//                 </PieChart>
//               </ResponsiveContainer>
//             </Card>
//           </Grid>
//         </Grid>

//         <Typography variant="h5" fontWeight={600} gutterBottom>Student Tools</Typography>
//         <Grid container spacing={3}>
//           {sidebarSections.flatMap(s => s.items).map((item, i) => (
//             <Grid item xs={6} sm={4} md={3} key={i}>
//               <motion.div whileHover={{ scale: 1.05 }}>
//                 <CardActionArea
//                   onClick={() => navigate(item.link)}
//                   sx={{ p: 3, textAlign: 'center', borderRadius: 3, boxShadow: 3, bgcolor: 'background.paper', transition: '0.3s' }}
//                 >
//                   <Box display="flex" justifyContent="center" mb={1}>{item.icon}</Box>
//                   <Typography variant="subtitle1" fontWeight={500}>{item.label}</Typography>
//                 </CardActionArea>
//               </motion.div>
//             </Grid>
//           ))}
//         </Grid>

//       </Container>
//     </StudentLayout>
//   );
// };

// export default StudentDashboardPage;


// src/roles/student/pages/StudentDashboardPage.jsx
import React from 'react';
import {
  Box, Typography, Grid, Card, CardActionArea, Container, Avatar
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  MenuBook, Schedule, Grade, Assignment, School, Event, Help
} from '@mui/icons-material';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip as RechartTooltip,
  PieChart, Pie, Cell
} from 'recharts';

import { useAuth } from '../../../common/context/AuthContext';
import StudentLayout from '../components/StudentLayout';

const COLORS = ['#4caf50', '#f44336'];

const sidebarSections = [
  {
    title: 'Academics',
    items: [
      { label: 'Courses', icon: <MenuBook />, link: 'courses' },
      { label: 'Timetable', icon: <Schedule />, link: 'timetable' },
      { label: 'Results', icon: <Grade />, link: 'results' },
      { label: 'Assignments', icon: <Assignment />, link: 'assignments' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'Library', icon: <School />, link: 'library' },
      { label: 'IT Lab', icon: <MenuBook />, link: 'it-lab' },
      { label: 'Canteen', icon: <Event />, link: 'canteen' },
      { label: 'Health Complex', icon: <Help />, link: 'health-complex' },
      { label: 'Sports Complex', icon: <Event />, link: 'sports-complex' },
    ],
  }
];

const stats = [
  { title: 'Courses', value: 6 },
  { title: 'Assignments', value: 2 },
  { title: 'GPA', value: '3.7' },
  { title: 'Messages', value: 4 },
];

const gpaData = [
  { semester: 'Sem 1', gpa: 3.5 },
  { semester: 'Sem 2', gpa: 3.6 },
  { semester: 'Sem 3', gpa: 3.7 },
  { semester: 'Sem 4', gpa: 3.7 },
];

const assignmentData = [
  { name: 'Done', value: 8 },
  { name: 'Pending', value: 2 }
];

const StudentDashboardPage = ({ toggleColorMode }) => {
  const { user } = useAuth();

  return (
    <StudentLayout sidebarSections={sidebarSections} toggleColorMode={toggleColorMode}>
      <Container maxWidth="lg" sx={{ mt: 10, pb: 6 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box display="flex" alignItems="center" mb={4}>
            <Avatar sx={{ width: 64, height: 64, mr: 2, bgcolor: 'primary.main' }}>
              {user?.username?.[0]?.toUpperCase() || 'S'}
            </Avatar>
            <Box>
              <Typography variant="h4" fontWeight={600}>
                Welcome, {user?.username}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {new Date().toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
        </motion.div>

        <Grid container spacing={3} mb={4}>
          {stats.map((stat, i) => (
            <Grid item xs={6} sm={3} key={i}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    borderRadius: 3,
                    boxShadow: 4,
                    backgroundColor: 'white'
                  }}
                >
                  <Typography variant="h5" color="primary">
                    {stat.value}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {stat.title}
                  </Typography>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={4} mb={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3, borderRadius: 3, boxShadow: 4 }}>
              <Typography variant="h6" gutterBottom>
                Academic Progress
              </Typography>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={gpaData}>
                  <XAxis dataKey="semester" />
                  <YAxis domain={[3, 4]} />
                  <RechartTooltip />
                  <Line type="monotone" dataKey="gpa" stroke="#1976d2" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3, borderRadius: 3, boxShadow: 4 }}>
              <Typography variant="h6" gutterBottom>
                Assignment Status
              </Typography>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={assignmentData} outerRadius={70} dataKey="value" label>
                    {assignmentData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartTooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
        </Grid>

        <Typography variant="h5" fontWeight={600} mb={2}>
          Student Tools
        </Typography>
        <Grid container spacing={2}>
          {sidebarSections.flatMap(s => s.items).map((item, i) => (
            <Grid item xs={6} sm={4} md={3} key={i}>
              <motion.div whileHover={{ y: -4 }}>
                <CardActionArea
                  onClick={() => console.log(`Navigate to ${item.link}`)}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    borderRadius: 3,
                    boxShadow: 3,
                    backgroundColor: '#fff'
                  }}
                >
                  <Box sx={{ fontSize: 40, color: 'primary.main' }}>{item.icon}</Box>
                  <Typography mt={1} variant="subtitle1">
                    {item.label}
                  </Typography>
                </CardActionArea>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </StudentLayout>
  );
};

export default StudentDashboardPage;

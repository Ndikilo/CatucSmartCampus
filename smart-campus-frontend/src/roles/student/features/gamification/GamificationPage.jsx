import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Avatar, 
  LinearProgress, 
  Badge, 
  Tabs, 
  Tab, 
  Card, 
  CardContent, 
  CardActionArea,
  Chip,
  Divider,
  useMediaQuery,
  useTheme,
  IconButton,
  Tooltip,
} from '@mui/material';
import { 
  EmojiEvents as TrophyIcon, 
  Star as StarIcon, 
  LocalFireDepartment as FlameIcon,
  TrendingUp as TrendingUpIcon,
  MilitaryTech as BadgeIcon,
  Redeem as GiftIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { useSnackbar } from 'notistack';

// Mock data
const mockUserStats = {
  points: 1250,
  level: 7,
  levelProgress: 65,
  nextLevelPoints: 300,
  currentStreak: 5,
  rank: 42,
  totalStudents: 256,
};

const mockAchievements = [
  { id: 1, title: 'First Assignment', description: 'Complete your first assignment', icon: '1st', earned: true, date: '2024-05-10', points: 50 },
  { id: 2, title: 'Perfect Week', description: 'Log in 7 days in a row', icon: '7d', earned: true, date: '2024-05-15', points: 100 },
  { id: 3, title: 'Quiz Master', description: 'Score 90% or higher on 5 quizzes', icon: 'QM', progress: 3, target: 5, points: 200 },
  { id: 4, title: 'Discussion Leader', description: 'Start 10 discussions', icon: 'DL', progress: 2, target: 10, points: 150 },
  { id: 5, title: 'Early Bird', description: 'Submit 5 assignments before the due date', icon: 'EB', progress: 1, target: 5, points: 100 },
  { id: 6, title: 'Perfect Score', description: 'Get 100% on any assignment', icon: '100', earned: false, points: 200 },
];

const mockLeaderboard = [
  { id: 1, name: 'Alex Johnson', points: 2450, avatar: 'AJ', level: 12, isCurrentUser: false },
  { id: 2, name: 'Maria Garcia', points: 2300, avatar: 'MG', level: 11, isCurrentUser: false },
  { id: 3, name: 'James Wilson', points: 2280, avatar: 'JW', level: 11, isCurrentUser: false },
  { id: 4, name: 'Sarah Lee', points: 2150, avatar: 'SL', level: 10, isCurrentUser: false },
  { id: 5, name: 'Current User', points: 2050, avatar: 'ME', level: 10, isCurrentUser: true },
  { id: 6, name: 'David Kim', points: 1980, avatar: 'DK', level: 9, isCurrentUser: false },
  { id: 7, name: 'Emma Davis', points: 1850, avatar: 'ED', level: 9, isCurrentUser: false },
];

const mockRewards = [
  { id: 1, name: 'Custom Avatar Frame', cost: 500, icon: '🖼️', description: 'Unlock a special frame for your profile picture', claimed: false },
  { id: 2, name: 'Early Access', cost: 1000, icon: '🎮', description: 'Get early access to new features', claimed: true },
  { id: 3, name: 'Bonus Points', cost: 1500, icon: '⭐', description: 'Get 10% bonus points for a week', claimed: false },
  { id: 4, name: 'Profile Badge', cost: 2000, icon: '🏅', description: 'Exclusive badge for your profile', claimed: false },
  { id: 5, name: 'Themed Background', cost: 2500, icon: '🎨', description: 'Custom background for your dashboard', claimed: false },
];

const GamificationPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { enqueueSnackbar } = useSnackbar();
  const [activeTab, setActiveTab] = useState('achievements');
  const [expandedAchievement, setExpandedAchievement] = useState(null);
  const [userPoints, setUserPoints] = useState(mockUserStats.points);
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const toggleAchievementExpansion = (achievementId) => {
    setExpandedAchievement(expandedAchievement === achievementId ? null : achievementId);
  };
  
  const claimReward = (rewardId) => {
    const reward = mockRewards.find(r => r.id === rewardId);
    if (reward && userPoints >= reward.cost && !reward.claimed) {
      enqueueSnackbar(`Successfully claimed ${reward.name}!`, { variant: 'success' });
      // In a real app, you would update the backend here
      setUserPoints(prev => prev - reward.cost);
      reward.claimed = true;
    } else if (reward?.claimed) {
      enqueueSnackbar('You have already claimed this reward', { variant: 'info' });
    } else if (reward && userPoints < reward.cost) {
      enqueueSnackbar('Not enough points to claim this reward', { variant: 'error' });
    }
  };
  
  const renderAchievementsTab = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Your Achievements
      </Typography>
      <Grid container spacing={2}>
        {mockAchievements.map((achievement) => (
          <Grid item xs={12} key={achievement.id}>
            <Paper 
              elevation={2}
              sx={{
                p: 2,
                borderLeft: `4px solid ${achievement.earned ? theme.palette.success.main : theme.palette.grey[300]}`,
                opacity: achievement.earned ? 1 : 0.7,
              }}
            >
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar 
                  sx={{ 
                    bgcolor: achievement.earned ? 'success.main' : 'grey.300',
                    color: achievement.earned ? 'white' : 'grey.600',
                    width: 48,
                    height: 48,
                    fontSize: '1.2rem',
                  }}
                >
                  {achievement.icon}
                </Avatar>
                <Box flexGrow={1}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1" fontWeight={500}>
                      {achievement.title}
                    </Typography>
                    {achievement.earned ? (
                      <Chip 
                        icon={<CheckCircleIcon />} 
                        label="Earned" 
                        size="small" 
                        color="success"
                        variant="outlined"
                      />
                    ) : (
                      <Chip 
                        label={`${achievement.points} XP`} 
                        size="small" 
                        color="primary"
                        variant="outlined"
                      />
                    )}
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {achievement.description}
                  </Typography>
                  {achievement.progress !== undefined && (
                    <Box mt={1}>
                      <Box display="flex" justifyContent="space-between" mb={0.5}>
                        <Typography variant="caption" color="text.secondary">
                          Progress
                        </Typography>
                        <Typography variant="caption" fontWeight={500}>
                          {achievement.progress}/{achievement.target}
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={(achievement.progress / achievement.target) * 100} 
                        sx={{ height: 6, borderRadius: 3 }}
                      />
                    </Box>
                  )}
                  {achievement.earned && achievement.date && (
                    <Typography variant="caption" color="text.secondary" display="block" mt={1}>
                      Earned on {new Date(achievement.date).toLocaleDateString()}
                    </Typography>
                  )}
                </Box>
                <IconButton onClick={() => toggleAchievementExpansion(achievement.id)}>
                  {expandedAchievement === achievement.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Box>
              {expandedAchievement === achievement.id && (
                <Box mt={2} pt={2} borderTop="1px solid" borderColor="divider">
                  <Typography variant="body2" color="text.secondary">
                    {achievement.earned 
                      ? `You earned this achievement on ${new Date(achievement.date).toLocaleDateString()} and received ${achievement.points} XP!`
                      : `Complete this achievement to earn ${achievement.points} XP and get closer to the next level!`}
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
  
  const renderLeaderboardTab = () => (
    <Box>
      <Box mb={3} p={2} bgcolor="background.paper" borderRadius={1} boxShadow={1}>
        <Box display="flex" alignItems="center" gap={2} mb={1}>
          <Avatar sx={{ bgcolor: 'primary.main', color: 'white' }}>ME</Avatar>
          <Box flexGrow={1}>
            <Typography variant="subtitle1" fontWeight={500}>
              Your Rank: #{mockUserStats.rank}
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body2" color="text.secondary">
                {mockUserStats.points} XP • Level {mockUserStats.level}
              </Typography>
              <Box flexGrow={1} maxWidth={200}>
                <LinearProgress 
                  variant="determinate" 
                  value={mockUserStats.levelProgress} 
                  sx={{ height: 6, borderRadius: 3 }}
                />
              </Box>
              <Typography variant="caption" color="text.secondary">
                {mockUserStats.levelProgress}%
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      
      <Typography variant="h6" gutterBottom>
        Top Students
      </Typography>
      <Grid container spacing={2}>
        {mockLeaderboard.map((user, index) => (
          <Grid item xs={12} key={user.id}>
            <Paper 
              elevation={1}
              sx={{
                p: 2,
                borderLeft: user.isCurrentUser ? `4px solid ${theme.palette.primary.main}` : 'none',
                bgcolor: user.isCurrentUser ? 'action.hover' : 'background.paper',
              }}
            >
              <Box display="flex" alignItems="center" gap={2}>
                <Box position="relative">
                  <Avatar 
                    sx={{ 
                      bgcolor: user.isCurrentUser ? 'primary.main' : 'grey.300',
                      color: user.isCurrentUser ? 'white' : 'grey.600',
                      width: 40,
                      height: 40,
                    }}
                  >
                    {user.avatar}
                  </Avatar>
                  {index < 3 && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -8,
                        right: -8,
                        bgcolor: index === 0 ? 'gold' : index === 1 ? 'silver' : '#cd7f32',
                        color: 'white',
                        borderRadius: '50%',
                        width: 24,
                        height: 24,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                      }}
                    >
                      {index + 1}
                    </Box>
                  )}
                </Box>
                <Box flexGrow={1}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1" fontWeight={500}>
                      {user.name} {user.isCurrentUser && '(You)'}
                    </Typography>
                    <Chip 
                      label={`${user.points} XP`} 
                      size="small" 
                      color={user.isCurrentUser ? 'primary' : 'default'}
                      variant="outlined"
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Level {user.level} • {user.points - userPoints > 0 
                      ? `${user.points - userPoints} XP behind` 
                      : 'Ahead by points'}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
  
  const renderRewardsTab = () => (
    <Box>
      <Box mb={3} p={3} bgcolor="background.paper" borderRadius={1} boxShadow={1}>
        <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} gap={3} alignItems="center">
          <Box textAlign="center">
            <Typography variant="h4" color="primary" fontWeight="bold">
              {userPoints}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Available Points
            </Typography>
          </Box>
          <Box flexGrow={1}>
            <Typography variant="subtitle1" gutterBottom>
              How to earn more points?
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {[
                'Complete assignments',
                'Score well on quizzes',
                'Participate in discussions',
                'Maintain a streak',
                'Achieve milestones'
              ].map((item, index) => (
                <Chip 
                  key={index} 
                  label={item} 
                  size="small" 
                  variant="outlined"
                  color="primary"
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
      
      <Typography variant="h6" gutterBottom>
        Available Rewards
      </Typography>
      <Grid container spacing={2}>
        {mockRewards.map((reward) => (
          <Grid item xs={12} sm={6} md={4} key={reward.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                border: reward.claimed ? `2px solid ${theme.palette.success.main}` : 'none',
                opacity: reward.claimed ? 0.8 : 1,
              }}
            >
              <CardActionArea 
                sx={{ flexGrow: 1, p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
                onClick={() => !reward.claimed && claimReward(reward.id)}
                disabled={reward.claimed || userPoints < reward.cost}
              >
                <Box 
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    bgcolor: reward.claimed ? 'success.light' : 'primary.light',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    mb: 2,
                    opacity: reward.claimed ? 0.7 : 1,
                  }}
                >
                  {reward.icon}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {reward.name}
                  {reward.claimed && (
                    <CheckCircleIcon 
                      color="success" 
                      fontSize="small" 
                      sx={{ ml: 1, verticalAlign: 'middle' }} 
                    />
                  )}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {reward.description}
                </Typography>
                <Box mt="auto" width="100%" pt={2}>
                  {reward.claimed ? (
                    <Chip 
                      label="Claimed" 
                      color="success" 
                      variant="outlined"
                      size="small"
                      sx={{ width: '100%' }}
                    />
                  ) : (
                    <Button
                      variant={userPoints >= reward.cost ? 'contained' : 'outlined'}
                      color={userPoints >= reward.cost ? 'primary' : 'default'}
                      fullWidth
                      disabled={userPoints < reward.cost}
                      startIcon={<StarIcon />}
                    >
                      {reward.cost} XP
                    </Button>
                  )}
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
  
  return (
    <Box sx={{ p: isMobile ? 1 : 3 }}>
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gamification Center
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track your progress, earn achievements, and unlock rewards
        </Typography>
      </Box>
      
      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                <StarIcon />
              </Avatar>
              <Box>
                <Typography variant="h4" fontWeight="bold">
                  {userPoints}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Points
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar sx={{ bgcolor: 'success.light', color: 'success.contrastText' }}>
                <TrophyIcon />
              </Avatar>
              <Box>
                <Typography variant="h4" fontWeight="bold">
                  {mockUserStats.level}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Current Level
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar sx={{ bgcolor: 'warning.light', color: 'warning.contrastText' }}>
                <FlameIcon />
              </Avatar>
              <Box>
                <Typography variant="h4" fontWeight="bold">
                  {mockUserStats.currentStreak}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Day Streak
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar sx={{ bgcolor: 'info.light', color: 'info.contrastText' }}>
                <TrendingUpIcon />
              </Avatar>
              <Box>
                <Typography variant="h4" fontWeight="bold">
                  #{mockUserStats.rank}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Global Rank
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Tabs */}
      <Paper sx={{ mb: 3, borderRadius: 1, overflow: 'hidden' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant={isMobile ? 'scrollable' : 'standard'}
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTabs-flexContainer': {
              bgcolor: 'background.paper',
            },
          }}
        >
          <Tab 
            icon={<BadgeIcon />} 
            label={!isMobile && "Achievements"} 
            value="achievements" 
            sx={{ minHeight: 64 }}
          />
          <Tab 
            icon={<TrophyIcon />} 
            label={!isMobile && "Leaderboard"} 
            value="leaderboard" 
            sx={{ minHeight: 64 }}
          />
          <Tab 
            icon={<GiftIcon />} 
            label={!isMobile && "Rewards"} 
            value="rewards" 
            sx={{ minHeight: 64 }}
          />
        </Tabs>
        
        <Box p={3}>
          {activeTab === 'achievements' && renderAchievementsTab()}
          {activeTab === 'leaderboard' && renderLeaderboardTab()}
          {activeTab === 'rewards' && renderRewardsTab()}
        </Box>
      </Paper>
      
      {/* Progress to next level */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            Progress to Level {mockUserStats.level + 1}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {mockUserStats.levelProgress}% • {mockUserStats.nextLevelPoints} XP to go
          </Typography>
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={mockUserStats.levelProgress} 
          sx={{ height: 10, borderRadius: 5 }}
          color="primary"
        />
        <Box mt={1} display="flex" justifyContent="space-between">
          <Typography variant="caption" color="text.secondary">
            Level {mockUserStats.level}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Level {mockUserStats.level + 1}
          </Typography>
        </Box>
      </Paper>
      
      {/* Recent Activity */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Recent Activity
        </Typography>
        {[
          { id: 1, type: 'assignment', text: 'Submitted "Week 3 Assignment"', points: 50, time: '2 hours ago' },
          { id: 2, type: 'quiz', text: 'Completed "Chapter 1 Quiz" with 90%', points: 100, time: '1 day ago' },
          { id: 3, type: 'streak', text: '3-day login streak', points: 30, time: '2 days ago' },
          { id: 4, type: 'achievement', text: 'Earned "First Assignment" achievement', points: 50, time: '3 days ago' },
        ].map((activity) => (
          <Box key={activity.id} display="flex" alignItems="center" py={1.5} borderBottom="1px solid" borderColor="divider">
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                bgcolor: 'primary.light',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'primary.contrastText',
                mr: 2,
                flexShrink: 0,
              }}
            >
              {activity.type === 'assignment' ? (
                <AssignmentIcon fontSize="small" />
              ) : activity.type === 'quiz' ? (
                <QuizIcon fontSize="small" />
              ) : activity.type === 'streak' ? (
                <FlameIcon fontSize="small" />
              ) : (
                <BadgeIcon fontSize="small" />
              )}
            </Box>
            <Box flexGrow={1}>
              <Typography variant="body1">
                {activity.text}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {activity.time}
              </Typography>
            </Box>
            <Chip 
              label={`+${activity.points} XP`} 
              size="small" 
              color="primary"
              variant="outlined"
              sx={{ ml: 1 }}
            />
          </Box>
        ))}
      </Paper>
    </Box>
  );
};

export default GamificationPage;

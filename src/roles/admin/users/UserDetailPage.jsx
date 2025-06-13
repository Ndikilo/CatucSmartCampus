import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  FormControlLabel,
  TextField,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Stack,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Security as SecurityIcon,
  History as HistoryIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  AccessTime as AccessTimeIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Block as BlockIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../common/context/AuthContext';

// Mock data - replace with API calls
const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'student',
  status: 'active',
  avatar: 'https://i.pravatar.cc/150?img=1',
  phone: '+1 (555) 123-4567',
  department: 'Computer Science',
  joinDate: '2023-01-15',
  lastLogin: '2024-03-15T10:30:00',
  accessLevel: 3,
  permissions: {
    canEdit: true,
    canDelete: false,
    canView: true,
    canManage: false,
  },
  activityLog: [
    { id: 1, action: 'Login', timestamp: '2024-03-15T10:30:00', ip: '192.168.1.1' },
    { id: 2, action: 'Profile Update', timestamp: '2024-03-14T15:45:00', ip: '192.168.1.1' },
    { id: 3, action: 'Document Upload', timestamp: '2024-03-13T09:20:00', ip: '192.168.1.1' },
  ],
  securitySettings: {
    twoFactorEnabled: true,
    lastPasswordChange: '2024-02-15',
    loginAttempts: 0,
    trustedDevices: 2,
  },
};

const UserDetailPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [securityDialogOpen, setSecurityDialogOpen] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCurrentUser(mockUser);
      setEditedUser(mockUser);
      setLoading(false);
    };

    fetchUser();
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Implement save logic
    setCurrentUser(editedUser);
    setIsEditing(false);
    setAlert({ type: 'success', message: 'User updated successfully' });
  };

  const handleCancel = () => {
    setEditedUser(currentUser);
    setIsEditing(false);
  };

  const handleSecuritySettings = () => {
    setSecurityDialogOpen(true);
  };

  const handlePermissionChange = (permission) => {
    setEditedUser(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: !prev.permissions[permission],
      },
    }));
  };

  if (loading) {
    return (
      <Box p={3}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      {alert && (
        <Alert 
          severity={alert.type} 
          onClose={() => setAlert(null)}
          sx={{ mb: 3 }}
        >
          {alert.message}
        </Alert>
      )}

      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box display="flex" alignItems="center">
          <Avatar
            src={currentUser.avatar}
            sx={{ width: 64, height: 64, mr: 2 }}
          />
          <Box>
            <Typography variant="h4">{currentUser.name}</Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {currentUser.email}
            </Typography>
          </Box>
        </Box>
        <Box>
          {isEditing ? (
            <>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                sx={{ mr: 1 }}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                startIcon={<CancelIcon />}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={handleEdit}
                sx={{ mr: 1 }}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                startIcon={<SecurityIcon />}
                onClick={handleSecuritySettings}
              >
                Security
              </Button>
            </>
          )}
        </Box>
      </Box>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab icon={<PersonIcon />} label="Profile" />
          <Tab icon={<SecurityIcon />} label="Permissions" />
          <Tab icon={<HistoryIcon />} label="Activity" />
          <Tab icon={<SettingsIcon />} label="Settings" />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      <Paper sx={{ p: 3 }}>
        {activeTab === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Basic Information
                  </Typography>
                  <Stack spacing={2}>
                    <Box display="flex" alignItems="center">
                      <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography>
                        {isEditing ? (
                          <TextField
                            fullWidth
                            value={editedUser.email}
                            onChange={(e) =>
                              setEditedUser({ ...editedUser, email: e.target.value })
                            }
                          />
                        ) : (
                          currentUser.email
                        )}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography>
                        {isEditing ? (
                          <TextField
                            fullWidth
                            value={editedUser.phone}
                            onChange={(e) =>
                              setEditedUser({ ...editedUser, phone: e.target.value })
                            }
                          />
                        ) : (
                          currentUser.phone
                        )}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <SchoolIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography>
                        {isEditing ? (
                          <TextField
                            fullWidth
                            value={editedUser.department}
                            onChange={(e) =>
                              setEditedUser({ ...editedUser, department: e.target.value })
                            }
                          />
                        ) : (
                          currentUser.department
                        )}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Account Status
                  </Typography>
                  <Stack spacing={2}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography>Status</Typography>
                      <Chip
                        label={currentUser.status}
                        color={
                          currentUser.status === 'active'
                            ? 'success'
                            : currentUser.status === 'inactive'
                            ? 'warning'
                            : 'error'
                        }
                      />
                    </Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography>Role</Typography>
                      <Chip
                        label={currentUser.role}
                        color={
                          currentUser.role === 'admin'
                            ? 'error'
                            : currentUser.role === 'staff'
                            ? 'warning'
                            : 'success'
                        }
                      />
                    </Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography>Access Level</Typography>
                      <Typography>{currentUser.accessLevel}/5</Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {activeTab === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Permissions
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary="Can Edit" />
                <Switch
                  edge="end"
                  checked={editedUser.permissions.canEdit}
                  onChange={() => handlePermissionChange('canEdit')}
                  disabled={!isEditing}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <DeleteIcon />
                </ListItemIcon>
                <ListItemText primary="Can Delete" />
                <Switch
                  edge="end"
                  checked={editedUser.permissions.canDelete}
                  onChange={() => handlePermissionChange('canDelete')}
                  disabled={!isEditing}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <VisibilityIcon />
                </ListItemIcon>
                <ListItemText primary="Can View" />
                <Switch
                  edge="end"
                  checked={editedUser.permissions.canView}
                  onChange={() => handlePermissionChange('canView')}
                  disabled={!isEditing}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Can Manage" />
                <Switch
                  edge="end"
                  checked={editedUser.permissions.canManage}
                  onChange={() => handlePermissionChange('canManage')}
                  disabled={!isEditing}
                />
              </ListItem>
            </List>
          </Box>
        )}

        {activeTab === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Activity Log
            </Typography>
            <List>
              {currentUser.activityLog.map((log) => (
                <ListItem key={log.id}>
                  <ListItemIcon>
                    <AccessTimeIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={log.action}
                    secondary={`${new Date(log.timestamp).toLocaleString()} - IP: ${log.ip}`}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {activeTab === 3 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Security Settings
            </Typography>
            <Stack spacing={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography>Two-Factor Authentication</Typography>
                <Chip
                  label={currentUser.securitySettings.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                  color={currentUser.securitySettings.twoFactorEnabled ? 'success' : 'default'}
                />
              </Box>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography>Last Password Change</Typography>
                <Typography>
                  {new Date(currentUser.securitySettings.lastPasswordChange).toLocaleDateString()}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography>Login Attempts</Typography>
                <Typography>{currentUser.securitySettings.loginAttempts}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography>Trusted Devices</Typography>
                <Typography>{currentUser.securitySettings.trustedDevices}</Typography>
              </Box>
            </Stack>
          </Box>
        )}
      </Paper>

      {/* Security Settings Dialog */}
      <Dialog
        open={securityDialogOpen}
        onClose={() => setSecurityDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Security Settings</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Two-Factor Authentication
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={currentUser.securitySettings.twoFactorEnabled}
                    onChange={() => {
                      setCurrentUser(prev => ({
                        ...prev,
                        securitySettings: {
                          ...prev.securitySettings,
                          twoFactorEnabled: !prev.securitySettings.twoFactorEnabled,
                        },
                      }));
                    }}
                  />
                }
                label="Enable 2FA"
              />
            </Box>
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Password
              </Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  // Implement password change
                  setAlert({ type: 'success', message: 'Password change requested' });
                  setSecurityDialogOpen(false);
                }}
              >
                Change Password
              </Button>
            </Box>
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Trusted Devices
              </Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  // Implement device management
                  setAlert({ type: 'success', message: 'Device management opened' });
                  setSecurityDialogOpen(false);
                }}
              >
                Manage Devices
              </Button>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSecurityDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserDetailPage;

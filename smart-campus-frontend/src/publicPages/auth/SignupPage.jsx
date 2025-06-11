import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Alert,
  Stack,
  FormControlLabel,
  Checkbox,
  Grid,
  Fade,
  CircularProgress,
  Link as MuiLink
} from '@mui/material';
import {
  PersonOutline,
  LockOutlined,
  EmailOutlined,
  PhoneAndroidOutlined,
  SchoolOutlined,
  Visibility,
  VisibilityOff,
  ArrowBack as ArrowBackIcon,
  Google,
  Facebook,
  Apple,
} from '@mui/icons-material';

// Import your logo
import logo from '../../assets/logo.png';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    studentId: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (!formData.acceptTerms) {
      setError('You must accept the terms and conditions');
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to login with success message
      navigate('/auth', { state: { signupSuccess: true } });
    } catch (err) {
      setError('Failed to create account. Please try again.');
      console.error('Signup error:', err);
    }
    
    setLoading(false);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'background.default',
      position: 'relative',
      overflow: 'auto',
      background: 'linear-gradient(135deg, #f5f7ff 0%, #e8ecff 100%)',
    }}>
      {/* Back to Welcome Button */}
      <Button
        component={Link}
        to="/welcome"
        startIcon={<ArrowBackIcon />}
        sx={{
          position: 'fixed',
          top: 16,
          left: 16,
          zIndex: 1300,
          color: 'text.primary',
          bgcolor: 'background.paper',
          boxShadow: 2,
          borderRadius: 2,
          px: 2,
          py: 1,
          textTransform: 'none',
          '&:hover': {
            bgcolor: 'action.hover',
          },
          [theme.breakpoints.down('sm')]: {
            top: 8,
            left: 8,
            minWidth: 'auto',
            width: 40,
            height: 40,
            borderRadius: '50%',
            '& .MuiButton-startIcon': {
              margin: 0,
            },
            '& .MuiButton-label': {
              display: 'none',
            }
          }
        }}
      >
        <Box component="span" sx={{ [theme.breakpoints.down('sm')]: { display: 'none' } }}>
          Back to Welcome
        </Box>
      </Button>
      
      {/* Decorative elements */}
      <Box 
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '40vh',
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          borderBottomLeftRadius: '50% 20%',
          borderBottomRightRadius: '50% 20%',
          zIndex: 0,
          [theme.breakpoints.down('md')]: {
            height: '35vh',
            borderBottomLeftRadius: '30% 10%',
            borderBottomRightRadius: '30% 10%',
          }
        }}
      />
      
      <Container 
        component="main" 
        maxWidth="md"
        sx={{
          position: 'relative',
          zIndex: 1,
          flex: '1 0 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          py: { xs: 4, sm: 6 },
          my: { xs: 0, sm: 4 }
        }}
      >
        <Fade in timeout={500}>
          <Box sx={{ 
            display: 'flex', 
            width: '100%',
            maxWidth: 1000,
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: 6,
            bgcolor: 'background.paper',
            [theme.breakpoints.down('md')]: {
              flexDirection: 'column',
              maxWidth: 500,
            }
          }}>
            {/* Left side - Branding */}
            <Box 
              sx={{
                flex: 1,
                p: 6,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                color: 'white',
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                [theme.breakpoints.down('md')]: {
                  p: 4,
                  py: 6
                }
              }}
            >
              <Box 
                component="img" 
                src={logo} 
                alt="SmartCampus Logo" 
                sx={{ 
                  height: 'auto',
                  width: '180px',
                  maxWidth: '80%',
                  mb: 3,
                  objectFit: 'contain'
                }} 
              />
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Join SmartCampus
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9, mb: 4 }}>
                Create your account and unlock all features
              </Typography>
              
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 2, 
                width: '100%',
                maxWidth: 300,
                mt: 4
              }}>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    color: 'white',
                    borderColor: 'rgba(255,255,255,0.3)',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)'
                    },
                    textTransform: 'none',
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 500
                  }}
                  onClick={() => navigate('/auth')}
                >
                  Already have an account? Sign In
                </Button>
              </Box>
            </Box>
            
            {/* Right side - Signup Form */}
            <Box sx={{ 
              flex: 1, 
              p: { xs: 3, sm: 6 },
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
              maxHeight: 'calc(100vh - 200px)',
              [theme.breakpoints.down('md')]: {
                p: 3,
                maxHeight: 'none'
              }
            }}>
              <Typography variant="h5" fontWeight={700} color="text.primary" gutterBottom>
                Create your account
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={4}>
                Fill in your details to get started
              </Typography>

              {error && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    mb: 3,
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'error.light',
                    bgcolor: 'error.light',
                    color: 'error.contrastText',
                    '& .MuiAlert-icon': {
                      color: 'error.contrastText'
                    }
                  }}
                >
                  {error}
                </Alert>
              )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="given-name"
                  autoFocus
                  value={formData.firstName}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutline color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlined color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="studentId"
                  label="Student/Staff ID"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SchoolOutlined color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
            </Grid>

            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone Number"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={formData.phone}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneAndroidOutlined color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '& fieldset': {
                    borderColor: 'divider',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                    borderWidth: 1,
                  },
                },
              }}
            />

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
            </Grid>

            <FormControlLabel
              control={
                <Checkbox
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  color="primary"
                  size="small"
                  sx={{ 
                    color: 'text.secondary',
                    '&.Mui-checked': {
                      color: 'primary.main',
                    },
                  }}
                />
              }
              label={
                <Typography variant="body2" color="text.secondary">
                  I agree to the <MuiLink href="#" color="primary" sx={{ fontWeight: 600 }}>Terms of Service</MuiLink> and{' '}
                  <MuiLink href="#" color="primary" sx={{ fontWeight: 600 }}>Privacy Policy</MuiLink>
                </Typography>
              }
              sx={{ mt: 2, mb: 3, alignItems: 'flex-start' }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              startIcon={!loading ? <PersonOutline /> : null}
              sx={{
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                letterSpacing: 0.5,
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                '&:hover': {
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                  transform: 'translateY(-1px)',
                },
                '&:active': {
                  transform: 'translateY(0)',
                },
                transition: 'all 0.2s ease-in-out',
                mb: 2,
              }}
            >
              {loading ? (
                <>
                  <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>

            <Divider sx={{ my: 3, color: 'text.secondary', '&:before, &:after': { borderColor: 'divider' } }}>
              <Typography variant="body2" color="text.secondary">or sign in with</Typography>
            </Divider>
            
            {/* Social Login Buttons */}
            <Stack direction="row" spacing={2} mb={3}>
              {[
                { icon: <Google />, provider: 'google' },
                { icon: <Facebook />, provider: 'facebook' },
                { icon: <Apple />, provider: 'apple' }
              ].map(({ icon, provider }) => (
                <Button
                  key={provider}
                  variant="outlined"
                  fullWidth
                  onClick={() => console.log(`Login with ${provider}`)}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    borderColor: 'divider',
                    color: 'text.secondary',
                    fontWeight: 500,
                    textTransform: 'none',
                    '&:hover': {
                      borderColor: 'text.primary',
                      bgcolor: 'action.hover'
                    }
                  }}
                >
                  {icon}
                </Button>
              ))}
            </Stack>
            
              <Box sx={{ mt: 'auto', pt: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  By creating an account, you agree to our{' '}
                  <MuiLink href="#" color="primary" sx={{ fontWeight: 500 }}>Terms of Service</MuiLink>
                  {' '}and{' '}
                  <MuiLink href="#" color="primary" sx={{ fontWeight: 500 }}>Privacy Policy</MuiLink>.
                </Typography>
              </Box>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Container>
      
      {/* Footer */}
      <Box 
        component="footer" 
        sx={{ 
          py: 2, 
          px: 2, 
          flexShrink: 0,
          textAlign: 'center',
          bgcolor: 'background.paper',
          borderTop: '1px solid',
          borderColor: 'divider',
          position: 'relative',
          zIndex: 1,
          [theme.breakpoints.down('sm')]: {
            py: 2,
            pb: 8,
          }
        }}
      >
        <Container maxWidth="md">
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} SmartCampus. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default SignupPage;

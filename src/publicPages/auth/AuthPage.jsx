import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../common/context/AuthContext';
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
  Checkbox,
  FormControlLabel,
  Fade,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Link as MuiLink
} from '@mui/material';
import {
  LockOutlined,
  EmailOutlined,
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
  Google,
  Facebook,
  Apple,
  SchoolOutlined,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';

// Import your logo
import logo from '../../assets/logo.png';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Check if we're coming from signup and load remembered email
  useEffect(() => {
    if (location.state?.fromSignUp) {
      setEmail(location.state.email || '');
    }
    
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password');
      setLoading(false);
      return;
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll use a simple role-based login
      let role = 'student';
      if (email.includes('staff')) role = 'staff';
      if (email.includes('admin')) role = 'admin';
      
      // If remember me is checked, store in localStorage
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      
      login(role);
      navigate('/redirect');
    } catch (err) {
      setError('Failed to log in. Please check your credentials and try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle demo login
  const handleDemoLogin = (role = 'student') => {
    setLoading(true);
    setEmail(`${role}@example.com`);
    setPassword('password');
    
    // Simulate login after a short delay
    setTimeout(() => {
      login(role);
      navigate('/redirect');
    }, 500);
  };
  
  // Handle social login
  const handleSocialLogin = (provider) => {
    // In a real app, this would redirect to the OAuth provider
    console.log(`Logging in with ${provider}`);
    // For demo, just log in as student
    handleDemoLogin('student');
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'background.default',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #f5f7ff 0%, #e8ecff 100%)',
    }}>
      {/* Back to Home Button - Fixed Position */}
      <Button
        component={Link}
        to="/welcome"
        startIcon={<ArrowBackIcon />}
        sx={{
          position: 'fixed',
          top: 16,
          left: 16,
          zIndex: 1300, // Above most other elements
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
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          py: 8
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
                Welcome to SmartCampus
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9, mb: 4 }}>
                Your all-in-one campus management solution
              </Typography>
              
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 2, 
                width: '100%',
                maxWidth: 300,
                mt: 4
              }}>
                {['student', 'staff', 'admin'].map((role) => (
                  <Button
                    key={role}
                    variant="outlined"
                    fullWidth
                    sx={{
                      color: 'white',
                      borderColor: 'rgba(255,255,255,0.3)',
                      '&:hover': {
                        borderColor: 'white',
                        bgcolor: 'rgba(255,255,255,0.1)'
                      },
                      textTransform: 'capitalize',
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 500
                    }}
                    onClick={() => handleDemoLogin(role)}
                  >
                    Demo {role} login
                  </Button>
                ))}
              </Box>
            </Box>
            
            {/* Right side - Login Form */}
            <Box sx={{ 
              flex: 1, 
              p: 6,
              display: 'flex',
              flexDirection: 'column',
              [theme.breakpoints.down('md')]: {
                p: 4
              }
            }}>
              <Typography variant="h5" fontWeight={700} color="text.primary" gutterBottom>
                Sign in to your account
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={4}>
                Welcome back! Please enter your details.
              </Typography>
              
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
                    onClick={() => handleSocialLogin(provider)}
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
              
              <Divider sx={{ my: 3, color: 'text.secondary', '&:before, &:after': { borderColor: 'divider' } }}>
                <Typography variant="body2" color="text.secondary">or continue with</Typography>
              </Divider>
              
              {/* Login Form */}
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlined color="action" />
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
                
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                          size="small"
                          sx={{
                            color: 'text.secondary',
                            '&:hover': {
                              bgcolor: 'action.hover'
                            }
                          }}
                        >
                          {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    mb: 1,
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
                
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mb: 3,
                  mt: 1
                }}>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        size="small" 
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
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
                        Remember me
                      </Typography>
                    }
                    sx={{ m: 0 }}
                  />
                  <MuiLink
                    component={Link}
                    to="/forgot-password"
                    variant="body2"
                    color="primary"
                    sx={{ fontWeight: 500, textDecoration: 'none' }}
                  >
                    Forgot password?
                  </MuiLink>
                </Box>
                
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
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  startIcon={!loading ? <LoginIcon /> : null}
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
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
                
                <Box sx={{ textAlign: 'center', mt: 3, mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Don't have an account?{' '}
                    <MuiLink 
                      component={Link}
                      to="/auth/signup"
                      sx={{ 
                        color: 'primary.main',
                        fontWeight: 600,
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline',
                        }
                      }}
                    >
                      Sign up now
                    </MuiLink>
                  </Typography>
                </Box>
                
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                  <Typography variant="caption" color="text.secondary">
                    By continuing, you agree to our{' '}
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
          py: 3, 
          px: 2, 
          mt: 'auto',
          textAlign: 'center',
          bgcolor: 'background.paper',
          borderTop: '1px solid',
          borderColor: 'divider',
          position: 'relative',
          zIndex: 1,
          [theme.breakpoints.down('sm')]: {
            pb: 8, // Add extra padding at the bottom on mobile to prevent content from being hidden behind fixed elements
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

export default AuthPage;

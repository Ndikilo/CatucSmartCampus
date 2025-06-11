import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  TextField,
  InputAdornment,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Badge,
  Chip,
  Tabs,
  Tab,
  Menu,
  MenuItem,
  Tooltip,
  CircularProgress,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Checkbox,
  ListItemText as MuiListItemText,
  Drawer,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  MoreVert as MoreVertIcon,
  Send as SendIcon,
  AttachFile as AttachFileIcon,
  InsertEmoticon as InsertEmoticonIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Delete as DeleteIcon,
  Archive as ArchiveIcon,
  MarkEmailRead as MarkEmailReadIcon,
  MarkEmailUnread as MarkEmailUnreadIcon,
  Reply as ReplyIcon,
  ReplyAll as ReplyAllIcon,
  Forward as ForwardIcon,
  Add as AddIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  Notifications as NotificationsIcon,
  NotificationsNone as NotificationsNoneIcon
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';
import Layout from '@common/components/Layout';

// Sample data - Replace with actual API calls
const generateMessages = (count = 30) => {
  const types = ['inbox', 'sent', 'drafts', 'spam', 'trash'];
  const statuses = ['unread', 'read', 'starred', 'important'];
  const senders = [
    { name: 'John Smith', email: 'john.smith@example.com', avatar: 'JS' },
    { name: 'Sarah Johnson', email: 'sarah.j@example.com', avatar: 'SJ' },
    { name: 'IT Department', email: 'it@school.edu', avatar: 'IT' },
    { name: 'Principal Office', email: 'principal@school.edu', avatar: 'PO' },
    { name: 'Parent Association', email: 'parents@school.edu', avatar: 'PA' },
  ];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `msg-${1000 + i}`,
    type: types[Math.floor(Math.random() * types.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    from: senders[Math.floor(Math.random() * senders.length)],
    to: [{ name: 'Me', email: 'me@school.edu' }],
    subject: `Message about ${['homework', 'meeting', 'event', 'payment', 'grade', 'attendance'][Math.floor(Math.random() * 6)]}`,
    body: `This is a sample message about ${['upcoming events', 'important updates', 'schedule changes', 'academic progress', 'school policies'][Math.floor(Math.random() * 5)]}.`,
    date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
    hasAttachment: Math.random() > 0.7,
    isStarred: Math.random() > 0.8,
    isImportant: Math.random() > 0.9,
  }));
};

const MessagesPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [currentTab, setCurrentTab] = useState('inbox');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyType, setReplyType] = useState('reply'); // 'reply', 'replyAll', 'forward'
  const [composeOpen, setComposeOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [filters, setFilters] = useState({
    type: 'all',
    date: 'all',
    hasAttachment: false,
    isStarred: false,
    isImportant: false,
  });

  const filteredMessages = messages
    .filter(msg => {
      // Filter by current tab
      if (currentTab !== 'all' && msg.type !== currentTab) return false;
      
      // Apply search term
      if (searchTerm && !msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !msg.body.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Apply filters
      if (filters.hasAttachment && !msg.hasAttachment) return false;
      if (filters.isStarred && !msg.isStarred) return false;
      if (filters.isImportant && !msg.isImportant) return false;
      
      return true;
    });

  // Sample data load
  useEffect(() => {
    const fetchMessages = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessages(generateMessages(50));
      setLoading(false);
    };

    fetchMessages();
  }, []);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    setSelectedMessages([]);
  };

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
    // Mark as read when selected
    if (message.status === 'unread') {
      setMessages(messages.map(msg => 
        msg.id === message.id ? { ...msg, status: 'read' } : msg
      ));
    }
  };

  const handleToggleSelect = (event, id) => {
    event.stopPropagation();
    const selectedIndex = selectedMessages.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedMessages, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedMessages.slice(1));
    } else if (selectedIndex === selectedMessages.length - 1) {
      newSelected = newSelected.concat(selectedMessages.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedMessages.slice(0, selectedIndex),
        selectedMessages.slice(selectedIndex + 1),
      );
    }

    setSelectedMessages(newSelected);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredMessages.map((msg) => msg.id);
      setSelectedMessages(newSelecteds);
      return;
    }
    setSelectedMessages([]);
  };

  const handleDeleteSelected = () => {
    // In a real app, this would be an API call
    setMessages(messages.filter(msg => !selectedMessages.includes(msg.id)));
    setSelectedMessages([]);
    setSnackbar({
      open: true,
      message: `${selectedMessages.length} message(s) moved to trash`,
      severity: 'success'
    });
  };

  const handleMarkAsRead = () => {
    setMessages(messages.map(msg => 
      selectedMessages.includes(msg.id) ? { ...msg, status: 'read' } : msg
    ));
    setSelectedMessages([]);
  };

  const handleMarkAsUnread = () => {
    setMessages(messages.map(msg => 
      selectedMessages.includes(msg.id) ? { ...msg, status: 'unread' } : msg
    ));
    setSelectedMessages([]);
  };

  const handleStarMessage = (messageId, event) => {
    if (event) event.stopPropagation();
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, isStarred: !msg.isStarred } : msg
    ));
  };

  const handleImportantMessage = (messageId, event) => {
    if (event) event.stopProgress();
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, isImportant: !msg.isImportant } : msg
    ));
  };

  const formatDate = (date) => {
    if (isToday(date)) {
      return format(date, 'h:mm a');
    } else if (isYesterday(date)) {
      return 'Yesterday';
    } else {
      return format(date, 'MMM d');
    }
  };

  const handleReply = (type) => {
    setReplyType(type);
    setReplyOpen(true);
  };

  const handleCompose = () => {
    setComposeOpen(true);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMessageList = () => (
    <Paper variant="outlined" sx={{ height: 'calc(100vh - 200px)', overflow: 'auto' }}>
      <List dense={false}>
        {filteredMessages.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="subtitle1" color="text.secondary">
              {searchTerm ? 'No messages match your search.' : 'No messages in this folder.'}
            </Typography>
          </Box>
        ) : (
          filteredMessages.map((message) => (
            <React.Fragment key={message.id}>
              <ListItem 
                button 
                selected={selectedMessage?.id === message.id}
                onClick={() => handleSelectMessage(message)}
                sx={{
                  borderLeft: message.isImportant ? `3px solid ${theme.palette.warning.main}` : '3px solid transparent',
                  bgcolor: message.status === 'unread' ? 'action.hover' : 'background.paper',
                  '&:hover': {
                    bgcolor: message.status === 'unread' ? 'action.selected' : 'action.hover',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 56 }}>
                    <Checkbox
                      checked={selectedMessages.indexOf(message.id) !== -1}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => handleToggleSelect(e, message.id)}
                      size="small"
                    />
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStarMessage(message.id);
                      }}
                      color={message.isStarred ? 'warning' : 'default'}
                    >
                      {message.isStarred ? <StarIcon /> : <StarBorderIcon />}
                    </IconButton>
                  </Box>
                  
                  <Box sx={{ flex: 1, minWidth: 0, mr: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography 
                        variant="subtitle2" 
                        noWrap 
                        sx={{ 
                          fontWeight: message.status === 'unread' ? 'bold' : 'normal',
                          mr: 1,
                          color: message.status === 'unread' ? 'text.primary' : 'inherit'
                        }}
                      >
                        {message.from.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" noWrap>
                        {message.from.email}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                      <Typography 
                        variant="body2" 
                        noWrap 
                        sx={{ 
                          fontWeight: message.status === 'unread' ? 'bold' : 'normal',
                          flex: 1,
                          mr: 1
                        }}
                      >
                        {message.subject}
                      </Typography>
                      {message.hasAttachment && (
                        <AttachFileIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                      )}
                      <Typography 
                        variant="caption" 
                        color="text.secondary"
                        sx={{ minWidth: 60, textAlign: 'right' }}
                      >
                        {formatDate(message.date)}
                      </Typography>
                    </Box>
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      noWrap
                      sx={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        maxWidth: '100%',
                        display: 'inline-block'
                      }}
                    >
                      {message.body}
                    </Typography>
                  </Box>
                </Box>
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))
        )}
      </List>
    </Paper>
  );

  const renderMessageDetail = () => {
    if (!selectedMessage) {
      return (
        <Box sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
          p: 4,
          textAlign: 'center'
        }}>
          <MailOutlineIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            Select a message to read
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Choose a message from the list to view its contents
          </Typography>
        </Box>
      );
    }

    return (
      <Paper variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
              {selectedMessage.subject}
            </Typography>
            <Box>
              <IconButton onClick={() => handleStarMessage(selectedMessage.id)}>
                {selectedMessage.isStarred ? <StarIcon color="warning" /> : <StarBorderIcon />}
              </IconButton>
              <IconButton onClick={() => handleImportantMessage(selectedMessage.id)}>
                {selectedMessage.isImportant ? 
                  <LabelImportantIcon color="warning" /> : 
                  <LabelOutlinedIcon />}
              </IconButton>
              <IconButton onClick={handleMenuOpen}>
                <MoreVertIcon />
              </IconButton>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ mr: 1, bgcolor: 'primary.main' }}>
                {selectedMessage.from.avatar}
              </Avatar>
              <Box>
                <Typography variant="subtitle2">
                  {selectedMessage.from.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {selectedMessage.from.email}
                </Typography>
              </Box>
            </Box>
            <Typography variant="caption" color="text.secondary">
              {format(selectedMessage.date, 'PPpp')}
            </Typography>
          </Box>
          
          <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
            <Button 
              variant="outlined" 
              size="small" 
              startIcon={<ReplyIcon />}
              onClick={() => handleReply('reply')}
            >
              Reply
            </Button>
            <Button 
              variant="outlined" 
              size="small" 
              startIcon={<ReplyAllIcon />}
              onClick={() => handleReply('replyAll')}
            >
              Reply All
            </Button>
            <Button 
              variant="outlined" 
              size="small" 
              startIcon={<ForwardIcon />}
              onClick={() => handleReply('forward')}
            >
              Forward
            </Button>
          </Box>
        </Box>
        
        <Box sx={{ p: 3, flex: 1, overflow: 'auto' }}>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
            {selectedMessage.body}
          </Typography>
          
          {selectedMessage.hasAttachment && (
            <Box sx={{ mt: 3, border: 1, borderColor: 'divider', borderRadius: 1, p: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Attachments (1)
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <InsertDriveFileIcon sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2" sx={{ flex: 1 }}>
                  Document.pdf
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
                  2.4 MB
                </Typography>
                <IconButton size="small">
                  <CloudDownloadIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          )}
        </Box>
        
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Button 
            variant="contained" 
            startIcon={<ReplyIcon />}
            onClick={() => handleReply('reply')}
            sx={{ mr: 1 }}
          >
            Reply
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<ForwardIcon />}
            onClick={() => handleReply('forward')}
          >
            Forward
          </Button>
        </Box>
      </Paper>
    );
  };

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Messages
          </Typography>
          <Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCompose}
            >
              New Message
            </Button>
          </Box>
        </Box>

        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab 
            icon={<InboxIcon />} 
            label="Inbox" 
            value="inbox"
            iconPosition="start"
          />
          <Tab 
            icon={<SendIcon />} 
            label="Sent" 
            value="sent"
            iconPosition="start"
          />
          <Tab 
            icon={<DraftsIcon />} 
            label="Drafts" 
            value="drafts"
            iconPosition="start"
          />
          <Tab 
            icon={<StarBorderIcon />} 
            label="Starred" 
            value="starred"
            iconPosition="start"
          />
          <Tab 
            icon={<DeleteIcon />} 
            label="Trash" 
            value="trash"
            iconPosition="start"
          />
        </Tabs>

        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <TextField
            size="small"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ flex: 1, maxWidth: 400, mr: 2 }}
          />
          
          <Tooltip title="Filter">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          
          {selectedMessages.length > 0 && (
            <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
              <Tooltip title="Mark as read">
                <IconButton onClick={handleMarkAsRead} size="small">
                  <MarkEmailReadIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Mark as unread">
                <IconButton onClick={handleMarkAsUnread} size="small">
                  <MarkEmailUnreadIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton onClick={handleDeleteSelected} size="small">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Box>

        <Grid container spacing={2} sx={{ height: 'calc(100vh - 280px)' }}>
          <Grid item xs={12} md={5} lg={4}>
            {renderMessageList()}
          </Grid>
          <Grid item xs={12} md={7} lg={8}>
            {renderMessageDetail()}
          </Grid>
        </Grid>
      </Box>

      {/* Compose Dialog */}
      <Dialog 
        open={composeOpen} 
        onClose={() => setComposeOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>New Message</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="To"
              autoFocus
              size="small"
            />
            <TextField
              margin="normal"
              fullWidth
              label="Cc"
              size="small"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Subject"
              size="small"
            />
            <TextField
              margin="normal"
              fullWidth
              multiline
              rows={10}
              variant="outlined"
              placeholder="Write your message here..."
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Box>
                <IconButton>
                  <AttachFileIcon />
                </IconButton>
                <IconButton>
                  <InsertEmoticonIcon />
                </IconButton>
              </Box>
              <Box>
                <Button 
                  variant="contained" 
                  color="primary"
                  startIcon={<SendIcon />}
                  sx={{ ml: 1 }}
                >
                  Send
                </Button>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Reply/Forward Dialog */}
      <Dialog 
        open={replyOpen} 
        onClose={() => setReplyOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {replyType === 'reply' ? 'Reply' : replyType === 'replyAll' ? 'Reply All' : 'Forward'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="To"
              defaultValue={replyType === 'forward' ? '' : selectedMessage?.from.email}
              autoFocus
              size="small"
            />
            <TextField
              margin="normal"
              fullWidth
              label="Subject"
              defaultValue={`${replyType === 'forward' ? 'Fwd: ' : replyType === 'reply' ? 'Re: ' : 'Re: '}${selectedMessage?.subject || ''}`}
              size="small"
            />
            <TextField
              margin="normal"
              fullWidth
              multiline
              rows={10}
              variant="outlined"
              placeholder="Write your message here..."
              defaultValue={
                replyType === 'forward' 
                  ? `\n\n---------- Forwarded message ---------\nFrom: ${selectedMessage?.from.name} <${selectedMessage?.from.email}>\nDate: ${format(selectedMessage?.date || new Date(), 'PPpp')}\nSubject: ${selectedMessage?.subject}\n\n${selectedMessage?.body}`
                  : `\n\nOn ${format(selectedMessage?.date || new Date(), 'PPpp')}, ${selectedMessage?.from.name} <${selectedMessage?.from.email}> wrote:\n> ${(selectedMessage?.body || '').replace(/\n/g, '\n> ')}`
              }
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Box>
                <IconButton>
                  <AttachFileIcon />
                </IconButton>
                <IconButton>
                  <InsertEmoticonIcon />
                </IconButton>
              </Box>
              <Box>
                <Button 
                  variant="contained" 
                  color="primary"
                  startIcon={<SendIcon />}
                  sx={{ ml: 1 }}
                >
                  Send
                </Button>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Message Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <ReplyIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Reply</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <ReplyAllIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Reply All</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <ForwardIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Forward</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <ArchiveIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Archive</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <ReportIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Report Spam</ListItemText>
        </MenuItem>
        <MenuItem 
          onClick={() => {
            if (selectedMessage) handleDeleteMessage(selectedMessage.id);
            handleMenuClose();
          }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Layout>
  );
};

export default MessagesPage;
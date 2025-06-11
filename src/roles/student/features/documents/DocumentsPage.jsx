import React, { useState } from 'react';
import {
  Box, Typography, Paper, Grid, Card, CardContent, CardActionArea,
  Button, IconButton, Chip, TextField, InputAdornment, Divider,
  Tabs, Tab, useMediaQuery, TablePagination, Checkbox, Tooltip
} from '@mui/material';
import {
  Search as SearchIcon, FilterList as FilterListIcon, Sort as SortIcon,
  CloudUpload as CloudUploadIcon, CreateNewFolder as CreateNewFolderIcon,
  Folder as FolderIcon, InsertDriveFile as FileIcon, Star as StarIcon,
  StarBorder as StarBorderIcon, CloudDownload as DownloadIcon,
  Share as ShareIcon, Delete as DeleteIcon, MoreVert as MoreVertIcon,
  Description as DescriptionIcon, ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { format } from 'date-fns';

// Mock data
const mockDocuments = [
  {
    id: '1', name: 'Course Syllabus.pdf', type: 'pdf', size: '2.4 MB',
    modified: '2023-10-15T14:30:00', starred: true, shared: false,
    tags: ['syllabus', 'important']
  },
  {
    id: '2', name: 'Lecture Notes - Week 1.docx', type: 'doc', size: '1.2 MB',
    modified: '2023-10-14T10:15:00', starred: false, shared: true,
    tags: ['lecture', 'notes']
  },
  {
    id: '3', name: 'Assignment 1 - Research Paper.pdf', type: 'pdf', size: '3.1 MB',
    modified: '2023-10-12T16:45:00', starred: true, shared: false,
    tags: ['assignment', 'submitted']
  },
  {
    id: '4', name: 'Group Project Presentation.pptx', type: 'ppt', size: '5.7 MB',
    modified: '2023-10-10T09:20:00', starred: false, shared: true,
    tags: ['group', 'project']
  },
  {
    id: '5', name: 'Study Guide.xlsx', type: 'xls', size: '1.8 MB',
    modified: '2023-10-08T11:30:00', starred: false, shared: false,
    tags: ['study']
  }
];

const mockFolders = [
  { id: 'f1', name: 'Course Materials', count: 24, modified: '2023-10-14T11:30:00' },
  { id: 'f2', name: 'Assignments', count: 8, modified: '2023-10-12T15:45:00' },
  { id: 'f3', name: 'Research Papers', count: 12, modified: '2023-10-10T09:15:00' },
  { id: 'f4', name: 'Study Guides', count: 5, modified: '2023-10-08T14:20:00' }
];

const fileIcons = {
  pdf: <FileIcon color="error" />,
  doc: <FileIcon color="primary" />,
  docx: <FileIcon color="primary" />,
  xls: <FileIcon sx={{ color: '#1d6f42' }} />,
  xlsx: <FileIcon sx={{ color: '#1d6f42' }} />,
  ppt: <FileIcon color="warning" />,
  pptx: <FileIcon color="warning" />,
  jpg: <FileIcon color="primary" />,
  png: <FileIcon color="primary" />,
  other: <FileIcon />
};

const DocumentsPage = () => {
  const [documents, setDocuments] = useState(mockDocuments);
  const [folders, setFolders] = useState(mockFolders);
  const [searchQuery, setSearchQuery] = useState('');
  const [selected, setSelected] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [currentFolder, setCurrentFolder] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [activeTab, setActiveTab] = useState('all');
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  // Filter documents based on search and active tab
  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'starred' && doc.starred) ||
      (activeTab === 'shared' && doc.shared) ||
      doc.tags.includes(activeTab);
    
    return matchesSearch && matchesTab;
  });

  // Handle file selection
  const handleSelect = (id) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Toggle star status
  const toggleStar = (id) => {
    setDocuments(docs => docs.map(doc => 
      doc.id === id ? { ...doc, starred: !doc.starred } : doc
    ));
  };

  // Handle file upload
  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map(file => ({
      id: `new-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      type: file.name.split('.').pop().toLowerCase(),
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      modified: new Date().toISOString(),
      starred: false,
      shared: false,
      tags: []
    }));
    setDocuments([...newFiles, ...documents]);
  };

  // Get all unique tags
  const allTags = [...new Set(documents.flatMap(doc => doc.tags))];

  return (
    <Box sx={{ p: isMobile ? 1 : 3 }}>
      {/* Header */}
      <Box mb={3}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom={false}>
              {currentFolder ? currentFolder.name : 'My Documents'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {currentFolder 
                ? `${currentFolder.count} items`
                : `${documents.length} documents • ${folders.length} folders`}
            </Typography>
          </Box>
          
          <Box display="flex" gap={1}>
            <Button
              variant="contained"
              startIcon={<CloudUploadIcon />}
              onClick={() => document.getElementById('file-upload').click()}
            >
              Upload
            </Button>
            <input
              id="file-upload"
              type="file"
              multiple
              style={{ display: 'none' }}
              onChange={handleUpload}
            />
            
            <Button
              variant="outlined"
              startIcon={<CreateNewFolderIcon />}
            >
              New Folder
            </Button>
          </Box>
        </Box>
        
        {/* Search and filter */}
        <Box display="flex" gap={2} mb={3} flexWrap="wrap">
          <TextField
            placeholder="Search documents..."
            variant="outlined"
            size="small"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              sx: { maxWidth: 400 },
            }}
          />
          
          <Box display="flex" gap={1} flexWrap="wrap">
            <Button
              variant={viewMode === 'grid' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setViewMode('grid')}
            >
              Grid
            </Button>
            <Button
              variant={viewMode === 'list' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setViewMode('list')}
            >
              List
            </Button>
          </Box>
        </Box>
        
        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs 
            value={activeTab} 
            onChange={(e, newValue) => setActiveTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="All Files" value="all" />
            <Tab label="Starred" value="starred" icon={<StarIcon fontSize="small" />} />
            <Tab label="Shared" value="shared" icon={<ShareIcon fontSize="small" />} />
            
            {allTags.slice(0, 3).map(tag => (
              <Tab key={tag} label={tag} value={tag} />
            ))}
          </Tabs>
        </Box>
      </Box>
      
      {/* Content */}
      {viewMode === 'grid' ? (
        <Box>
          {/* Folders */}
          {!currentFolder && folders.length > 0 && (
            <Box mb={4}>
              <Typography variant="h6" gutterBottom>Folders</Typography>
              <Grid container spacing={2}>
                {folders.map(folder => (
                  <Grid item xs={6} sm={4} md={3} lg={2} key={folder.id}>
                    <Card>
                      <CardActionArea 
                        sx={{ p: 2, textAlign: 'center' }}
                        onClick={() => setCurrentFolder(folder)}
                      >
                        <FolderIcon sx={{ fontSize: 50, color: 'warning.main', mb: 1 }} />
                        <Typography noWrap>{folder.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {folder.count} items
                        </Typography>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
          
          {/* Files */}
          <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">
                {currentFolder ? 'Files' : 'Recent Files'}
              </Typography>
              
              {selected.length > 0 && (
                <Box display="flex" gap={1}>
                  <Button size="small" startIcon={<CloudDownloadIcon />}>
                    Download
                  </Button>
                  <Button size="small" startIcon={<ShareIcon />}>
                    Share
                  </Button>
                  <Button 
                    size="small" 
                    startIcon={<DeleteIcon />}
                    color="error"
                  >
                    Delete
                  </Button>
                </Box>
              )}
            </Box>
            
            {filteredDocs.length > 0 ? (
              <Grid container spacing={2}>
                {filteredDocs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(doc => (
                  <Grid item xs={6} sm={4} md={3} lg={2} key={doc.id}>
                    <Card 
                      sx={{ 
                        border: selected.includes(doc.id) ? '2px solid #1976d2' : 'none',
                        position: 'relative'
                      }}
                    >
                      <CardActionArea 
                        sx={{ p: 2, textAlign: 'center' }}
                        onClick={() => handleSelect(doc.id)}
                      >
                        <Checkbox
                          checked={selected.includes(doc.id)}
                          onChange={() => handleSelect(doc.id)}
                          onClick={(e) => e.stopPropagation()}
                          sx={{ 
                            position: 'absolute', 
                            top: 4, 
                            right: 4,
                            '&.Mui-checked': {
                              color: 'primary.main',
                            },
                          }}
                        />
                        
                        <Box sx={{ 
                          position: 'absolute', 
                          top: 4, 
                          left: 4,
                          cursor: 'pointer'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStar(doc.id);
                        }}
                        >
                          {doc.starred ? (
                            <StarIcon color="warning" />
                          ) : (
                            <StarBorderIcon />
                          )}
                        </Box>
                        
                        <Box sx={{ fontSize: 48, mb: 1 }}>
                          {fileIcons[doc.type] || fileIcons.other}
                        </Box>
                        
                        <Typography noWrap sx={{ mb: 0.5, fontWeight: 500 }}>
                          {doc.name.split('.').slice(0, -1).join('.')}
                        </Typography>
                        
                        <Typography variant="caption" color="text.secondary" noWrap>
                          {doc.size}
                        </Typography>
                        
                        <Box sx={{ mt: 1 }}>
                          {doc.tags.slice(0, 2).map((tag, i) => (
                            <Chip 
                              key={i} 
                              label={tag} 
                              size="small" 
                              sx={{ mr: 0.5, mb: 0.5, fontSize: '0.6rem' }}
                            />
                          ))}
                          {doc.tags.length > 2 && (
                            <Chip 
                              label={`+${doc.tags.length - 2}`} 
                              size="small"
                              sx={{ fontSize: '0.6rem' }}
                            />
                          )}
                        </Box>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
                <Box sx={{ maxWidth: 400, mx: 'auto' }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      bgcolor: 'action.hover',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                    }}
                  >
                    <DescriptionIcon sx={{ fontSize: 40, color: 'text.secondary' }} />
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    No documents found
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {searchQuery 
                      ? 'No documents match your search.'
                      : 'Upload your first document to get started.'}
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    onClick={() => document.getElementById('file-upload').click()}
                  >
                    Upload Files
                  </Button>
                </Box>
              </Paper>
            )}
            
            <Box display="flex" justifyContent="center" mt={3}>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredDocs.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(e, newPage) => setPage(newPage)}
                onRowsPerPageChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value, 10));
                  setPage(0);
                }}
              />
            </Box>
          </Box>
        </Box>
      ) : (
        // List View (simplified)
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="subtitle1" color="text.secondary" mb={2}>
            List view is not fully implemented in this demo.
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => setViewMode('grid')}
            startIcon={<ArrowBackIcon />}
          >
            Back to Grid View
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default DocumentsPage;

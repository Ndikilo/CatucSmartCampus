import React, { useState, useEffect } from 'react';
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
  Menu,
  MenuItem,
  Tooltip,
  Chip,
  Avatar,
  LinearProgress,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Snackbar,
  Alert,
  Tabs,
  Tab
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Book as BookIcon,
  Person as PersonIcon,
  Category as CategoryIcon,
  Event as EventIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Visibility as VisibilityIcon,
  FileDownload as DownloadIcon,
  Print as PrintIcon,
  Sort as SortIcon,
  Close as CloseIcon,
  Bookmark as BookmarkIcon,
  LocalLibrary as LocalLibraryIcon,
  MenuBook as MenuBookIcon
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import Layout from '@common/components/Layout';

// Sample data - Replace with actual API calls
const categories = [
  'Fiction', 'Non-Fiction', 'Science', 'Technology', 'History', 'Biography', 'Reference'
];

const statuses = [
  'Available', 'Checked Out', 'On Hold', 'Lost', 'Under Maintenance'
];

const generateBooks = (count = 25) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `BK${1000 + i}`,
    title: `Book Title ${i + 1}`,
    author: `Author ${String.fromCharCode(65 + (i % 26))}. Lastname`,
    isbn: `978-${Math.floor(Math.random() * 90000) + 10000}-${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 10)}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    publishedYear: 2020 + Math.floor(Math.random() * 5),
    copies: Math.floor(Math.random() * 10) + 1,
    available: Math.floor(Math.random() * 5) + 1,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    addedDate: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365)),
    coverImage: `https://picsum.photos/200/300?random=${i}`
  }));
};

const LibraryManagementPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [tabValue, setTabValue] = useState(0);
  const [filters, setFilters] = useState({
    category: [],
    status: [],
    yearRange: [2000, new Date().getFullYear()]
  });

  // Generate sample data on component mount
  useEffect(() => {
    const fetchData = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setBooks(generateBooks(50));
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = filteredBooks.map((book) => book.id);
      setSelectedBooks(newSelected);
      return;
    }
    setSelectedBooks([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selectedBooks.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedBooks, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedBooks.slice(1));
    } else if (selectedIndex === selectedBooks.length - 1) {
      newSelected = newSelected.concat(selectedBooks.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedBooks.slice(0, selectedIndex),
        selectedBooks.slice(selectedIndex + 1),
      );
    }

    setSelectedBooks(newSelected);
  };

  const handleMenuOpen = (event, book) => {
    setAnchorEl(event.currentTarget);
    setCurrentBook(book);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentBook(null);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentBook(null);
  };

  const handleSaveBook = (bookData) => {
    // Simulate API call to save book
    setSnackbar({
      open: true,
      message: currentBook ? 'Book updated successfully' : 'Book added successfully',
      severity: 'success'
    });
    handleCloseDialog();
  };

  const handleDeleteBook = (bookId) => {
    // Simulate API call to delete book
    setBooks(books.filter(book => book.id !== bookId));
    setSnackbar({
      open: true,
      message: 'Book deleted successfully',
      severity: 'success'
    });
    handleMenuClose();
  };

  const handleCheckout = (bookId) => {
    // Simulate checkout process
    setSnackbar({
      open: true,
      message: 'Book checked out successfully',
      severity: 'success'
    });
    handleMenuClose();
  };

  const filteredBooks = books
    .filter(book => 
      (book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
       book.isbn.includes(searchTerm)) &&
      (filters.category.length === 0 || filters.category.includes(book.category)) &&
      (filters.status.length === 0 || filters.status.includes(book.status)) &&
      (book.publishedYear >= filters.yearRange[0] && 
       book.publishedYear <= filters.yearRange[1])
    );

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
    setPage(0);
  };

  const renderBookList = () => (
    <Paper variant="outlined" sx={{ width: '100%', overflow: 'hidden', mb: 2 }}>
      <TableContainer sx={{ maxHeight: 'calc(100vh - 300px)' }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedBooks.length > 0 &&
                    selectedBooks.length < filteredBooks.length
                  }
                  checked={
                    filteredBooks.length > 0 &&
                    selectedBooks.length === filteredBooks.length
                  }
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="center">ISBN</TableCell>
              <TableCell align="center">Year</TableCell>
              <TableCell align="center">Copies</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBooks
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((book) => {
                const isSelected = selectedBooks.indexOf(book.id) !== -1;

                return (
                  <TableRow
                    hover
                    key={book.id}
                    selected={isSelected}
                    onClick={(event) => handleClick(event, book.id)}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={isSelected} />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          variant="rounded"
                          src={book.coverImage}
                          alt={book.title}
                          sx={{ width: 40, height: 60, mr: 2, bgcolor: 'primary.light' }}
                        >
                          <BookIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2">{book.title}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            ID: {book.id}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>
                      <Chip
                        label={book.category}
                        size="small"
                        variant="outlined"
                        icon={<CategoryIcon />}
                      />
                    </TableCell>
                    <TableCell align="center">{book.isbn}</TableCell>
                    <TableCell align="center">{book.publishedYear}</TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="body2" sx={{ mr: 1 }}>
                          {book.available}/{book.copies}
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={(book.available / book.copies) * 100}
                          sx={{ height: 8, width: 40, borderRadius: 4 }}
                          color={
                            (book.available / book.copies) > 0.5 ? 'success' :
                            (book.available / book.copies) > 0.2 ? 'warning' : 'error'
                          }
                        />
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={book.status}
                        size="small"
                        color={
                          book.status === 'Available' ? 'success' :
                          book.status === 'Checked Out' ? 'error' :
                          book.status === 'On Hold' ? 'warning' : 'default'
                        }
                        icon={
                          book.status === 'Available' ? <CheckCircleIcon /> :
                          book.status === 'Checked Out' ? <CancelIcon /> :
                          <EventIcon />
                        }
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMenuOpen(e, book);
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredBooks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );

  const renderStats = () => (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Total Books
            </Typography>
            <Box display="flex" alignItems="center">
              <BookIcon color="primary" sx={{ fontSize: 40, mr: 1 }} />
              <Typography variant="h4">
                {books.reduce((sum, book) => sum + book.copies, 0).toLocaleString()}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Available Now
            </Typography>
            <Box display="flex" alignItems="center">
              <LocalLibraryIcon color="success" sx={{ fontSize: 40, mr: 1 }} />
              <Typography variant="h4">
                {books.reduce((sum, book) => sum + book.available, 0).toLocaleString()}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Categories
            </Typography>
            <Box display="flex" alignItems="center">
              <CategoryIcon color="warning" sx={{ fontSize: 40, mr: 1 }} />
              <Typography variant="h4">{categories.length}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Checked Out
            </Typography>
            <Box display="flex" alignItems="center">
              <MenuBookIcon color="error" sx={{ fontSize: 40, mr: 1 }} />
              <Typography variant="h4">
                {books.reduce((sum, book) => sum + (book.copies - book.available), 0).toLocaleString()}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  if (loading) {
    return (
      <Layout>
        <Box sx={{ p: 3 }}>
          <LinearProgress />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Library Management
          </Typography>
          <Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenDialog}
              sx={{ mr: 1 }}
            >
              Add New Book
            </Button>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              sx={{ mr: 1 }}
            >
              Export
            </Button>
            <Button
              variant="outlined"
              startIcon={<PrintIcon />}
            >
              Print
            </Button>
          </Box>
        </Box>

        {renderStats()}

        <Card variant="outlined" sx={{ mb: 3 }}>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search books by title, author, or ISBN..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Category</InputLabel>
                  <Select
                    multiple
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    input={<OutlinedInput label="Category" />}
                    renderValue={(selected) => selected.join(', ')}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        <Checkbox checked={filters.category.indexOf(category) > -1} />
                        <ListItemText primary={category} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Status</InputLabel>
                  <Select
                    multiple
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    input={<OutlinedInput label="Status" />}
                    renderValue={(selected) => selected.join(', ')}
                  >
                    {statuses.map((status) => (
                      <MenuItem key={status} value={status}>
                        <Checkbox checked={filters.status.indexOf(status) > -1} />
                        <ListItemText primary={status} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <DatePicker
                      label="From Year"
                      views={['year']}
                      value={filters.yearRange[0]}
                      onChange={(newValue) => 
                        handleFilterChange('yearRange', [newValue.getFullYear(), filters.yearRange[1]])
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          sx={{ flex: 1, mr: 1 }}
                        />
                      )}
                    />
                    <Typography sx={{ mx: 1 }}>to</Typography>
                    <DatePicker
                      label="To Year"
                      views={['year']}
                      value={filters.yearRange[1]}
                      onChange={(newValue) => 
                        handleFilterChange('yearRange', [filters.yearRange[0], newValue.getFullYear()])
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          sx={{ flex: 1 }}
                        />
                      )}
                    />
                  </Box>
                </LocalizationProvider>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="All Books" />
          <Tab label="Available" />
          <Tab label="Checked Out" />
          <Tab label="On Hold" />
          <Tab label="Overdue" />
        </Tabs>

        {renderBookList()}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Showing {Math.min(page * rowsPerPage + 1, filteredBooks.length)} to{' '}
            {Math.min((page + 1) * rowsPerPage, filteredBooks.length)} of {filteredBooks.length} entries
          </Typography>
          <Box>
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              disabled={selectedBooks.length === 0}
              color="error"
              sx={{ mr: 1 }}
            >
              Delete Selected
            </Button>
            <Button
              variant="outlined"
              startIcon={<BookmarkIcon />}
              disabled={selectedBooks.length === 0}
            >
              Bulk Update
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Book Details/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {currentBook ? 'Edit Book Details' : 'Add New Book'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {currentBook 
              ? 'Update the book details below.'
              : 'Fill in the details to add a new book to the library.'}
          </DialogContentText>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Title"
                  defaultValue={currentBook?.title || ''}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Author"
                  defaultValue={currentBook?.author || ''}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="ISBN"
                  defaultValue={currentBook?.isbn || ''}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Category</InputLabel>
                  <Select
                    defaultValue={currentBook?.category || ''}
                    label="Category"
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Published Year"
                  type="number"
                  defaultValue={currentBook?.publishedYear || new Date().getFullYear()}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Total Copies"
                  type="number"
                  defaultValue={currentBook?.copies || 1}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={4}
                  defaultValue="Enter book description here..."
                  margin="normal"
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={() => handleSaveBook(currentBook || {})}
            variant="contained"
          >
            {currentBook ? 'Update Book' : 'Add Book'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Book Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          handleOpenDialog();
          handleMenuClose();
        }}>
          <EditIcon sx={{ mr: 1 }} /> Edit Details
        </MenuItem>
        <MenuItem onClick={() => handleCheckout(currentBook?.id)}>
          <LocalLibraryIcon sx={{ mr: 1 }} /> Check Out
        </MenuItem>
        <MenuItem>
          <VisibilityIcon sx={{ mr: 1 }} /> View History
        </MenuItem>
        <Divider />
        <MenuItem 
          onClick={() => handleDeleteBook(currentBook?.id)}
          sx={{ color: 'error.main' }}
        >
          <DeleteIcon sx={{ mr: 1 }} /> Delete Book
        </MenuItem>
      </Menu>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
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

export default LibraryManagementPage;
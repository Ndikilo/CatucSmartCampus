import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Box,
  Container,
  Divider,
  InputAdornment,
  IconButton,
  CircularProgress,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField as MuiTextField,
  MenuItem,
  Select,
  Grid,
  FormControl,
  InputLabel,
  Paper,
  Tooltip,
  Zoom,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';

import BookCard from './BookCard';
import './styles/back-to-top.css';

// Initial categories
const initialCategories = [
  { id: 1, name: 'All', subject: 'all' },
  { id: 2, name: 'Science', subject: 'science' },
  { id: 3, name: 'Fiction', subject: 'fiction' },
  { id: 4, name: 'History', subject: 'history' },
  { id: 5, name: 'Technology', subject: 'technology' },
  { id: 6, name: 'Biography', subject: 'biography' },
];

// Available subjects for adding new categories
const availableSubjects = [
  'art', 'biography', 'business', 'comics', 'cooking', 'drama', 'economics', 'education',
  'fantasy', 'fiction', 'history', 'horror', 'humor', 'mathematics', 'medical', 'mystery',
  'philosophy', 'poetry', 'psychology', 'religion', 'romance', 'science', 'science_fiction',
  'self_help', 'technology', 'thriller', 'travel'
].sort();

const Library = () => {
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('libraryCategories');
    return saved ? JSON.parse(saved) : initialCategories;
  });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', subject: '' });
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const observer = useRef();
  
  // Handle opening the add/edit dialog
  const handleOpenDialog = (category = null) => {
    if (category) {
      setNewCategory({
        name: category.name,
        subject: category.subject
      });
      setEditingId(category.id);
    } else {
      setNewCategory({ name: '', subject: '' });
      setEditingId(null);
    }
    setOpenDialog(true);
  };
  
  // Handle category deletion
  const handleDeleteCategory = (id) => {
    // Don't allow deleting the 'all' category
    const categoryToDelete = categories.find(cat => cat.id === id);
    if (!categoryToDelete || categoryToDelete.subject === 'all') return;
    
    // Remove the category
    const updatedCategories = categories.filter(cat => cat.id !== id);
    setCategories(updatedCategories);
    
    // If the deleted category was selected, switch to 'all' category
    if (selectedCategory === categoryToDelete.subject) {
      setSelectedCategory('all');
    }
  };
  
  // Handle adding or editing a category
  const handleAddEditCategory = () => {
    if (!newCategory.name || !newCategory.subject) return;
    
    if (editingId) {
      // Update existing category
      setCategories(categories.map(cat => 
        cat.id === editingId 
          ? { ...cat, name: newCategory.name, subject: newCategory.subject }
          : cat
      ));
      setEditingId(null);
    } else {
      // Add new category
      const newCategoryItem = {
        id: Date.now().toString(),
        name: newCategory.name,
        subject: newCategory.subject
      };
      setCategories([...categories, newCategoryItem]);
    }
    
    // Reset form and close dialog
    setNewCategory({ name: '', subject: '' });
    setOpenDialog(false);
  };

  const lastBookElementRef = useCallback(node => {
    console.log('Observer ref called', node);
    if (loading) return;
    
    // Cleanup previous observer
    if (observer.current) {
      console.log('Disconnecting previous observer');
      observer.current.disconnect();
    }
    
    // Create new observer with threshold
    observer.current = new IntersectionObserver(
      entries => {
        console.log('Observer entries:', entries);
        if (entries[0].isIntersecting && hasMore) {
          console.log('Intersection detected, loading more...');
          setPage(prevPage => {
            console.log('Incrementing page:', prevPage, 'to', prevPage + 1);
            return prevPage + 1;
          });
        }
      },
      { threshold: 0.1 } // Trigger when 10% visible
    );
    
    if (node) {
      console.log('Observing node:', node);
      observer.current.observe(node);
    }
  }, [loading, hasMore]);

  // Save categories to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('libraryCategories', JSON.stringify(categories));
  }, [categories]);

  // Search handler functions are defined later in the file

  // Enhanced cache with TTL (Time To Live)
  const categoryCache = useRef({});
  const CACHE_TTL = 1000 * 60 * 30; // 30 minutes

  // Function to clean up old cache entries
  const cleanCache = () => {
    const now = Date.now();
    Object.keys(categoryCache.current).forEach(key => {
      if (categoryCache.current[key].timestamp + CACHE_TTL < now) {
        delete categoryCache.current[key];
      }
    });
  };

  // Define fetchInitialBooks first since it's used in fetchBooksByCategory
  const fetchInitialBooks = useCallback(async (reset = true) => {
    if (reset) {
      setLoading(true);
      setPage(1);
      setHasMore(true);
      setContent([]); // Clear content immediately for better UX
    } else {
      setLoadingMore(true);
    }
    
    try {
      const currentPage = reset ? 1 : page;
      const limit = 20;
      
      // Use Gutendex API for initial load as it's generally faster
      const response = await fetch(
        `https://gutendex.com/books/?page=${currentPage}&page_size=${limit}`
      );
      
      if (!response.ok) throw new Error('Failed to fetch books');
      
      const data = await response.json();
      
      const books = (data.results || []).map(book => ({
        title: book.title || 'Untitled',
        description: book.authors?.[0]?.name || 'Unknown Author',
        key: `gutendex-${book.id}-${Date.now()}`,
        link: `https://www.gutenberg.org/ebooks/${book.id}`,
        imageUrl: book.formats?.['image/jpeg'],
        source: 'gutendex',
        category: 'Featured' // Default category for initial load
      }));
      
      setContent(prevContent => 
        reset ? books : [...prevContent, ...books]
      );
      
      // Enable pagination if there are more books
      setHasMore(books.length === limit);
    } catch (error) {
      console.error('Error fetching initial books:', error);
      setHasMore(false);
      
      // Fallback to OpenLibrary if Gutendex fails
      if (reset) {
        console.log('Falling back to OpenLibrary...');
        await fetchBooksByCategory('fiction', true);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    } 
  }, [page]);

  const fetchBooksByCategory = useCallback(async (category, shouldReset = true) => {
    if (!category || category === 'all') {
      await fetchInitialBooks(shouldReset);
      return;
    }

    const currentPage = shouldReset ? 1 : page;
    const cacheKey = `${category}-${currentPage}`;
    
    // Show loading state only if not loading more
    if (shouldReset) {
      setLoading(true);
      setPage(1);
      setHasMore(true);
      setContent([]); // Clear content immediately for better UX
    } else {
      setLoadingMore(true);
    }

    try {
      // Clean up old cache entries
      cleanCache();
      
      // Check cache with timestamp
      const cached = categoryCache.current[cacheKey];
      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        setContent(cached.books);
        setHasMore(cached.books.length === 20);
        setLoading(false);
        setLoadingMore(false);
        return;
      }

      // Fetch from API with error handling and timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
      
      const limit = 20;
      const offset = (currentPage - 1) * limit;
      
      const response = await fetch(
        `https://openlibrary.org/subjects/${category}.json?limit=${limit}&offset=${offset}`,
        { signal: controller.signal }
      );
      
      clearTimeout(timeoutId);
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();

      // Validate and process books
      const books = (data.works || [])
        .filter(book => {
          // Ensure the book belongs to the requested category
          const bookCategories = (book.subject || []).map(s => s.toLowerCase());
          const requestedCategory = category.toLowerCase();
          return bookCategories.some(cat => cat.includes(requestedCategory));
        })
        .map((book, index) => ({
          title: book.title || 'Untitled',
          description: book.authors?.[0]?.name || (book.subject ? book.subject.slice(0, 3).join(', ') : 'No description'),
          key: `category-${book.key}-${currentPage}-${index}-${Date.now()}`,
          link: book.key ? `https://openlibrary.org${book.key}` : '#',
          imageUrl: book.cover_i 
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : null,
          source: 'openlibrary',
          category: category.charAt(0).toUpperCase() + category.slice(1)
        }));

      // Cache the results with timestamp
      categoryCache.current[cacheKey] = {
        books,
        timestamp: Date.now()
      };
      
      setContent(shouldReset ? books : prev => [...prev, ...books]);
      setHasMore(books.length === limit);
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error fetching category books:', error);
        // Show error to user
        setContent([]);
        setHasMore(false);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [page, fetchInitialBooks]);

  // fetchInitialBooks has been moved above to fix reference error

  // Handle infinite scroll with debounce
  useEffect(() => {
    if (page > 1) {
      const timer = setTimeout(() => {
        if (searchQuery) {
          handleSearch(false);
        } else if (selectedCategory && selectedCategory !== 'all') {
          fetchBooksByCategory(selectedCategory, false);
        } else {
          fetchInitialBooks(false);
        }
      }, 200); // Small delay to prevent rapid successive calls
      
      return () => clearTimeout(timer);
    }
  }, [page, searchQuery, selectedCategory]);

  // Handle category selection with debounce
  const handleCategorySelect = useCallback((category) => {
    // Prevent unnecessary updates if same category is selected
    if (selectedCategory === category) return;
    
    setSelectedCategory(category);
    setSearchQuery('');
    
    // Debounce the actual data fetching
    const timer = setTimeout(() => {
      if (category === 'all') {
        fetchInitialBooks(true);
      } else {
        // Clear content only after a small delay to prevent flicker during fast category switches
        setTimeout(() => setContent([]), 100);
        fetchBooksByCategory(category, true);
      }
    }, 50);
    
    return () => clearTimeout(timer);
  }, [selectedCategory, fetchBooksByCategory, fetchInitialBooks]);

  // Initial load
  useEffect(() => {
    let isMounted = true;
    
    const loadInitialData = async () => {
      try {
        setLoading(true);
        
        if (searchQuery) {
          await handleSearch(true);
        } else if (selectedCategory === 'all') {
          await fetchInitialBooks(true);
        } else {
          await fetchBooksByCategory(selectedCategory, true);
        }
      } catch (error) {
        console.error('Error loading initial data:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    
    loadInitialData();
    
    return () => {
      isMounted = false;
    };
  }, [selectedCategory, searchQuery]);

  const fetchOpenLibraryData = async (subject, reset = true) => {
    if (reset) {
      setLoading(true);
      setPage(1);
      setHasMore(true);
    } else {
      setLoadingMore(true);
    }
    
    try {
      const currentPage = reset ? 1 : page;
      const limit = 15;
      const offset = (currentPage - 1) * limit;
      
      const response = await fetch(`https://openlibrary.org/subjects/${subject}.json?limit=${limit}&offset=${offset}`);
      const data = await response.json();
      
      const books = data.works.map((book, index) => {
        const olidMatch = book.key.match(/\/works\/(OL\d+W)/);
        const olid = olidMatch ? olidMatch[1] : null;
        const imageUrl = olid
          ? `https://covers.openlibrary.org/b/olid/${olid}-M.jpg`
          : null;
          
        return {
          title: book.title,
          description: book.authors?.[0]?.name || book.subject?.slice(0, 3).join(', ') || 'No description',
          key: `openlib-${book.key}-${currentPage}-${index}`,
          link: `https://openlibrary.org${book.key}`,
          imageUrl,
          source: 'openlibrary'
        };
      });
      
      setContent(prevContent => 
        reset ? books : [...prevContent, ...books]
      );
      
      setHasMore(books.length === limit);
    } catch (error) {
      console.error('Error fetching category data:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search when Enter key is pressed
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(true);
    }
  };
  
  // Handle book search
  const handleSearch = async (reset = true) => {
    if (!searchQuery.trim()) {
      fetchInitialBooks(true);
      return;
    }

    if (reset) {
      setLoading(true);
      setPage(1);
      setHasMore(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const currentPage = reset ? 1 : page;
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}&page=${currentPage}&limit=20`
      );
      const data = await response.json();

      const books = data.docs.map((book, index) => {
        const coverId = book.cover_i;
        const imageUrl = coverId 
          ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
          : null;
          
        return {
          title: book.title,
          description: book.author_name?.join(', ') || 'No author',
          key: `search-${book.key}-${currentPage}-${index}`,
          link: `https://openlibrary.org${book.key}`,
          imageUrl,
          source: 'openlibrary-search',
          category: book.subject?.[0] || 'General'
        };
      });

      setContent(prevContent => 
        reset ? books : [...prevContent, ...books]
      );
      
      setHasMore(books.length > 0 && data.docs.length === 20);
    } catch (error) {
      console.error('Error searching books:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#f5f7fa',
    }}>
      <AppBar position="sticky" color="default" elevation={1} sx={{ backgroundColor: 'white' }}>
        <Toolbar sx={{ py: 2, gap: 2 }}>
          <Button
            onClick={() => navigate('/welcome')}
            startIcon={<ArrowBackIcon />}
            sx={{
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
              minWidth: 'auto',
              mr: 1
            }}
          >
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Back to Welcome</Box>
          </Button>
          <Typography 
            variant="h5" 
            component="div"
            sx={{ 
              fontWeight: 700, 
              color: 'primary.main',
              flexGrow: 1
            }}
          >
            Smart Campus Library
          </Typography>
          
          <Box sx={{ 
            width: { xs: '100%', sm: '400px' },
            ml: { sm: 2 }
          }}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Search books..."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                sx: { 
                  borderRadius: '999px',
                  backgroundColor: '#fff',
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                    boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)'
                  },
                  boxShadow: 2,
                },
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg" sx={{ pt: 4, pb: 4, flex: 1 }}>
        {/* Categories Row */}
        <Box sx={{ mb: 4, display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
          {categories.map((category) => (
            <Chip
              key={category.id}
              label={category.name}
              onClick={() => handleCategorySelect(category.subject)}
              onDelete={editMode && category.subject !== 'all' ? () => handleDeleteCategory(category.id) : null}
              deleteIcon={editMode && category.subject !== 'all' ? <DeleteIcon /> : null}
              color={selectedCategory === category.subject ? 'primary' : 'default'}
              variant={selectedCategory === category.subject ? 'filled' : 'outlined'}
              sx={{
                borderRadius: '16px',
                fontWeight: 'medium',
                '& .MuiChip-deleteIcon': {
                  color: 'inherit',
                  '&:hover': {
                    color: 'white',
                  },
                },
              }}
            />
          ))}
          <Tooltip title={editMode ? 'Done Editing' : 'Edit Categories'} arrow>
            <IconButton 
              onClick={() => {
                if (editMode) {
                  setEditMode(false);
                } else {
                  setEditMode(true);
                  handleOpenDialog();
                }
              }}
              color={editMode ? 'primary' : 'default'}
              sx={{ 
                ml: 1,
                ...(editMode ? {
                  backgroundColor: 'primary.light',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                } : {})
              }}
            >
              {editMode ? <AddIcon /> : <EditIcon />}
            </IconButton>
          </Tooltip>
      </Box>

      {/* Add/Edit Category Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{editingId ? 'Edit Category' : 'Add New Category'}</DialogTitle>
        <DialogContent sx={{ minWidth: 400, py: 2 }}>
          <MuiTextField
            fullWidth
            label="Category Name"
            value={newCategory.name}
            onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
            margin="normal"
            variant="outlined"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Subject</InputLabel>
            <Select
              value={newCategory.subject}
              onChange={(e) => setNewCategory({...newCategory, subject: e.target.value})}
              label="Subject"
            >
              {availableSubjects.map((subject) => (
                <MenuItem key={subject} value={subject}>
                  {subject.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleAddEditCategory} 
            variant="contained" 
            disabled={!newCategory.name || !newCategory.subject}
          >
            {editingId ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Content Area */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {loading ? (
          <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            justifyContent="center" 
            flex={1}
            minHeight="40vh"
          >
            <CircularProgress />
            <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
              Loading books...
            </Typography>
          </Box>
        ) : content.length > 0 ? (
          <>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 8, md: 12, lg: 16 }}>
              {content.map((item) => (
                <Grid item key={item.key} xs={2} sm={4} md={4} lg={4}>
                  <BookCard
                    title={item.title}
                    description={item.description}
                    imageUrl={item.imageUrl}
                    link={item.link}
                    category={item.category}
                  />
                </Grid>
              ))}
            </Grid>
            {loadingMore && (
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', py: 4, mt: 2 }}>
                <CircularProgress />
              </Box>
            )}
          </>
        ) : (
          <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            justifyContent="center" 
            flex={1}
            minHeight="40vh"
            textAlign="center"
            p={3}
          >
            <SearchIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" color="textSecondary" gutterBottom>
              No books found
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Try a different search term or browse by category
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  </Box>
  );
};

export default Library;

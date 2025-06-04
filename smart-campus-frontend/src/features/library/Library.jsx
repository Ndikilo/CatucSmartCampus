import React, { useState, useEffect, useRef, useCallback } from 'react';
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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import CategorySelector from './CategorySelector';
import BookCard from './BookCard';
import './styles/back-to-top.css';

const categories = [
  { label: 'Science', subject: 'science' },
  { label: 'History', subject: 'history' },
  { label: 'Technology', subject: 'technology' },
  { label: 'Literature', subject: 'literature' },
  { label: 'Philosophy', subject: 'philosophy' },
  { label: 'Art', subject: 'art' },
  { label: 'Mathematics', subject: 'mathematics' },
  { label: 'Biology', subject: 'biology' },
  { label: 'Physics', subject: 'physics' },
  { label: 'Chemistry', subject: 'chemistry' },
  { label: 'Psychology', subject: 'psychology' },
  { label: 'Sociology', subject: 'sociology' },
  { label: 'Economics', subject: 'economics' },
  { label: 'Politics', subject: 'politics' },
  { label: 'Religion', subject: 'religion' },
  { label: 'Poetry', subject: 'poetry' },
  { label: 'Drama', subject: 'drama' },
  { label: 'Fiction', subject: 'fiction' },
  { label: 'Non-fiction', subject: 'nonfiction' },
  { label: 'Biography', subject: 'biography' },
];

const Library = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
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

  const fetchInitialBooks = async (reset = true) => {
    if (reset) {
      setLoading(true);
      setPage(1);
      setHasMore(true);
    } else {
      setLoadingMore(true);
    }
    
    try {
      const currentPage = reset ? 1 : page;
      const limit = 20;
      
      // Fetch a variety of books from Gutendex
      const gutendexPromises = [
        fetch(`https://gutendex.com/books/?page=${currentPage}`),
        fetch(`https://gutendex.com/books/?topic=science&page=${currentPage}`),
        fetch(`https://gutendex.com/books/?topic=history&page=${currentPage}`),
        fetch(`https://gutendex.com/books/?topic=literature&page=${currentPage}`)
      ];
      
      // Fetch a variety of subjects from OpenLibrary
      const openLibraryPromises = [
        fetch(`https://openlibrary.org/subjects/history.json?limit=${limit}&offset=${(currentPage - 1) * limit}`),
        fetch(`https://openlibrary.org/subjects/science.json?limit=${limit}&offset=${(currentPage - 1) * limit}`),
        fetch(`https://openlibrary.org/subjects/literature.json?limit=${limit}&offset=${(currentPage - 1) * limit}`),
        fetch(`https://openlibrary.org/subjects/art.json?limit=${limit}&offset=${(currentPage - 1) * limit}`)
      ];
      
      // Get all responses
      const [gutendexResponses, openLibraryResponses] = await Promise.all([
        Promise.all(gutendexPromises),
        Promise.all(openLibraryPromises)
      ]);
      
      // Get all data
      const [gutendexData, openLibraryData] = await Promise.all([
        Promise.all(gutendexResponses.map(res => res.json())),
        Promise.all(openLibraryResponses.map(res => res.json()))
      ]);
      
      // Process Gutendex books from all topics
      const gutendexBooks = gutendexData.flatMap((data, index) => 
        data.results.map((book) => {
          const olidMatch = book.subjects?.find(s => s.includes('olid:'))?.split(':')[1];
          const imageUrl = olidMatch 
            ? `https://covers.openlibrary.org/b/olid/${olidMatch}-M.jpg`
            : book.formats['image/jpeg'] || null;
          
          return {
            title: book.title,
            description: book.authors.map((a) => a.name).join(', '),
            key: `gutendex-${book.id}-${currentPage}-${index}`,
            link: book.formats['text/html'] || book.formats['application/pdf'] || '#',
            imageUrl,
            isbn: book.isbn || book.subjects?.find(s => s.includes('isbn:'))?.split(':')[1],
            publishedDate: book.published_date,
            pages: book.number_of_pages,
            language: book.languages?.[0]?.code,
            bookDescription: book.description,
            source: 'gutendex',
            category: index === 0 ? 'General' : 
                     index === 1 ? 'Science' : 
                     index === 2 ? 'History' : 'Literature'
          };
        })
      );
      
      // Process OpenLibrary books from all subjects
      const openLibraryBooks = openLibraryData.flatMap((data, index) => 
        data.works.map((book, bookIndex) => {
          const olidMatch = book.key.match(/\/works\/(OL\d+W)/);
          const olid = olidMatch ? olidMatch[1] : null;
          const imageUrl = olid
            ? `https://covers.openlibrary.org/b/olid/${olid}-M.jpg`
            : null;
            
          return {
            title: book.title,
            description: book.authors?.[0]?.name || book.subject?.slice(0, 3).join(', ') || 'No description',
            key: `openlib-${book.key}-${currentPage}-${bookIndex}-${index}`,
            link: `https://openlibrary.org${book.key}`,
            imageUrl,
            source: 'openlibrary',
            category: index === 0 ? 'History' : 
                     index === 1 ? 'Science' : 
                     index === 2 ? 'Literature' : 'Art'
          };
        })
      );
      
      // Combine books from both sources and shuffle them for variety
      const books = [...gutendexBooks, ...openLibraryBooks];
      
      // Shuffle function
      const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      };
      
      // Shuffle the books to mix different categories
      const shuffledBooks = shuffle(books);
      
      setContent(prevContent => 
        reset ? shuffledBooks : [...prevContent, ...shuffledBooks]
      );
      
      // Check if there are more pages
      const hasMoreGutendex = gutendexData.some(data => data.next !== null);
      const hasMoreOpenLibrary = openLibraryData.some(data => data.works.length === limit);
      setHasMore(hasMoreGutendex || hasMoreOpenLibrary);
      setSelectedCategory(null);
    } catch (error) {
      console.error('Error fetching books:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    } 
  }

  useEffect(() => {
    if (page > 1) {
      if (searchQuery) {
        handleSearch(false);
      } else if (selectedCategory) {
        fetchOpenLibraryData(selectedCategory, false);
      } else {
        fetchInitialBooks(false);
      }
    }
  }, [page]);

  useEffect(() => {
    if (searchQuery) {
      handleSearch(true);
    } else if (selectedCategory) {
      fetchOpenLibraryData(selectedCategory, true);
    } else {
      fetchInitialBooks(true);
    }
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
      
      setHasMore(data.works.length === limit);
      setSelectedCategory(subject);
    } catch (error) {
      console.error('Error fetching category data:', error);
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
        <Toolbar sx={{ py: 1 }}>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ flexGrow: 1 }}
          >
            Smart Campus Library
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ pt: 4, pb: 4 }}>
        <Box sx={{ mb: 4 }}>
          <CategorySelector
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
        </Box>
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            placeholder="Search books..."
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 3, p: 2 }}>
          {content.length > 0 ? (
            content.map((book, index) => (
              <BookCard
                key={book.id || book.title}
                title={book.title}
                description={book.description}
                link={book.link}
                imageUrl={book.imageUrl}
                book={book}
                ref={index === content.length - 1 ? lastBookElementRef : null}
              />
            ))
          ) : (
            <Box 
              display="flex" 
              flexDirection="column" 
              alignItems="center" 
              justifyContent="center" 
              minHeight="40vh"
              textAlign="center"
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
          {loadingMore && (
            <Box sx={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Library;

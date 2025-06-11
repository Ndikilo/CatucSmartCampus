import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Link,
  CardMedia,
  Box,
  Modal,
  Paper,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const BookCard = ({ title, description, link, imageUrl, size = 'medium', book }) => {
  const sizeConfig = {
    small: {
      height: 'auto',
      imageHeight: 'auto',
      fontSize: '0.875rem',
      padding: '1rem',
    },
    medium: {
      height: 'auto',
      imageHeight: 'auto',
      fontSize: '1rem',
      padding: '1.25rem',
    },
    large: {
      height: 'auto',
      imageHeight: 'auto',
      fontSize: '1.125rem',
      padding: '1.5rem',
    },
  };

  const truncate = (str, maxLength = 100) => {
    if (!str) return '';
    return str.length > maxLength ? `${str.slice(0, maxLength)}…` : str;
  };

  const getImageHeight = (containerHeight) => {
    return (containerHeight * 2) / 3;
  };

  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Fallback image URL for when the main image fails to load
  const fallbackImageUrl = 'https://via.placeholder.com/200x300/cccccc/666666?text=No+Cover';

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleImageDoubleClick = () => {
    setShowDetails(true);
  };

  const handleDetailsClose = () => {
    setShowDetails(false);
  };

  return (
    <>
      <Box sx={{
        width: '100%',
        maxWidth: '300px',
        mb: 2,
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 2,
        },
      }}>
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: 3,
            },
            '&:hover .book-image': {
              transform: 'scale(1.05)',
            },
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: 'auto',
              position: 'relative',
              backgroundColor: '#fff',
              overflow: 'hidden',
              borderRadius: '8px',
              mb: 1,
              border: '1px solid #e0e0e0',
              padding: '0',
              boxSizing: 'border-box',
            }}
          >
            {imageUrl && !imageError ? (
              <CardMedia
                component="img"
                className="book-image"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                  '&:active': {
                    opacity: 0.8,
                  },
                }}
                image={imageUrl}
                alt={title ? `Cover of ${title}` : 'Book cover'}
                onDoubleClick={handleImageDoubleClick}
                onClick={handleOpen}
                onError={(e) => {
                  e.target.onerror = null;
                  setImageError(true);
                }}
                onLoad={() => setImageError(false)}
              />
            ) : (
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#e0e0e0',
                  color: '#757575',
                  p: 2,
                  textAlign: 'center',
                  borderRadius: '8px',
                }}
              >
                <Typography variant="caption">{imageUrl ? 'Image failed to load' : 'No cover available'}</Typography>
              </Box>
            )}
            
            {showDetails && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  p: 2,
                }}
              >
                <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
                  {title}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, textAlign: 'center' }}>
                  {description}
                </Typography>
                {book?.isbn && (
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    ISBN: {book.isbn}
                  </Typography>
                )}
                {book?.publishedDate && (
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Published: {book.publishedDate}
                  </Typography>
                )}
                {book?.pages && (
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Pages: {book.pages}
                  </Typography>
                )}
                {book?.language && (
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Language: {book.language}
                  </Typography>
                )}
                <IconButton
                  size="small"
                  sx={{ position: 'absolute', top: 8, right: 8, color: 'white' }}
                  onClick={handleDetailsClose}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            )}
          </Box>
          <CardContent
            sx={{
              p: 1,
              backgroundColor: 'transparent',
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography 
              variant="h6" 
              component="h3"
              sx={{
                fontWeight: 'medium',
                mb: 0.5,
                color: 'text.primary',
              }}
            >
              {truncate(title, 60)}
            </Typography>
            <Typography 
              variant="body2"
              sx={{
                mb: 0.5,
                color: 'text.secondary',
              }}
            >
              {truncate(description, 120)}
            </Typography>
            <Box sx={{
              mt: 'auto',
              pt: 0.5,
              textAlign: 'right',
            }}>
              <Link
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                variant="button"
                sx={{
                  fontSize: '0.875rem',
                  fontSize: sizeConfig[size].fontSize,
                  fontWeight: 'medium',
                  textDecoration: 'none',
                  color: 'primary.main',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                View Details
              </Link>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">{title}</Typography>
            <IconButton onClick={handleClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box display="flex" gap={2}>
            <Box
              sx={{
                width: '300px',
                height: '450px',
                position: 'relative',
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                image={imageUrl}
                alt={title ? `Cover of ${title}` : 'Book cover'}
              />
            </Box>
            <Box flex={1}>
              <Typography variant="body1" gutterBottom>
                <strong>Authors:</strong> {description}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>ISBN:</strong> {book?.isbn || 'Not available'}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Published:</strong> {book?.publishedDate || 'Not available'}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Pages:</strong> {book?.pages || 'Not available'}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Language:</strong> {book?.language || 'Not available'}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph sx={{ mt: 2 }}>
                <strong>Description:</strong>
                {book?.bookDescription || 'No description available'}
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary">
            Close
          </Button>
          <Button
            component={Link}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            color="primary"
          >
            View Book
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BookCard;

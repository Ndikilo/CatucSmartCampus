import React from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

const books = [
  { id: 1, title: 'Introduction to React', author: 'Jane Doe' },
  { id: 2, title: 'JavaScript Essentials', author: 'John Smith' },
  { id: 3, title: 'Web Development Basics', author: 'Alice Johnson' },
];

const Library = () => {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', my: 6, px: 2 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <LibraryBooksIcon
            color="primary"
            sx={{ fontSize: 40, mr: 2 }}
            aria-hidden="true"
          />
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              color: 'primary.dark',
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
            }}
          >
            SmartCampus Library
          </Typography>
        </Box>

        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Explore essential books for your academic journey.
        </Typography>

        <List>
          {books.map((book, index) => (
            <React.Fragment key={book.id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={book.title}
                  secondary={`Author: ${book.author}`}
                />
              </ListItem>
              {index < books.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Library;

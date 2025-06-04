import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSwipeable } from 'react-swipeable';

const CategoryButton = styled(Button)({
  minWidth: '100px',
  height: '40px',
  borderRadius: '20px',
  textTransform: 'none',
  fontSize: '0.9rem',
  fontWeight: 500,
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
});

const CategoryContainer = styled(Box)({
  display: 'flex',
  overflowX: 'auto',
  padding: '8px 0',
  gap: '8px',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

const CategorySelector = ({ categories, selectedCategory, onCategorySelect }) => {
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      const container = document.querySelector('.category-container');
      if (container) {
        container.scrollLeft += 100;
      }
    },
    onSwipedRight: () => {
      const container = document.querySelector('.category-container');
      if (container) {
        container.scrollLeft -= 100;
      }
    },
  });

  const allCategory = {
    label: 'All',
    subject: 'all',
  };

  const handleCategoryClick = (category) => {
    onCategorySelect(category);
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Categories
      </Typography>
      <CategoryContainer className="category-container" {...handlers}>
        <CategoryButton
          variant={selectedCategory?.label === 'All' ? 'contained' : 'outlined'}
          onClick={() => handleCategoryClick(allCategory)}
        >
          All
        </CategoryButton>
        {categories.map((category) => (
          <CategoryButton
            key={category.label}
            variant={selectedCategory?.label === category.label ? 'contained' : 'outlined'}
            onClick={() => handleCategoryClick(category)}
          >
            {category.label}
          </CategoryButton>
        ))}
      </CategoryContainer>
    </Box>
  );
};

export default CategorySelector;

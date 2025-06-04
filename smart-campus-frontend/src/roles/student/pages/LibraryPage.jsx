// src/roles/student/pages/LibraryPage.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Paper,
} from '@mui/material';

const encyclopediaData = [
  {
    id: 1,
    title: 'Photosynthesis',
    content: `Photosynthesis is a process used by plants and other organisms to convert light energy into chemical energy. 
It typically occurs in chloroplasts and involves the green pigment chlorophyll. The overall equation is:
6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂.`,
  },
  {
    id: 2,
    title: 'Gravity',
    content: `Gravity is a fundamental force of nature that attracts two bodies toward each other. 
It governs the motion of planets, stars, galaxies, and even light. Isaac Newton described gravity classically, 
while Einstein’s theory of general relativity refined it as the curvature of spacetime.`,
  },
  {
    id: 3,
    title: 'World War II',
    content: `World War II was a global conflict from 1939 to 1945 involving most of the world’s nations. 
The war was marked by significant events such as the Holocaust, the atomic bombings of Hiroshima and Nagasaki, 
and the creation of the United Nations. Major powers included the Allies and the Axis.`,
  },
  {
    id: 4,
    title: 'Human Brain',
    content: `The human brain is the central organ of the human nervous system. 
It controls thought, memory, emotion, touch, motor skills, vision, breathing, temperature, and more. 
It is composed of billions of neurons communicating via synapses.`,
  },
];

const LibraryPage = () => {
  const [query, setQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null);

  const filteredTopics = encyclopediaData.filter((topic) =>
    topic.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        SmartCampus Library Encyclopedia
      </Typography>
      <Typography variant="body1" gutterBottom>
        Search topics like "Photosynthesis", "World War II", or "Human Brain" to explore rich encyclopedia content.
      </Typography>

      <TextField
        label="Search encyclopedia..."
        variant="outlined"
        fullWidth
        margin="normal"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelectedTopic(null); // reset selection when typing
        }}
      />

      <List component="nav">
        {filteredTopics.map((topic) => (
          <ListItemButton
            key={topic.id}
            onClick={() => setSelectedTopic(topic)}
          >
            <ListItemText primary={topic.title} />
          </ListItemButton>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      {selectedTopic && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            {selectedTopic.title}
          </Typography>
          <Typography variant="body1" style={{ whiteSpace: 'pre-line' }}>
            {selectedTopic.content}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default LibraryPage;

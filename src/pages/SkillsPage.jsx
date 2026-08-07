import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Button,
} from '@mui/material';
import { getSkills } from '../api/skills';
import SkillCard from '../components/SkillCard';

const SkillsPage = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ category: '', type: '', search: '' });

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const res = await getSkills(filters);
      setSkills(res.data);
    } catch (err) {
      setError('Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Browse Skills
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
        <TextField
          label="Search"
          name="search"
          value={filters.search}
          onChange={handleFilterChange}
          variant="outlined"
          size="small"
        />
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            label="Category"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Programming">Programming</MenuItem>
            <MenuItem value="Design">Design</MenuItem>
            <MenuItem value="Marketing">Marketing</MenuItem>
            <MenuItem value="Music">Music</MenuItem>
            <MenuItem value="Language">Language</MenuItem>
            <MenuItem value="Cooking">Cooking</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Type</InputLabel>
          <Select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            label="Type"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="offer">Offer</MenuItem>
            <MenuItem value="learn">Learn</MenuItem>
          </Select>
        </FormControl>
        <Button variant="outlined" onClick={() => setFilters({ category: '', type: '', search: '' })}>
          Clear
        </Button>
      </Box>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : skills.length === 0 ? (
        <Typography>No skills found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {skills.map((skill) => (
            <Grid item xs={12} sm={6} md={4} key={skill._id}>
              <SkillCard skill={skill} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default SkillsPage;
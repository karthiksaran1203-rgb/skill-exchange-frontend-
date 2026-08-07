import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';
import { getSkills } from '../api/skills';
import SkillCard from '../components/SkillCard';

const HomePage = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await getSkills();
        const data = Array.isArray(res.data) ? res.data : (res.data?.data || []);
        setSkills(data.slice(0, 6)); // show latest 6
      } catch (err) {
        setError('Failed to load skills');
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to SkillExchange
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Discover skills to learn or offer your own expertise to others.
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container spacing={3}>
          {(Array.isArray(skills) ? skills : []).map((skill) => (
            <Grid item xs={12} sm={6} md={4} key={skill._id}>
              <SkillCard skill={skill} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default HomePage;
import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Grid, CircularProgress, Alert, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { getSkills } from '../api/skills';
import SkillCard from '../components/SkillCard';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const { user } = useAuth();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserSkills = async () => {
      try {
        const res = await getSkills({ user: user._id });
        setSkills(res.data);
      } catch (err) {
        setError('Failed to load your skills');
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchUserSkills();
  }, [user]);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6">Welcome, {user?.name}!</Typography>
        <Typography variant="body1">Email: {user?.email}</Typography>
      </Paper>
      <Typography variant="h5" gutterBottom>
        Your Skills
      </Typography>
      <Button
        component={Link}
        to="/skills/create"
        variant="contained"
        sx={{ mb: 2 }}
      >
        Add New Skill
      </Button>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : skills.length === 0 ? (
        <Typography>You haven't added any skills yet.</Typography>
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

export default DashboardPage;
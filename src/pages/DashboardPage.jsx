import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Grid, CircularProgress, Alert, Button, Box, useTheme, useMediaQuery } from '@mui/material';
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
    <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, md: 8 } }}>
      
      {/* Welcome Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 600 }}>
          Dashboard
        </Typography>
        <Paper elevation={0} sx={{ 
          p: 4, 
          background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.2) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
          <Typography variant="h5" sx={{ fontWeight: 500, color: 'primary.main', mb: 1 }}>Welcome back, {user?.name}!</Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)' }}>Manage your profile, skills, and exchanges all in one place.</Typography>
        </Paper>
      </Box>

      {/* Your Skills Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Your Skills
        </Typography>
        <Button
          component={Link}
          to="/skills/create"
          variant="contained"
          sx={{ background: 'linear-gradient(45deg, #42a5f5, #ba68c8)', color: 'white' }}
        >
          Add New Skill
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ backgroundColor: 'transparent', border: '1px solid rgba(255,0,0,0.3)', color: '#ff8a80' }}>{error}</Alert>
      ) : skills && skills.length === 0 ? (
        <Paper elevation={0} sx={{ p: 4, textAlign: 'center', border: '1px dashed rgba(255,255,255,0.2)', background: 'transparent' }}>
          <Typography sx={{ color: 'rgba(255,255,255,0.5)' }}>You haven't added any skills yet.</Typography>
        </Paper>
      ) : (
        <Grid container spacing={4}>
          {(skills || []).map((skill) => (
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
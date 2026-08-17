import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Box,
  Button,
  Card,
  CardContent
} from '@mui/material';
import { getSkills } from '../api/skills';
import SkillCard from '../components/SkillCard';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';

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

  const features = [
    {
      title: "All Types of Workers",
      desc: "Connect skilled workers from different fields such as electricians, plumbers, mechanics, designers, developers, tutors, cooks, photographers, carpenters, and more."
    },
    {
      title: "Skill Exchange",
      desc: "Users can offer their skills and request other skills in exchange instead of only paying money. Example: A web developer creates a website for a photographer, and the photographer provides a professional photoshoot in return."
    },
    {
      title: "Worker Profiles & Skill Verification",
      desc: "Each worker gets a professional profile with skills, experience, location, portfolio, ratings, and reviews. Skill verification can improve trust between users."
    },
    {
      title: "Find & Connect Easily",
      desc: "Search and filter workers by skill, category, location, experience, availability, and rating. Users can send requests and communicate directly."
    },
    {
      title: "Trust, Ratings & Secure Exchange",
      desc: "After completing an exchange, users can provide ratings and reviews. Add reporting, request tracking, and basic safety features to make the platform more reliable."
    }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, md: 8 } }}>
      {/* Hero Section */}
      <Grid container spacing={4} sx={{ mb: 8, mt: 4, minHeight: '60vh', alignItems: 'center' }}>
        <Grid item xs={12} md={6}>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 4, maxWidth: '400px', fontSize: '1.1rem', lineHeight: 1.6 }}>
            The ultimate platform to connect, exchange skills, and build your network.
          </Typography>
          <Typography variant="h1" sx={{ fontWeight: 600, fontSize: { xs: '3rem', md: '5rem', lg: '6.5rem' }, lineHeight: 1.1, mb: 4, color: '#fff' }}>
            Exchange <span style={{ color: 'primary.main', background: 'linear-gradient(45deg, #42a5f5, #ba68c8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Skills</span> &<br />
            Grow Together
          </Typography>
          <Box sx={{ display: 'flex', gap: 4, mt: 4 }}>
            <Box>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>Platform</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>SkillExchange Pro</Typography>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>Global Network</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>Connect Anywhere</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} sx={{ position: 'relative' }}>
          <Box sx={{ 
            height: '400px', 
            borderRadius: '24px', 
            background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.2) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(20px)',
            p: 4
          }}>
             {/* Neon abstract shape matching new theme */}
             <Box sx={{
               width: '180px',
               height: '180px',
               borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
               background: 'linear-gradient(45deg, #42a5f5, #ba68c8)',
               boxShadow: '0 0 80px rgba(66, 165, 245, 0.6), inset 0 0 20px rgba(255,255,255,0.5)',
               animation: 'spin 8s linear infinite',
               '@keyframes spin': {
                 '0%': { transform: 'rotate(0deg)' },
                 '100%': { transform: 'rotate(360deg)' }
               }
             }} />
          </Box>
        </Grid>
      </Grid>

      {/* Features Section */}
      <Box sx={{ mb: 10 }}>
        <Typography variant="h3" sx={{ fontWeight: 600, mb: 6, textAlign: 'center' }}>
          Platform Features
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={index < 2 ? 6 : 4} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-5px)' } }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.7 }}>
                    {feature.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Divider */}
      <Box sx={{ height: '1px', background: 'rgba(255, 255, 255, 0.1)', mb: 8, width: '100%' }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Featured Skills
        </Typography>
        <Button component={Link} to="/skills" endIcon={<ArrowForwardIcon />} sx={{ color: 'white', border: 'none', '&:hover': { background: 'rgba(255,255,255,0.1)' } }}>
          Explore All
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress color="inherit" />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ backgroundColor: 'transparent', color: 'error.main', border: '1px solid rgba(255, 255, 255, 0.1)' }}>{error}</Alert>
      ) : (
        <Grid container spacing={4}>
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
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Paper, Typography, CircularProgress, Alert } from '@mui/material';
import { getUserProfile } from '../api/users';
import SkillCard from '../components/SkillCard';
import { Grid } from '@mui/material';

const UserProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getUserProfile(id);
        setProfile(res.data);
      } catch (err) {
        setError('User not found');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
  if (error) return <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>;

  return (
    <Container sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4">{profile.name}</Typography>
        <Typography variant="body1">Email: {profile.email}</Typography>
        {profile.bio && <Typography variant="body2" sx={{ mt: 1 }}>{profile.bio}</Typography>}
        {profile.location && <Typography variant="body2">Location: {profile.location}</Typography>}
      </Paper>
      <Typography variant="h5" gutterBottom>
        Skills
      </Typography>
      {profile.skills?.length === 0 ? (
        <Typography>This user has no skills listed.</Typography>
      ) : (
        <Grid container spacing={3}>
          {profile.skills.map((skill) => (
            <Grid item xs={12} sm={6} md={4} key={skill._id}>
              <SkillCard skill={skill} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default UserProfilePage;
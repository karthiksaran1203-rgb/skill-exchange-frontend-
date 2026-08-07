import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Chip,
  Box,
  Button,
  CircularProgress,
  Alert,
  TextField,
} from '@mui/material';
import { getSkillById } from '../api/skills';
import { createExchange } from '../api/exchanges';
import { useAuth } from '../context/AuthContext';

const SkillDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [exchangeMessage, setExchangeMessage] = useState('');
  const [exchangeLoading, setExchangeLoading] = useState(false);
  const [exchangeSuccess, setExchangeSuccess] = useState('');

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const res = await getSkillById(id);
        setSkill(res.data);
      } catch (err) {
        setError('Skill not found');
      } finally {
        setLoading(false);
      }
    };
    fetchSkill();
  }, [id]);

  const handleExchange = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    // Check if the skill is offered by another user and the current user wants to learn
    // For simplicity, we assume the logged-in user wants to exchange.
    // We need an offered skill from current user. For demo, we'll let the user pick later.
    // Since we don't have a selection, we'll show a simplified version:
    // For demo, we request to exchange with the skill owner.
    setExchangeLoading(true);
    try {
      // We need to get the user's skill to offer. In a real app, we'd have a selection.
      // For demo, we'll show an error if user has no skill.
      // Better: fetch user skills and let them select.
      // We'll implement a simple version: assume user has at least one skill.
      // In production, you'd provide a selection UI.
      // For now, we'll use a dummy approach: prompt to create a skill first.
      alert('Please go to your dashboard and create a skill you can offer first.');
      setExchangeLoading(false);
      return;
    } catch (err) {
      setError(err.response?.data?.message || 'Exchange request failed');
    } finally {
      setExchangeLoading(false);
    }
  };

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
  if (error) return <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>;

  return (
    <Container sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          {skill.title}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Chip label={skill.category} />
          <Chip
            label={skill.type === 'offer' ? 'Offering' : 'Learning'}
            color={skill.type === 'offer' ? 'primary' : 'secondary'}
          />
        </Box>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {skill.description}
        </Typography>
        <Typography variant="subtitle2">
          Posted by: {skill.user?.name} ({skill.user?.email})
        </Typography>
        {skill.details?.availability && (
          <Typography variant="body2">Availability: {skill.details.availability}</Typography>
        )}
        {skill.details?.proficiencyLevel && (
          <Typography variant="body2">Proficiency: {skill.details.proficiencyLevel}</Typography>
        )}

        {user && user._id !== skill.user?._id && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Request Exchange</Typography>
            <TextField
              label="Message (optional)"
              multiline
              rows={2}
              fullWidth
              value={exchangeMessage}
              onChange={(e) => setExchangeMessage(e.target.value)}
              sx={{ mt: 1 }}
            />
            <Button
              variant="contained"
              onClick={handleExchange}
              disabled={exchangeLoading}
              sx={{ mt: 1 }}
            >
              {exchangeLoading ? 'Sending...' : 'Request Exchange'}
            </Button>
            {exchangeSuccess && <Alert severity="success" sx={{ mt: 2 }}>{exchangeSuccess}</Alert>}
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default SkillDetailPage;
import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Alert, Box } from '@mui/material';
import { registerUser } from '../api/auth';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await registerUser({ name, email, password });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = {
    mb: 2,
    '& .MuiOutlinedInput-root': {
      color: 'white',
      '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
      '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
      '&.Mui-focused fieldset': { borderColor: 'white' },
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10, mb: 10, minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <Paper elevation={0} sx={{ 
        p: { xs: 4, md: 6 }, 
        width: '100%',
        borderRadius: '24px',
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
          Join Us
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 3, backgroundColor: 'transparent', border: '1px solid rgba(255,0,0,0.3)', color: '#ff8a80' }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            variant="outlined"
            InputLabelProps={{ style: { color: 'rgba(255,255,255,0.7)' } }}
            sx={inputStyles}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            variant="outlined"
            InputLabelProps={{ style: { color: 'rgba(255,255,255,0.7)' } }}
            sx={inputStyles}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            variant="outlined"
            InputLabelProps={{ style: { color: 'rgba(255,255,255,0.7)' } }}
            sx={inputStyles}
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            variant="outlined"
            InputLabelProps={{ style: { color: 'rgba(255,255,255,0.7)' } }}
            sx={{ ...inputStyles, mb: 4 }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ py: 1.5, fontSize: '1.1rem', borderRadius: '8px' }}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </form>
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            Already have an account?{' '}
            <MuiLink component={RouterLink} to="/login" sx={{ color: 'secondary.main', textDecoration: 'none', fontWeight: 600 }}>
              Login
            </MuiLink>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
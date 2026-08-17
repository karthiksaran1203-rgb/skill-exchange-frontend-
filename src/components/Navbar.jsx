import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: '80px !important' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AutoAwesomeMosaicIcon sx={{ mr: 1, color: 'white' }} />
            <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'white', fontWeight: 600, letterSpacing: '-0.02em' }}>
              SkillExchange
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            {user ? (
              <>
                <Button sx={{ border: 'none', '&:hover': { background: 'transparent', color: 'secondary.main' } }} color="inherit" component={Link} to="/skills">
                  • Skills
                </Button>
                <Button sx={{ border: 'none', '&:hover': { background: 'transparent', color: 'secondary.main' } }} color="inherit" component={Link} to="/exchanges">
                  • Exchanges
                </Button>
                <Button sx={{ border: 'none', '&:hover': { background: 'transparent', color: 'secondary.main' } }} color="inherit" component={Link} to="/dashboard">
                  • Dashboard
                </Button>
                <Button variant="outlined" color="inherit" onClick={handleLogout} sx={{ ml: 2 }}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button sx={{ border: 'none', '&:hover': { background: 'transparent', color: 'secondary.main' } }} color="inherit" component={Link} to="/login">
                  • Login
                </Button>
                <Button variant="outlined" color="inherit" component={Link} to="/register">
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
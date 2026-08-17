import React from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const SkillCard = ({ skill }) => {
  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      overflow: 'hidden',
      transition: 'transform 0.3s ease, border-color 0.3s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        borderColor: 'rgba(255, 255, 255, 0.3)',
      }
    }}>
      <Box sx={{ 
        height: '200px', 
        background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.2) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        <Typography variant="h3" sx={{ color: 'rgba(255, 255, 255, 0.1)', fontWeight: 700, userSelect: 'none' }}>
          {skill.category ? skill.category.substring(0, 2).toUpperCase() : 'SK'}
        </Typography>
      </Box>
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="caption" sx={{ color: skill.type === 'offer' ? 'secondary.main' : '#4dabf5', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
          {skill.type === 'offer' ? 'Offering' : 'Learning'} • {skill.category}
        </Typography>
        <Typography variant="h5" sx={{ mt: 1, mb: 2, fontWeight: 500, color: 'white' }}>
          {skill.title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', mb: 3, lineHeight: 1.6 }}>
          {skill.description?.slice(0, 100)}...
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
           <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.4)' }}>
            by {skill.user?.name || 'Unknown'}
          </Typography>
          <Button
            component={Link}
            to={`/skills/${skill._id}`}
            sx={{ 
              minWidth: 'auto', 
              p: 1, 
              borderRadius: '50%', 
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white',
              '&:hover': { background: 'white', color: '#8f2d0a' }
            }}
          >
            <ArrowOutwardIcon fontSize="small" />
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SkillCard;
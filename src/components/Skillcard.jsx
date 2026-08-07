import React from 'react';
import { Card, CardContent, Typography, Chip, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const SkillCard = ({ skill }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {skill.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {skill.description?.slice(0, 100)}...
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip label={skill.category} size="small" />
          <Chip
            label={skill.type === 'offer' ? 'Offering' : 'Learning'}
            color={skill.type === 'offer' ? 'primary' : 'secondary'}
            size="small"
          />
        </Box>
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          by {skill.user?.name || 'Unknown'}
        </Typography>
      </CardContent>
      <Box sx={{ p: 2, pt: 0 }}>
        <Button
          component={Link}
          to={`/skills/${skill._id}`}
          variant="outlined"
          fullWidth
        >
          View Details
        </Button>
      </Box>
    </Card>
  );
};

export default SkillCard;
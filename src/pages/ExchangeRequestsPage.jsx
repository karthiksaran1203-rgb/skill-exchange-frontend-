import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Box,
} from '@mui/material';
import { getMyExchanges, updateExchangeStatus } from '../api/exchanges';
import { useAuth } from '../context/AuthContext';

const ExchangeRequestsPage = () => {
  const { user } = useAuth();
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchExchanges = async () => {
    try {
      const res = await getMyExchanges();
      setExchanges(res.data);
    } catch (err) {
      setError('Failed to load exchanges');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchanges();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateExchangeStatus(id, status);
      fetchExchanges();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
  if (error) return <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>;

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Exchange Requests
      </Typography>
      {exchanges.length === 0 ? (
        <Typography>No exchange requests.</Typography>
      ) : (
        <List>
          {exchanges.map((ex) => (
            <Paper key={ex._id} sx={{ mb: 2, p: 2 }}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    <Box display="flex" gap={1} flexWrap="wrap">
                      <Typography variant="subtitle1">
                        {ex.fromUser.name} wants to exchange
                      </Typography>
                      <Chip label={ex.offeredSkill.title} size="small" color="primary" />
                      <Typography variant="body2">for</Typography>
                      <Chip label={ex.requestedSkill.title} size="small" color="secondary" />
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" color="text.primary">
                        Status: <Chip label={ex.status} color={ex.status === 'pending' ? 'warning' : ex.status === 'accepted' ? 'success' : 'error'} size="small" />
                      </Typography>
                      {ex.message && <Typography variant="body2">Message: {ex.message}</Typography>}
                      <Typography variant="caption" display="block">
                        From: {ex.fromUser.name} | To: {ex.toUser.name}
                      </Typography>
                    </>
                  }
                />
                {ex.toUser._id === user?._id && ex.status === 'pending' && (
                  <Box>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() => handleStatusUpdate(ex._id, 'accepted')}
                      sx={{ mr: 1 }}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleStatusUpdate(ex._id, 'rejected')}
                    >
                      Reject
                    </Button>
                  </Box>
                )}
              </ListItem>
            </Paper>
          ))}
        </List>
      )}
    </Container>
  );
};

export default ExchangeRequestsPage;
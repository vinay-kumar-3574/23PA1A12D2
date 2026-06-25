import React, { useEffect } from 'react';
import { useNotifications } from '../hooks/useNotifications';
import NotificationCard from '../components/NotificationCard';
import FilterBar from '../components/FilterBar';
import PaginationBar from '../components/PaginationBar';
import { Log } from '../utils/logger';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';

export default function AllNotifications() {
  const { 
    notifications, loading, error, 
    page, limit, notificationType, 
    changePage, changeLimit, changeFilter,
    viewedIds, markAsViewed 
  } = useNotifications();

  useEffect(() => {
    Log("frontend", "info", "page", "All Notifications page rendered");
  }, []);

  return (
    <Box sx={{ maxWidth: 800, margin: '20px auto', p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        All Notifications
      </Typography>

      <FilterBar notificationType={notificationType} onChangeFilter={changeFilter} />

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}><CircularProgress /></Box>
      ) : (
        <Box>
          {notifications.length === 0 ? (
            <Typography>No notifications found.</Typography>
          ) : (
            notifications.map(n => (
              <NotificationCard 
                key={n.ID} 
                notification={n} 
                isViewed={viewedIds.includes(n.ID)}
                onClick={markAsViewed}
              />
            ))
          )}
        </Box>
      )}

      <PaginationBar page={page} limit={limit} onChangePage={changePage} onChangeLimit={changeLimit} />
    </Box>
  );
}

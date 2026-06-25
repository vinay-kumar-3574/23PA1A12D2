import React, { useState, useEffect } from 'react';
import { fetchNotifications } from '../api/notifications';
import { prioritizeNotifications } from '../utils/priority';
import NotificationCard from '../components/NotificationCard';
import { Log } from '../utils/logger';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';

export default function PriorityNotifications() {
  const [topNotifications, setTopNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [viewedIds, setViewedIds] = useState(() => {
    const saved = localStorage.getItem('viewed_notifications');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    Log("frontend", "info", "page", "Priority Notifications page rendered");
    
    async function load() {
      setLoading(true);
      try {
        // Fetch an initial batch to apply the priority logic
        const raw = await fetchNotifications({ page: 1, limit: 50, notificationType: "All" });
        const top10 = await prioritizeNotifications(raw, 10);
        setTopNotifications(top10);
      } catch (err) {
        setError("Failed to load priority notifications.");
      } finally {
        setLoading(false);
      }
    }
    
    load();
  }, []);

  const markAsViewed = (id) => {
    if (!viewedIds.includes(id)) {
      const newViewed = [...viewedIds, id];
      setViewedIds(newViewed);
      localStorage.setItem('viewed_notifications', JSON.stringify(newViewed));
      Log("frontend", "info", "action", `Notification opened: ${id}`);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: '20px auto', p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Top 10 Priority Notifications
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}><CircularProgress /></Box>
      ) : (
        <Box>
          {topNotifications.length === 0 ? (
            <Typography>No notifications found.</Typography>
          ) : (
            topNotifications.map(n => (
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
    </Box>
  );
}

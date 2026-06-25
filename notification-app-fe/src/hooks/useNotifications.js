import { useState, useEffect } from 'react';
import { fetchNotifications } from '../api/notifications.js';
import { Log } from '../utils/logger.js';

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [notificationType, setNotificationType] = useState("All");

  const [viewedIds, setViewedIds] = useState(() => {
    const saved = localStorage.getItem('viewed_notifications');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    async function loadNotifications() {
      setLoading(true);
      setError(null);
      try {
        const rawNotifications = await fetchNotifications({ page, limit, notificationType });
        setNotifications(rawNotifications);
      } catch (err) {
        setError(err.message || "Failed to load notifications.");
      } finally {
        setLoading(false);
      }
    }
    loadNotifications();
  }, [page, limit, notificationType]);

  const markAsViewed = (id) => {
    if (!viewedIds.includes(id)) {
      const newViewed = [...viewedIds, id];
      setViewedIds(newViewed);
      localStorage.setItem('viewed_notifications', JSON.stringify(newViewed));
      Log("frontend", "info", "action", `Notification opened: ${id}`);
    }
  };

  const changeFilter = (type) => {
    setNotificationType(type);
    setPage(1); 
    Log("frontend", "info", "action", `Filter changed to ${type}`);
  };

  const changePage = (newPage) => {
    setPage(newPage);
    Log("frontend", "info", "action", `Pagination changed to page ${newPage}`);
  };

  const changeLimit = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
    Log("frontend", "info", "action", `Limit changed to ${newLimit}`);
  };

  return {
    notifications, loading, error,
    page, limit, notificationType,
    changePage, changeLimit, changeFilter,
    viewedIds, markAsViewed
  };
}

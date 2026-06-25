import React, { useEffect } from 'react';
import { useNotifications } from '../hooks/useNotifications.js';
import { Log } from '../utils/logger.js';

export default function NotificationsPage() {
  const { notifications, loading, error } = useNotifications();

  
  useEffect(() => {
    Log("frontend", "info", "page", "Notifications page rendered");
  }, []);

  if (loading) {
    return <div>Loading notifications...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (notifications.length === 0) {
    return <div>No notifications found.</div>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      
      <h2>Top 10 Priority Notifications</h2>
      
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {notifications.map((notification) => (
          <li 
            key={notification.ID} 
            style={{ 
              border: '1px solid #ccc', 
              borderRadius: '8px', 
              padding: '15px', 
              marginBottom: '10px',
              backgroundColor: '#fdfdfd'
            }}
          >
            
            <div style={{ marginBottom: '6px', fontSize: '1.1em' }}>
              <strong>Type:</strong> {notification.Type}
            </div>
            
            <div style={{ marginBottom: '6px' }}>
              <strong>Message:</strong> {notification.Message}
            </div>

           
            <div style={{ fontSize: '0.85em', color: '#555', marginBottom: '4px' }}>
              <strong>ID:</strong> {notification.ID}
            </div>
            
            <div style={{ fontSize: '0.85em', color: '#888' }}>
              <strong>Time:</strong> {notification.Timestamp}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

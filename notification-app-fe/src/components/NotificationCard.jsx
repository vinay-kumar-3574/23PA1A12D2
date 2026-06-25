import React from 'react';
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import GradeIcon from '@mui/icons-material/Grade';

export default function NotificationCard({ notification, isViewed, onClick }) {
    const getIcon = () => {
        switch (notification.Type) {
            case 'Placement': return <BusinessCenterIcon fontSize="small" sx={{ mr: 1 }} />;
            case 'Result': return <GradeIcon fontSize="small" sx={{ mr: 1 }} />;
            case 'Event': return <EventIcon fontSize="small" sx={{ mr: 1 }} />;
            default: return null;
        }
    };

    return (
        <Card
            variant="outlined"
            sx={{
                mb: 2,
                backgroundColor: isViewed ? '#f5f5f5' : '#ffffff',
                borderLeft: isViewed ? '4px solid #9e9e9e' : '4px solid #1976d2'
            }}
        >
            <CardActionArea onClick={() => onClick(notification.ID)}>
                <CardContent>
                    <Typography variant="caption" color="textSecondary" sx={{ display: 'flex', alignItems: 'center' }}>
                        {getIcon()} {notification.Type} • {notification.ID}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1, mb: 1, fontWeight: isViewed ? 'normal' : 'bold' }}>
                        {notification.Message}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        {notification.Timestamp}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

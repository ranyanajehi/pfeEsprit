import React from 'react';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import { FaEdit } from 'react-icons/fa';

const EventCard = ({ event, onDelete }) => {
  return (
    <Card sx={{ width: 500, minHeight: 300, margin: 'auto', marginBottom: 4 }}>
      <FaEdit
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          cursor: 'pointer',
          color: '#1976d2' // Color for the edit icon
        }}
        size={20} // Size of the edit icon
        onClick={() => onEdit(event)}
      />
      <CardContent sx={{ paddingBottom: 1.5 }}>
        <Typography variant="h5" gutterBottom>
          {event.title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {event.description}
        </Typography>
        {event.image && (
          <img
            src={`http://localhost:4000${event.image}`}
            alt={event.title}
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover', 
              borderRadius: 8,
              marginTop: 10,
            }}
          />
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end', padding: 1.5 }}>
        <Button size="small" color="secondary" onClick={() => onDelete(event._id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default EventCard;

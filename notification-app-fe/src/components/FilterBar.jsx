import React from 'react';
import { Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';

export default function FilterBar({ notificationType, onChangeFilter }) {
  return (
    <Box sx={{ mb: 3 }}>
      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel>Type</InputLabel>
        <Select
          value={notificationType}
          label="Type"
          onChange={(e) => onChangeFilter(e.target.value)}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Placement">Placement</MenuItem>
          <MenuItem value="Result">Result</MenuItem>
          <MenuItem value="Event">Event</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

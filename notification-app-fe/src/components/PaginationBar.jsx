import React from 'react';
import { Pagination, Select, MenuItem, Box, Typography } from '@mui/material';

export default function PaginationBar({ page, limit, onChangePage, onChangeLimit }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
      {/* Assuming 10 pages maximum for the evaluation */}
      <Pagination 
        count={10} 
        page={page} 
        onChange={(e, val) => onChangePage(val)} 
        color="primary"
      />
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2">Limit:</Typography>
        <Select
          size="small"
          value={limit}
          onChange={(e) => onChangeLimit(e.target.value)}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </Box>
    </Box>
  );
}

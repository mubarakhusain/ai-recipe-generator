import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { headerStyles } from './Header.styles';

const Header: React.FC = () => {
  return (
    <AppBar position="static" sx={headerStyles.appBar}>
      <Toolbar>
        <Box sx={headerStyles.container}>
          <RestaurantMenuIcon sx={headerStyles.logo} />
          <Typography variant="h1" sx={headerStyles.title}>
            AI Recipe Generator
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 
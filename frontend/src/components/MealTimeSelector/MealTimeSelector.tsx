import React, { useState } from 'react';
import { Box, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import IcecreamIcon from '@mui/icons-material/Icecream';
import { mealTimeSelectorStyles } from './MealTimeSelector.styles';

export type MealTime = 'breakfast' | 'lunch' | 'dinner' | 'snack';

interface MealTimeSelectorProps {
  onMealTimeChange?: (mealTime: MealTime) => void;
}

const MealTimeSelector: React.FC<MealTimeSelectorProps> = ({ onMealTimeChange }) => {
  const [selectedMealTime, setSelectedMealTime] = useState<MealTime | null>(null);

  const handleMealTimeChange = (_: React.MouseEvent<HTMLElement>, newMealTime: MealTime | null) => {
    setSelectedMealTime(newMealTime);
    if (newMealTime) {
      onMealTimeChange?.(newMealTime);
    }
  };

  return (
    <Box sx={mealTimeSelectorStyles.container}>
      <Typography variant="h6" sx={mealTimeSelectorStyles.title}>
        What meal are you planning?
      </Typography>
      <ToggleButtonGroup
        value={selectedMealTime}
        exclusive
        onChange={handleMealTimeChange}
        aria-label="meal time selection"
        sx={mealTimeSelectorStyles.buttonGroup}
      >
        <ToggleButton 
          value="breakfast" 
          aria-label="breakfast"
          sx={mealTimeSelectorStyles.toggleButton}
        >
          <Box sx={mealTimeSelectorStyles.buttonContent}>
            <WbSunnyIcon />
            <Typography>Breakfast</Typography>
          </Box>
        </ToggleButton>
        <ToggleButton 
          value="lunch" 
          aria-label="lunch"
          sx={mealTimeSelectorStyles.toggleButton}
        >
          <Box sx={mealTimeSelectorStyles.buttonContent}>
            <RestaurantIcon />
            <Typography>Lunch</Typography>
          </Box>
        </ToggleButton>
        <ToggleButton 
          value="dinner" 
          aria-label="dinner"
          sx={mealTimeSelectorStyles.toggleButton}
        >
          <Box sx={mealTimeSelectorStyles.buttonContent}>
            <DinnerDiningIcon />
            <Typography>Dinner</Typography>
          </Box>
        </ToggleButton>
        <ToggleButton 
          value="snack" 
          aria-label="snack"
          sx={mealTimeSelectorStyles.toggleButton}
        >
          <Box sx={mealTimeSelectorStyles.buttonContent}>
            <IcecreamIcon />
            <Typography>Snack</Typography>
          </Box>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default MealTimeSelector; 
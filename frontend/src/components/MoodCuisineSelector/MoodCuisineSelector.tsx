import React, { useState } from 'react';
import { Box, Typography, Autocomplete, Chip, TextField, CircularProgress, Card, CardContent } from '@mui/material';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SpaIcon from '@mui/icons-material/Spa';
import PublicIcon from '@mui/icons-material/Public';
import { moodCuisineSelectorStyles } from './MoodCuisineSelector.styles';
import RecipeCard from '../RecipeCard/RecipeCard';
import { Recipe } from '../../types/recipe';
import { Preference } from './types';
import { recipeService } from '../../services/recipeService';

const preferences: Preference[] = [
  // Moods
  { id: 'spicy', label: 'Spicy', type: 'mood', icon: <LocalFireDepartmentIcon /> },
  { id: 'healthy', label: 'Healthy', type: 'mood', icon: <SpaIcon /> },
  { id: 'comfort', label: 'Comfort Food', type: 'mood', icon: <RestaurantIcon /> },
  
  // Cuisines
  { id: 'italian', label: 'Italian', type: 'cuisine', icon: <PublicIcon /> },
  { id: 'indian', label: 'Indian', type: 'cuisine', icon: <PublicIcon /> },
  { id: 'mexican', label: 'Mexican', type: 'cuisine', icon: <PublicIcon /> },
  { id: 'chinese', label: 'Chinese', type: 'cuisine', icon: <PublicIcon /> },
  { id: 'japanese', label: 'Japanese', type: 'cuisine', icon: <PublicIcon /> },
  { id: 'mediterranean', label: 'Mediterranean', type: 'cuisine', icon: <PublicIcon /> },
];

interface MoodCuisineSelectorProps {
  onPreferencesChange?: (preferences: Preference[]) => void;
  loading: boolean;
  recipe: Recipe | null;
}

const MoodCuisineSelector: React.FC<MoodCuisineSelectorProps> = ({ onPreferencesChange, loading, recipe }) => {
  const handleChange = (_: any, newValue: Preference[]) => {
    onPreferencesChange?.(newValue);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{recipe?.title}</Typography>
        <Autocomplete
          multiple
          options={preferences}
          getOptionLabel={(option) => option.label}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="Select mood or cuisine"
              sx={moodCuisineSelectorStyles.input}
            />
          )}
          renderTags={(value: Preference[], getTagProps) =>
            value.map((option: Preference, index: number) => {
              const { key, ...tagProps } = getTagProps({ index });
              return (
                <Chip
                  key={option.id}
                  label={option.label}
                  icon={option.icon}
                  {...tagProps}
                  sx={moodCuisineSelectorStyles.chip}
                />
              );
            })
          }
          renderOption={(props, option) => {
            const { key, ...otherProps } = props;
            return (
              <Box
                component="li"
                key={option.id}
                {...otherProps}
                sx={moodCuisineSelectorStyles.option}
              >
                {option.icon}
                <Typography sx={moodCuisineSelectorStyles.optionText}>
                  {option.label}
                </Typography>
                <Typography
                  variant="caption"
                  sx={moodCuisineSelectorStyles.optionType}
                >
                  {option.type}
                </Typography>
              </Box>
            );
          }}
          groupBy={(option) => option.type}
        />
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : recipe ? (
          <RecipeCard recipe={recipe} />
        ) : null}
      </CardContent>
    </Card>
  );
};

export default MoodCuisineSelector; 
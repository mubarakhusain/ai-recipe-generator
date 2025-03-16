import React, { useState } from 'react';
import {
  Box,
  TextField,
  Chip,
  Paper,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { ingredientInputStyles } from './IngredientInput.styles';

interface IngredientInputProps {
  onIngredientsChange?: (ingredients: string[]) => void;
}

const IngredientInput: React.FC<IngredientInputProps> = ({ onIngredientsChange }) => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState('');

  const handleAddIngredient = () => {
    if (currentIngredient.trim()) {
      const newIngredients = [...ingredients, currentIngredient.trim()];
      setIngredients(newIngredients);
      setCurrentIngredient('');
      onIngredientsChange?.(newIngredients);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddIngredient();
    }
  };

  const handleDeleteIngredient = (ingredientToDelete: string) => {
    const newIngredients = ingredients.filter(
      (ingredient) => ingredient !== ingredientToDelete
    );
    setIngredients(newIngredients);
    onIngredientsChange?.(newIngredients);
  };

  return (
    <Box sx={ingredientInputStyles.container}>
      <Typography variant="h6" sx={ingredientInputStyles.title}>
        What ingredients do you have?
      </Typography>
      <Paper sx={ingredientInputStyles.paper}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Enter an ingredient (e.g., chicken, rice, tomatoes)"
          value={currentIngredient}
          onChange={(e) => setCurrentIngredient(e.target.value)}
          onKeyPress={handleKeyPress}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleAddIngredient}
                  edge="end"
                  color="primary"
                  disabled={!currentIngredient.trim()}
                >
                  <AddCircleIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={ingredientInputStyles.input}
        />
        <Box sx={ingredientInputStyles.chipContainer}>
          {ingredients.map((ingredient) => (
            <Chip
              key={ingredient}
              label={ingredient}
              onDelete={() => handleDeleteIngredient(ingredient)}
              sx={ingredientInputStyles.chip}
            />
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default IngredientInput; 
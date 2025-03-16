import { ThemeProvider, CssBaseline, Container, Box, Button, CircularProgress } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import IngredientInput from './components/IngredientInput';
import MealTimeSelector, { MealTime } from './components/MealTimeSelector';
import MoodCuisineSelector from './components/MoodCuisineSelector';
import RecipeCard from './components/RecipeCard';
import { Recipe } from './types/recipe';
import { Preference } from './components/MoodCuisineSelector/types';
import { recipeService } from './services/recipeService';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFA500', // Warm orange
    },
    secondary: {
      main: '#32CD32', // Soft green
    },
    background: {
      default: '#F5F5F5', // Light gray
    },
    text: {
      primary: '#333333', // Dark gray
    },
  },
  typography: {
    fontFamily: '"Poppins", "Open Sans", sans-serif',
  },
});

function App() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [mealTime, setMealTime] = useState<MealTime | null>(null);
  const [preferences, setPreferences] = useState<Preference[]>([]);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleIngredientsChange = (newIngredients: string[]) => {
    setIngredients(newIngredients);
    setRecipe(null);
  };

  const handleMealTimeChange = (newMealTime: MealTime) => {
    setMealTime(newMealTime);
    setRecipe(null);
  };

  const handlePreferencesChange = (newPreferences: Preference[]) => {
    setPreferences(newPreferences);
    setRecipe(null);
  };

  const handleGenerateRecipe = async () => {
    if (!ingredients.length || !mealTime || !preferences.length) {
      setError('Please fill in all fields before generating a recipe');
      return;
    }

    console.log('Starting recipe generation...');
    setIsLoading(true);
    setError(null);
    setRecipe(null);

    try {
      console.log('Sending ingredients:', ingredients);
      console.log('Sending meal time:', mealTime);
      console.log('Sending preferences:', preferences.map(p => p.id));
      
      const generatedRecipe = await recipeService.generateRecipe(
        ingredients,
        mealTime,
        preferences
      );
      
      console.log('Recipe generated successfully:', generatedRecipe);
      setRecipe(generatedRecipe);
    } catch (err: any) {
      console.error('Error generating recipe:', err);
      setError(`Failed to generate recipe: ${err.message || 'Unknown error'}`);
    } finally {
      console.log('Setting loading state to false');
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Container component="main" sx={{ flex: 1, py: 4 }}>
          <Box sx={{ mb: 4 }}>
            <IngredientInput onIngredientsChange={handleIngredientsChange} />
          </Box>
          <Box sx={{ mb: 4 }}>
            <MealTimeSelector onMealTimeChange={handleMealTimeChange} />
          </Box>
          <Box sx={{ mb: 4 }}>
            <MoodCuisineSelector 
              onPreferencesChange={handlePreferencesChange}
              loading={isLoading}
              recipe={recipe}
            />
          </Box>

          {error && (
            <Box sx={{ color: 'error.main', mb: 2, textAlign: 'center' }}>
              {error}
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerateRecipe}
              disabled={isLoading || !ingredients.length || !mealTime || !preferences.length}
              sx={{ minWidth: 200 }}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Generate Recipe'}
            </Button>
          </Box>

          {isLoading && (
            <Box sx={{ textAlign: 'center', my: 4, p: 3, bgcolor: 'rgba(255, 165, 0, 0.05)', borderRadius: 2 }}>
              <CircularProgress color="primary" />
              <Box sx={{ mt: 2, fontWeight: 'bold' }}>
                Generating your perfect recipe...
              </Box>
              <Box sx={{ mt: 1, fontSize: '0.9rem', color: 'text.secondary' }}>
                This may take a few moments
              </Box>
            </Box>
          )}

          {recipe && !isLoading && (
            <Box sx={{ mt: 4 }}>
              <RecipeCard recipe={recipe} />
            </Box>
          )}
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App; 
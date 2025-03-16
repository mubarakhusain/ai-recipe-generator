import { ThemeProvider, CssBaseline, Container, Box } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Header from './components/Header';
import Footer from './components/Footer';
import IngredientInput from './components/IngredientInput';
import MealTimeSelector, { MealTime } from './components/MealTimeSelector';
import MoodCuisineSelector, { Preference } from './components/MoodCuisineSelector';
import RecipeCard, { Recipe } from './components/RecipeCard';

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

// Sample recipe data for testing
const sampleRecipe: Recipe = {
  title: 'Spicy Chicken Stir-Fry',
  prepTime: '15 mins',
  cookTime: '20 mins',
  servings: 4,
  imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=800',
  ingredients: [
    '500g chicken breast, sliced',
    '2 bell peppers, sliced',
    '1 onion, sliced',
    '3 cloves garlic, minced',
    '2 tbsp soy sauce',
    '1 tbsp sriracha sauce',
    '2 tbsp vegetable oil',
    'Salt and pepper to taste',
  ],
  instructions: [
    'Slice chicken breast into thin strips and season with salt and pepper.',
    'Heat vegetable oil in a large wok or skillet over medium-high heat.',
    'Add chicken and cook until golden brown, about 5-7 minutes.',
    'Remove chicken and set aside.',
    'In the same pan, add garlic, onions, and bell peppers. Stir-fry for 3-4 minutes.',
    'Return chicken to the pan and add soy sauce and sriracha. Stir well.',
    'Cook for another 2-3 minutes until everything is heated through.',
    'Serve hot over steamed rice.',
  ],
  tags: ['Spicy', 'Asian', 'Quick', 'High-Protein'],
};

function App() {
  const handleIngredientsChange = (ingredients: string[]) => {
    console.log('Ingredients updated:', ingredients);
  };

  const handleMealTimeChange = (mealTime: MealTime) => {
    console.log('Meal time selected:', mealTime);
  };

  const handlePreferencesChange = (preferences: Preference[]) => {
    console.log('Preferences selected:', preferences);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Header />
        <Container sx={{ flex: 1, py: 4 }}>
          <IngredientInput onIngredientsChange={handleIngredientsChange} />
          <MealTimeSelector onMealTimeChange={handleMealTimeChange} />
          <MoodCuisineSelector onPreferencesChange={handlePreferencesChange} />
          <RecipeCard recipe={sampleRecipe} />
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App; 
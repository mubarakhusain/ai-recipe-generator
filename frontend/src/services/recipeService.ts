import { Recipe } from '../types/recipe';
import { Preference } from '../components/MoodCuisineSelector/types';
import { MealTime } from '../components/MealTimeSelector';

interface GenerateRecipeRequest {
  ingredients: string[];
  mealTime: MealTime;
  preferences: string[];
}

export const recipeService = {
  generateRecipe: async (
    ingredients: string[],
    mealTime: MealTime,
    preferences: Preference[]
  ): Promise<Recipe> => {
    const request: GenerateRecipeRequest = {
      ingredients,
      mealTime,
      // Convert Preference objects to strings (their IDs)
      preferences: preferences.map(pref => pref.id)
    };

    const response = await fetch('http://localhost:3001/api/recipes/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Failed to generate recipe');
    }
    
    return response.json();
  },
}; 
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
      preferences: preferences.map(pref => pref.id)
    };

    console.log('Sending request to backend:', JSON.stringify(request, null, 2));

    try {
      // Check if required data is available
      if (!ingredients.length) {
        throw new Error('No ingredients provided');
      }
      if (!mealTime) {
        throw new Error('No meal time provided');
      }
      if (!preferences.length) {
        throw new Error('No preferences provided');
      }

      const response = await fetch('http://localhost:3001/api/recipes/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(request),
      });

      console.log('Received response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch (e) {
          console.error('Failed to parse error response as JSON:', errorText);
        }
        console.error('Error response:', errorData || errorText);
        throw new Error(errorData?.message || `Request failed with status ${response.status}`);
      }
      
      const responseText = await response.text();
      console.log('Raw response:', responseText);
      
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse response as JSON:', e);
        throw new Error('Invalid JSON response from server');
      }
      
      console.log('Parsed response data:', data);
      return data;
    } catch (error) {
      console.error('API call error:', error);
      throw error;
    }
  },
}; 
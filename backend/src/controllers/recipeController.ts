import { HfInference } from '@huggingface/inference';
import { Recipe } from '../types/recipe';
import { GenerateRecipeInput } from '../validators/recipeValidator';

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
const MODEL_ID = "gpt2";
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

async function checkModelStatus(): Promise<boolean> {
  try {
    const response = await fetch(
      `https://api-inference.huggingface.co/models/${MODEL_ID}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
        method: 'GET'
      }
    );
    
    const data = await response.json();
    return data.loaded === true;
  } catch (error) {
    console.error('Error checking model status:', error);
    return false;
  }
}

async function waitForModel(): Promise<void> {
  let isLoaded = await checkModelStatus();
  let attempts = 0;
  const maxAttempts = 10; // Maximum number of attempts to check model status

  while (!isLoaded && attempts < maxAttempts) {
    console.log(`Attempt ${attempts + 1}: Model is loading... waiting`);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Increased delay to 2 seconds
    isLoaded = await checkModelStatus();
    attempts++;
  }

  if (!isLoaded) {
    console.error('Model failed to load after maximum attempts.');
    throw new Error('Model is not ready. Please try again later.');
  }
}

async function retryWithBackoff(fn: () => Promise<any>, retries = MAX_RETRIES): Promise<any> {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;
    
    const delay = RETRY_DELAY * (MAX_RETRIES - retries + 1);
    console.log(`Retrying after ${delay}ms... (${retries} attempts remaining)`);
    await new Promise(resolve => setTimeout(resolve, delay));
    return retryWithBackoff(fn, retries - 1);
  }
}

export async function generateRecipe({
  ingredients,
  mealTime,
  preferences,
}: {
  ingredients: string[];
  mealTime?: string;
  preferences?: string[];
}): Promise<Recipe> {
  try {
    // Check if model is loaded and wait if necessary
    await waitForModel();
    
    // Generate recipe text
    const prompt = createPrompt(ingredients, mealTime, preferences);
    console.log('Sending prompt to Hugging Face:', prompt);
    
    const response = await retryWithBackoff(async () => {
      const res = await fetch(
        `https://api-inference.huggingface.co/models/${MODEL_ID}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            inputs: prompt,
            parameters: {
              max_new_tokens: 500,
              temperature: 0.8,
              do_sample: true,
              num_return_sequences: 1,
              return_full_text: false
            }
          })
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`API request failed: ${res.status} ${errorText}`);
      }

      return res;
    });

    const data = await response.json();
    
    if (!data || !Array.isArray(data) || !data[0]?.generated_text) {
      console.error('Invalid response format:', data);
      throw new Error('Invalid response format from API');
    }

    console.log('Raw response from Hugging Face:', data[0].generated_text);

    try {
      const generatedText = data[0].generated_text;
      const recipeJson = generatedText + '}';  // Add closing brace
      const recipe: Recipe = JSON.parse(recipeJson);
      return recipe;
    } catch (error) {
      console.error('Error parsing recipe:', error);
      console.log('Generated text that failed to parse:', data[0].generated_text);
      return createDefaultRecipe(ingredients, mealTime, preferences);
    }
  } catch (error) {
    console.error('Error in recipe generation:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
    return createDefaultRecipe(ingredients, mealTime, preferences);
  }
}

function createPrompt(ingredients: string[], mealTime?: string, preferences?: string[]): string {
  const ingredientsList = ingredients.join(', ');
  const preferencesText = preferences?.length ? ` It should be ${preferences.join(' and ')}.` : '';
  const mealTimeText = mealTime ? ` This is a ${mealTime} recipe.` : '';

  const prompt = `Create a recipe using these ingredients: ${ingredientsList}.${mealTimeText}${preferencesText}

The recipe should be in this JSON format:
{
  "title": "Spicy Chicken and Rice Bowl",
  "prepTime": "20 mins",
  "cookTime": "30 mins",
  "servings": 4,
  "ingredients": [
    "2 large chicken breasts, diced",
    "1.5 cups jasmine rice",
    "3 ripe tomatoes, diced"
  ],
  "instructions": [
    "Rinse rice until water runs clear",
    "Season chicken with salt, pepper, and spices",
    "Heat oil in a large pan over medium-high heat",
    "Cook chicken until golden brown, 6-8 minutes",
    "Add tomatoes and cook for 3-4 minutes",
    "Serve chicken over rice"
  ],
  "tags": ["spicy", "healthy", "dinner", "quick"]
}

Now create a new recipe with the given ingredients:
{`;

  return prompt;
}

function createDefaultRecipe(ingredients: string[], mealTime?: string, preferences?: string[]): Recipe {
  const mainIngredient = ingredients[0].charAt(0).toUpperCase() + ingredients[0].slice(1);
  
  // Enhanced default recipe with more specific instructions
  return {
    title: `${mainIngredient} with ${ingredients.slice(1).join(' and ')}`,
    prepTime: "15 mins",
    cookTime: "25 mins",
    servings: 2,
    ingredients: ingredients.map(ing => {
      switch(ing.toLowerCase()) {
        case 'chicken':
          return '2 chicken breasts, diced';
        case 'rice':
          return '1 cup white rice';
        case 'tomatoes':
          return '2 medium tomatoes, chopped';
        case 'onion':
          return '1 medium onion, diced';
        case 'garlic':
          return '3 cloves garlic, minced';
        case 'bell pepper':
          return '1 bell pepper, sliced';
        case 'carrots':
          return '2 medium carrots, sliced';
        default:
          return `1 portion ${ing}`;
      }
    }),
    instructions: [
      `Prepare ingredients: ${ingredients.map(ing => {
        switch(ing.toLowerCase()) {
          case 'chicken': return 'dice the chicken';
          case 'rice': return 'rinse the rice';
          case 'tomatoes': return 'chop the tomatoes';
          case 'onion': return 'dice the onion';
          case 'garlic': return 'mince the garlic';
          case 'bell pepper': return 'slice the bell pepper';
          case 'carrots': return 'slice the carrots';
          default: return `prepare the ${ing}`;
        }
      }).join('; ')}`,
      ingredients.includes('rice') ? "Cook rice according to package instructions" : "",
      ingredients.includes('chicken') ? "Season chicken with salt, pepper, and your preferred spices" : "",
      "Heat oil in a large pan over medium-high heat",
      ingredients.includes('chicken') ? "Cook chicken until golden brown and cooked through, about 6-8 minutes" : "",
      ingredients.includes('garlic') || ingredients.includes('onion') ? "Sauté aromatics until fragrant" : "",
      "Add remaining ingredients and cook until tender",
      preferences?.includes('spicy') ? "Add your preferred spices or hot sauce to taste" : "Season to taste with salt and pepper",
      "Serve hot" + (ingredients.includes('rice') ? " over a bed of rice" : "")
    ].filter(step => step !== ""),
    tags: [
      "easy",
      "homemade",
      ...(preferences || []),
      ...(mealTime ? [mealTime] : []),
      ingredients.includes('chicken') ? "protein-rich" : "",
      ingredients.includes('rice') ? "filling" : "",
      ingredients.some(i => ['tomatoes', 'bell pepper', 'carrots'].includes(i.toLowerCase())) ? "vegetable-rich" : ""
    ].filter(tag => tag !== ""),
  };
}

function parseRecipeResponse(response: string): Recipe {
  try {
    // Find the JSON object in the response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('No JSON found in response:', response);
      throw new Error('No valid JSON found in response');
    }

    const recipe = JSON.parse(jsonMatch[0]);
    
    // Validate required fields
    const requiredFields = ['title', 'prepTime', 'cookTime', 'servings', 'ingredients', 'instructions', 'tags'];
    const missingFields = requiredFields.filter(field => !recipe[field]);
    
    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields);
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    return {
      title: recipe.title,
      prepTime: recipe.prepTime,
      cookTime: recipe.cookTime,
      servings: recipe.servings,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      tags: recipe.tags,
    };
  } catch (error) {
    console.error('Error parsing recipe response:', error);
    throw new Error('Failed to parse recipe response');
  }
} 
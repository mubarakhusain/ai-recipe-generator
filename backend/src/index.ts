import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { HfInference } from '@huggingface/inference';

interface RecipeRequest {
  ingredients: string[];
  mealTime: string;
  preferences: string[];
}

interface RecipeResponse {
  title: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  ingredients: string[];
  instructions: string[];
  tags: string[];
}

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const hf = new HfInference(process.env.HUGGING_FACE_API_KEY);

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'], // Allow both development ports
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log('--------------------------------------------');
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Request body:', req.body);
  next();
});

const parseRecipeFromText = (text: string, ingredients: string[], mealTime: string, preferences: string[]): RecipeResponse => {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
  // Extract title (first line)
  const title = lines[0] || 'Generated Recipe';
  
  // Try to extract prep time and cook time from the text
  const prepTimeMatch = text.match(/prep(?:aration)? time:?\s*(\d+[-\s]?\d*\s*mins?)/i);
  const cookTimeMatch = text.match(/cook(?:ing)? time:?\s*(\d+[-\s]?\d*\s*mins?)/i);
  
  // Find the instructions section
  const instructionsStartIndex = lines.findIndex(line => 
    line.toLowerCase().includes('instructions:') || 
    line.toLowerCase().includes('directions:') ||
    line.toLowerCase().includes('steps:')
  );
  
  const instructions = instructionsStartIndex !== -1 
    ? lines.slice(instructionsStartIndex + 1)
        .filter(line => line.length > 0 && !line.toLowerCase().includes('ingredients:'))
    : lines.slice(1); // If no clear instructions section, use everything after title

  return {
    title,
    prepTime: prepTimeMatch ? prepTimeMatch[1] : '15-20 mins',
    cookTime: cookTimeMatch ? cookTimeMatch[1] : '30-40 mins',
    servings: 4,
    ingredients: ingredients.map(ing => ing.trim()),
    instructions,
    tags: [...preferences, mealTime.toLowerCase()]
  };
};

// Routes
app.post('/api/recipes/generate', async (
  req: Request<{}, RecipeResponse, RecipeRequest>,
  res: Response<RecipeResponse | { message: string }>
) => {
  try {
    console.log('Received recipe generation request');
    const { ingredients, mealTime, preferences } = req.body;
    
    console.log('Request data:', { ingredients, mealTime, preferences });
    
    // Validate input
    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      console.log('Invalid ingredients');
      return res.status(400).json({ message: 'Invalid ingredients' });
    }
    
    if (!mealTime) {
      console.log('Invalid meal time');
      return res.status(400).json({ message: 'Invalid meal time' });
    }
    
    if (!preferences || !Array.isArray(preferences) || preferences.length === 0) {
      console.log('Invalid preferences');
      return res.status(400).json({ message: 'Invalid preferences' });
    }

    // Generate prompt for the model
    const prompt = `Generate a detailed recipe using these ingredients: ${ingredients.join(', ')}. 
This is for ${mealTime} and should be ${preferences.join(', ')}.

Please format the recipe as follows:
[Recipe Title]

Preparation Time: [time in minutes]
Cooking Time: [time in minutes]
Servings: 4

Ingredients:
- [list each ingredient with quantity]

Instructions:
1. [First step]
2. [Second step]
...

Make sure the recipe is practical and follows the preferences: ${preferences.join(', ')}.`;

    // Call Hugging Face API
    console.log('Calling Hugging Face API with prompt:', prompt);
    const response = await hf.textGeneration({
      model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
      inputs: prompt,
      parameters: {
        max_new_tokens: 1000,
        temperature: 0.7,
        top_p: 0.95,
        return_full_text: false
      }
    });

    console.log('Received response from Hugging Face:', response);

    if (!response.generated_text) {
      throw new Error('No recipe generated');
    }

    // Parse the generated text into recipe format
    const recipe = parseRecipeFromText(
      response.generated_text,
      ingredients,
      mealTime,
      preferences
    );

    console.log('Sending recipe response:', recipe);
    return res.json(recipe);
  } catch (error) {
    console.error('Error generating recipe:', error);
    return res.status(500).json({ message: 'Failed to generate recipe' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 
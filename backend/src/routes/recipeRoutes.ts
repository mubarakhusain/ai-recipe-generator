import { Router, Request, Response } from 'express';
import { generateRecipe } from '../controllers/recipeController';
import { generateRecipeSchema, GenerateRecipeInput } from '../validators/recipeValidator';
import { ZodError } from 'zod';

const router = Router();

interface GenerateRecipeRequest extends Request {
  body: GenerateRecipeInput;
}

router.post('/generate', async (req: GenerateRecipeRequest, res: Response) => {
  try {
    // Validate input
    const validatedInput = generateRecipeSchema.parse(req.body);
    
    // Generate recipe
    const recipe = await generateRecipe(validatedInput);
    res.json(recipe);
  } catch (error) {
    console.error('Error in recipe generation:', error);
    
    if (error instanceof ZodError) {
      return res.status(400).json({
        error: 'Invalid input',
        details: error.errors
      });
    }
    
    res.status(500).json({ error: 'Failed to generate recipe' });
  }
});

export const recipeRoutes = router; 
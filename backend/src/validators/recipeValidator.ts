import { z } from 'zod';

export const generateRecipeSchema = z.object({
  ingredients: z.array(z.string()).min(1, 'At least one ingredient is required'),
  mealTime: z.enum(['breakfast', 'lunch', 'dinner', 'snack']).optional(),
  preferences: z.array(z.string()).optional(),
  generateImage: z.boolean().optional().default(false),
});

export type GenerateRecipeInput = z.infer<typeof generateRecipeSchema>; 
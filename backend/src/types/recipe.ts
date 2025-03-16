export interface Recipe {
  title: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  ingredients: string[];
  instructions: string[];
  tags: string[];
  imageUrl?: string;
} 
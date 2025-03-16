import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import GroupIcon from '@mui/icons-material/Group';
import { recipeCardStyles } from './RecipeCard.styles';

export interface Recipe {
  title: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  ingredients: string[];
  instructions: string[];
  imageUrl?: string;
  tags: string[];
}

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const {
    title,
    prepTime,
    cookTime,
    servings,
    ingredients,
    instructions,
    imageUrl,
    tags,
  } = recipe;

  return (
    <Card sx={recipeCardStyles.card}>
      <CardMedia
        component="img"
        height="300"
        image={imageUrl || '/recipe-placeholder.jpg'}
        alt={title}
        sx={recipeCardStyles.media}
      />
      <CardContent sx={recipeCardStyles.content}>
        <Typography variant="h5" sx={recipeCardStyles.title}>
          {title}
        </Typography>

        <Box sx={recipeCardStyles.tagsContainer}>
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={recipeCardStyles.tag}
            />
          ))}
        </Box>

        <Box sx={recipeCardStyles.infoContainer}>
          <Box sx={recipeCardStyles.infoItem}>
            <AccessTimeIcon />
            <Typography variant="body2">
              Prep: {prepTime}
            </Typography>
          </Box>
          <Box sx={recipeCardStyles.infoItem}>
            <RestaurantIcon />
            <Typography variant="body2">
              Cook: {cookTime}
            </Typography>
          </Box>
          <Box sx={recipeCardStyles.infoItem}>
            <GroupIcon />
            <Typography variant="body2">
              Serves: {servings}
            </Typography>
          </Box>
        </Box>

        <Divider sx={recipeCardStyles.divider} />

        <Box>
          <Typography variant="h6" sx={recipeCardStyles.sectionTitle}>
            Ingredients
          </Typography>
          <List sx={recipeCardStyles.list}>
            {ingredients.map((ingredient, index) => (
              <ListItem key={index} sx={recipeCardStyles.listItem}>
                <ListItemIcon sx={recipeCardStyles.bulletPoint}>•</ListItemIcon>
                <ListItemText primary={ingredient} />
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider sx={recipeCardStyles.divider} />

        <Box>
          <Typography variant="h6" sx={recipeCardStyles.sectionTitle}>
            Instructions
          </Typography>
          <List sx={recipeCardStyles.list}>
            {instructions.map((instruction, index) => (
              <ListItem key={index} sx={recipeCardStyles.listItem}>
                <ListItemIcon sx={recipeCardStyles.stepNumber}>
                  {index + 1}.
                </ListItemIcon>
                <ListItemText primary={instruction} />
              </ListItem>
            ))}
          </List>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecipeCard; 
# AI Recipe Generator

An intelligent recipe generation application that creates personalized recipes based on your available ingredients, meal time preferences, and dietary requirements. Built with React, TypeScript, and Node.js, powered by Hugging Face's AI models.

## Features

- Input available ingredients
- Select meal time (breakfast, lunch, dinner, snack)
- Choose cuisine preferences and dietary requirements
- Generate personalized recipes with detailed instructions
- Beautiful, responsive UI with Material-UI components

## How It Works

### Application Flow

1. **User Input Collection**:
   - Users enter ingredients they have available
   - Users select their desired meal time (breakfast, lunch, dinner, snack)
   - Users choose their preferences (e.g., spicy, vegetarian, quick)

2. **Recipe Generation Process**:
   - Frontend collects all user inputs and validates them
   - When "Generate Recipe" button is clicked, a loading state is displayed
   - Frontend sends a POST request to the backend API with the user's ingredients, meal time, and preferences
   - Backend validates the input data
   - Backend constructs a prompt for the Hugging Face AI model
   - Backend calls the Hugging Face Inference API using the Mixtral-8x7B model
   - AI generates a detailed recipe based on the provided inputs
   - Backend parses the AI response into a structured recipe format
   - Backend sends the formatted recipe back to the frontend
   - Frontend displays the recipe with all details (title, prep time, cook time, servings, ingredients, instructions)

3. **Data Structure**:
   - **Request Format**:
     ```typescript
     {
       ingredients: string[],  // Array of ingredient names
       mealTime: string,       // "breakfast", "lunch", "dinner", or "snack"
       preferences: string[]   // Array of preferences like "vegetarian", "spicy", etc.
     }
     ```
   - **Response Format**:
     ```typescript
     {
       title: string,
       prepTime: string,
       cookTime: string,
       servings: number,
       ingredients: string[],
       instructions: string[],
       tags: string[]
     }
     ```

## Tech Stack

### Frontend
- React
- TypeScript
- Material-UI
- Vite

### Backend
- Node.js
- Express
- TypeScript
- Hugging Face AI (Mixtral-8x7B-Instruct model)

## Architecture

```
┌────────────────┐         ┌─────────────────┐         ┌──────────────────┐
│                │         │                 │         │                  │
│   React UI     │ ───────▶│  Express API    │ ───────▶│  Hugging Face    │
│  (Frontend)    │         │   (Backend)     │         │    Inference     │
│                │ ◀─────── │                 │ ◀─────── │                  │
└────────────────┘         └─────────────────┘         └──────────────────┘
      User                      Server                       AI Model
    Interface                   Logic                      Integration
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mubarakhusain/ai-recipe-generator.git
cd ai-recipe-generator
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

4. Create a `.env` file in the backend directory with your Hugging Face API key:
```
PORT=3001
NODE_ENV=development
HUGGING_FACE_API_KEY=your_api_key_here
```

5. Start the development servers:

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm run dev
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

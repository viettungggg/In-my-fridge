import React, { useState } from 'react';
import IngredientInput from './components/IngredientInput';
import RecipeDisplay from './components/RecipeDisplay';
import './App.css';
import './components/styles.css';
const App = () => {
  const [recipe, setRecipe] = useState('');

  const generateRecipe = async (ingredients) => {
    try {
      const response = await fetch(`/api/suggestions?ingredients=${ingredients}`);
      const data = await response.json();
      const generatedRecipe = data.suggestion;
      setRecipe(generatedRecipe);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Recipe App</h1>
      <IngredientInput onGenerateRecipe={generateRecipe} />
      <RecipeDisplay recipe={recipe} />
    </div>
  );
};

export default App;

import React, { useState } from 'react';
import axios from 'axios';
import './IngredientInput.css';

const IngredientInput = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipeName, setRecipeName] = useState('');

  const handleInputChange = (event) => {
    setIngredients(event.target.value);
  };

  const handleGenerateClick = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/recipes/suggestions?ingredients=${ingredients}`
      );
      const suggestion = response.data.suggestion;
      const lines = suggestion.split('\n');
      const name = lines[0]; // Extract the name from the first line of the suggestion
      const body = lines.slice(1).join('\n'); // Remove the first line from the suggestion body
      setRecipe(body);
      setRecipeName(name); // Set the generated recipe name in the state
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleStoreClick = async () => {
    try {
      await axios.post('http://localhost:5000/api/recipes', {
        name: recipeName, // Use the generated recipe name instead of 'Generated Recipe'
        ingredients: ingredients.split(',').map((ingredient) => ingredient.trim()),
        instructions: recipe,
      });
      alert('Recipe stored successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter ingredients"
          value={ingredients}
          onChange={handleInputChange}
        />
        <button className="button" onClick={handleGenerateClick} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Recipe'}
        </button>
      </div>
      {recipe && (
        <div className="recipe-container">
          <h3>{recipeName}</h3> {/* Display the generated recipe name */}
          <pre>{recipe}</pre>
          <button className="button" onClick={handleStoreClick}>
            Store Recipe
          </button>
        </div>
      )}
    </div>
  );
};

export default IngredientInput;

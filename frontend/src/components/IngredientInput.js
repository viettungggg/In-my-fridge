import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

const IngredientInput = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setIngredients(event.target.value);
  };

  const handleGenerateClick = async () => {
    setLoading(true); // Set loading state to true
    try {
      const response = await axios.get(
        `http://localhost:5000/api/recipes/suggestions?ingredients=${ingredients}`
      );
      const suggestion = response.data.suggestion;
      setRecipe(suggestion);
    } catch (error) {
      console.error(error);
    }
    setLoading(false); // Set loading state back to false
  };

  const handleStoreClick = async () => {
    try {
      await axios.post('http://localhost:5000/api/recipes', {
        name: 'Generated Recipe',
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
          <h3>Generated Recipe:</h3>
          <p>{recipe}</p>
          <button className="button" onClick={handleStoreClick}>
            Store Recipe
          </button>
        </div>
      )}
    </div>
  );
};

export default IngredientInput;

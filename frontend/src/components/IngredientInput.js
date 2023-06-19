import React, { useState } from 'react';
import axios from 'axios';
import RecipeDisplay from './RecipeDisplay';
import './styles.css'

const IngredientInput = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState('');

  const handleInputChange = (event) => {
    setIngredients(event.target.value);
  };

  const handleGenerateClick = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/recipes/suggestions?ingredients=${ingredients}`);
      const suggestion = response.data.suggestion;
      setRecipe(suggestion);
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
        <button className="button" onClick={handleGenerateClick}>
          Generate Recipe
        </button>
      </div>
      {recipe && (
        <div className="recipe-container">
          <h3>Generated Recipe:</h3>
          <p>{recipe}</p>
        </div>
      )}
    </div>
  );
};

export default IngredientInput;

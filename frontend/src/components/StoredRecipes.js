import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StoredRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/recipes');
      const fetchedRecipes = response.data;
      setRecipes(fetchedRecipes);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteRecipe = async (recipeId) => {
    try {
      await axios.delete(`http://localhost:5000/api/recipes/${recipeId}`);
      fetchRecipes(); // Refresh the recipes list after deletion
      alert('Recipe deleted successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Stored Recipes</h2>
      {recipes.map((recipe) => (
        <div key={recipe._id}>
          <h3>{recipe.name}</h3>
          <ul>
            <li>Ingredients: {recipe.ingredients.join(', ')}</li>
            <li>Instructions: {recipe.instructions}</li>
          </ul>
          <button onClick={() => handleDeleteRecipe(recipe._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default StoredRecipes;

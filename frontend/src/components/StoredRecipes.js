import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StoredRecipes.css';

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

  const [expandedRecipes, setExpandedRecipes] = useState([]);

  const handleToggleExpand = (recipeId) => {
    if (expandedRecipes.includes(recipeId)) {
      setExpandedRecipes(expandedRecipes.filter((id) => id !== recipeId));
    } else {
      setExpandedRecipes([...expandedRecipes, recipeId]);
    }
  };

  const isRecipeExpanded = (recipeId) => expandedRecipes.includes(recipeId);

  return (
    <div>
      <h2>Stored Recipes</h2>
      <div className="recipe-container">
        {recipes.map((recipe) => (
          <div className="recipe-box" key={recipe._id}>
            <h3>{recipe.name}</h3>
            <ul>
              <li>
                {isRecipeExpanded(recipe._id) ? (
                  <pre>{recipe.instructions}</pre>
                ) : (
                  <pre>{recipe.instructions.slice(0, 100)}...</pre>
                )}
              </li>
            </ul>
            <div className="button-group">
              <button onClick={() => handleToggleExpand(recipe._id)}>
                {isRecipeExpanded(recipe._id) ? 'Show Less' : 'Show More'}
              </button>
              <button onClick={() => handleDeleteRecipe(recipe._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default StoredRecipes;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
      <div className="recipe-container">
        {recipes.map((recipe) => (
          <div className="recipe-box" key={recipe._id}>
            <h3>{recipe.name}</h3>
            <ul>
              <li>
                <pre>{recipe.instructions.slice(0, 100)}...</pre>
              </li>
            </ul>
            <div className="button-group">
              <Link to={`/recipes/${recipe._id}`}>
                <button>View Recipe</button>
              </Link>
              <button onClick={() => handleDeleteRecipe(recipe._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default StoredRecipes;

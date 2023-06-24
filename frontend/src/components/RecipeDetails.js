import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './RecipeDetails.css';

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetchRecipe();
  }, []);

  const fetchRecipe = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/recipes/${id}`);
      const fetchedRecipe = response.data;
      setRecipe(fetchedRecipe);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="recipe-details">
      <h2 className="recipe-details__title">{recipe.name}</h2>
      <div className="recipe-details__section">
      </div>
      <div className="recipe-details__section">
        <pre className="recipe-details__instructions">{recipe.instructions}</pre>
      </div>
    </div>
  );
};

export default RecipeDetails;

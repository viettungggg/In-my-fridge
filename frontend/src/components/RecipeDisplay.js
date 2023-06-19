import React from 'react';

const RecipeDisplay = ({ recipe }) => {
  return (
    <div>
      <h3>Generated Recipe:</h3>
      <p>{recipe}</p>
    </div>
  );
};

export default RecipeDisplay;
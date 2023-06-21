import React, { useState } from 'react';
import IngredientInput from './components/IngredientInput';
import RecipeDisplay from './components/StoredRecipes';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import './components/styles.css';
// const App = () => {
//   const [recipe, setRecipe] = useState('');

//   const generateRecipe = async (ingredients) => {
//     try {
//       const response = await fetch(`/api/suggestions?ingredients=${ingredients}`);
//       const data = await response.json();
//       const generatedRecipe = data.suggestion;
//       setRecipe(generatedRecipe);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Recipe App</h1>
//       <IngredientInput onGenerateRecipe={generateRecipe} />
//       <RecipeDisplay recipe={recipe} />
//     </div>
//   );
// };
const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Generate Recipe</Link>
            </li>
            <li>
              <Link to="/recipes">Show Recipes</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<IngredientInput />} />
          <Route path="/recipes" element={<RecipeDisplay />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

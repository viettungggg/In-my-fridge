import React from 'react';
import IngredientInput from './components/IngredientInput';
import RecipeDisplay from './components/StoredRecipes';
import RecipeDetails from './components/RecipeDetails';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <div className="navbar-logo">
            <img src="/logo/logo.png" className="logo-image" />
          </div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Generate Recipe
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/recipes" className="nav-link">
                Show Recipes
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<IngredientInput />} />
          <Route path="/recipes" element={<RecipeDisplay />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

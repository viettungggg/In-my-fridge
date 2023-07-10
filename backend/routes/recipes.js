const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');
const dotenv = require('dotenv');
dotenv.config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
const openai = new OpenAIApi(configuration);
router.get('/suggestions', async (req, res) => {
  try {
    // Extract the ingredients from the request query parameters
    const { ingredients } = req.query;

    // Define the prompt for generating recipe suggestions
    const prompt = `User Query: "Can you provide a recipe using the following ingredients: ${ingredients}?"
    Context: Your website is a recipe sharing platform. Users can search for recipes and get detailed instructions. The goal is to generate user-friendly and easy-to-follow instructions in response to recipe queries.
    Instructions: Generate step-by-step instructions for a recipe using the given ingredients. Make the instructions beginner-friendly and use simple language. Avoid using complex culinary terms or techniques.`;

    // Make a request to the OpenAI API to generate recipe suggestions
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 1000,
      temperature: 0,
    });

    // Extract the generated recipe suggestion from the OpenAI API response
    const recipeSuggestion = response.data.choices[0].text.trim();

    // Return the recipe suggestion as the response
    res.json({ suggestion: recipeSuggestion });
  } catch (error) {
    // Handle any errors that occur during the request
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, ingredients, instructions } = req.body;
    const recipe = new Recipe({ name, ingredients, instructions });
    await recipe.save();
    res.json({ message: 'Recipe stored successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const recipeId = req.params.id;
    await Recipe.findByIdAndDelete(recipeId);
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
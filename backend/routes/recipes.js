const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');
const dotenv = require('dotenv');
dotenv.config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
console.log(process.env.OPENAI_API_KEY)
const openai = new OpenAIApi(configuration);
router.get('/suggestions', async (req, res) => {
  try {
    // Extract the ingredients from the request query parameters
    const { ingredients } = req.query;

    // Make a request to the OpenAI API to generate recipe suggestions
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `I have the following ingredients in my fridge: ${ingredients}. Generate a recipe.`,
        max_tokens: 1000,
        temperature: 0,
      })

    // Extract the generated recipe suggestion from the OpenAI API response
    const recipeSuggestion = response.data.choices[0].text.trim();

    // Return the recipe suggestion as the response
    res.json({ suggestion: recipeSuggestion });
  } catch (error) {
    // Handle any errors that occur during the request
    console.error(error);
    if (error.response) {
        // The request was made and the server responded with a status code
        console.log('Response status:', error.response.status);
        console.log('Response data:', error.response.data);
    } else if (error.request) {
        // The request was made but no response was received
        console.log('No response received');
    } else {
        // Something happened in setting up the request that triggered an error
        console.log('Error message:', error.message);
    }
    
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
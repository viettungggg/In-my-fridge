const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const recipesRouter = require('./routes/recipes');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(cors());
const port = process.env.PORT || 5000;
const mongodbURI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/recipes', recipesRouter);
// Connect to MongoDB
mongoose.connect(mongodbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
console.log('MongoDB database connection established successfully');
});
console.log("hello world")
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
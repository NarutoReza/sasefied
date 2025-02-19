const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
require('dotenv').config();

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
const Router = require('./Routes/Router');
app.use('/', Router);

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("MongoDB database is connected and live...!");
  })
  .catch(() => {
    console.log("Server connection error!");
  });

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
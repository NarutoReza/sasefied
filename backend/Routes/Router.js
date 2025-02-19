const ToDo = require('../Model/ToDo');
const express = require('express');
const router = express.Router();

router.post('/add-to-do', async(req, res) => {
  const {name, description} = req.body;

  if(!name || !description) {
    return res.status(400).json({ error: 'Invalid input. Please enter name and description.'});
  }
  
  const data = new ToDo({ name, description });

  try {
    await data.save();
    res.status(200).json({message: "To do data added successfully"});
  } catch (error) {
    res.status(500).json({error, message: "To do data could not be added."});
  }
});

router.get('/to-do-list', async(req, res) => {
  try {
    const data = await ToDo.find().sort({createdAt: -1});
    res.status(200).json({message: "To do list fetched successfully", data: data});
  } catch (error) {
    res.status(500).json({error, message: "To do list could not be fetched"});
  }
});

module.exports = router;
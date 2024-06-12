require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Import the path module

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB using the connection string from environment variable
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const petSchema = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
  description: String,
  image: String
});

const Pet = mongoose.model('Pet', petSchema);

// API Routes
app.get('/api/pets', async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

app.post('/api/pets', async (req, res) => {
  const pet = new Pet(req.body);
  try {
    const newPet = await pet.save();
    res.status(201).json(newPet);
  } catch (err) {
    res.status(400).json({ error: 'Bad Request', message: err.message });
  }
});

app.get('/api/pets/:id', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ error: 'Not Found', message: 'Pet not found' });
    }
    res.json(pet);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

// Update a pet
app.put('/api/pets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, breed, description, image } = req.body;
    
    // Check if the required fields are provided
    if (!name || !age || !breed || !description || !image) {
      return res.status(400).json({ error: 'All fields are required for updating the pet' });
    }

    const updatedPet = await Pet.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedPet) {
      return res.status(404).json({ error: 'Not Found', message: 'Pet not found' });
    }
    res.json(updatedPet);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

// DELETE a pet
app.delete('/api/pets/:id', async (req, res) => {
  try {
    const deletedPet = await Pet.findByIdAndDelete(req.params.id);
    if (!deletedPet) {
      return res.status(404).json({ error: 'Not Found', message: 'Pet not found' });
    }
    res.json({ message: 'Pet deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

// Serve the React app
app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});




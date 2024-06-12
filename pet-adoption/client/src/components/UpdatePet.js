import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdatePet({ match }) {
  const [pet, setPet] = useState(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [breed, setBreed] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    axios.get(`/api/pets/${match.params.id}`)
      .then(response => {
        setPet(response.data);
        setName(response.data.name);
        setAge(response.data.age);
        setBreed(response.data.breed);
        setDescription(response.data.description);
        setImage(response.data.image);
      })
      .catch(error => {
        console.error('Error fetching pet:', error);
      });
  }, [match.params.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPet = { name, age, breed, description, image };
    axios.put(`/api/pets/${match.params.id}`, updatedPet)
      .then(response => {
        console.log('Pet updated successfully:', response.data);
        // Optionally, redirect the user to the pet detail page after updating
      })
      .catch(error => {
        console.error('Error updating pet:', error);
      });
  };

  return (
    <div>
      {pet && (
        <form onSubmit={handleSubmit}>
          <label>Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)} /></label>
          <label>Age: <input type="text" value={age} onChange={(e) => setAge(e.target.value)} /></label>
          <label>Breed: <input type="text" value={breed} onChange={(e) => setBreed(e.target.value)} /></label>
          <label>Description: <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} /></label>
          <label>Image: <input type="text" value={image} onChange={(e) => setImage(e.target.value)} /></label>
          <button type="submit">Update</button>
        </form>
      )}
    </div>
  );
}

export default UpdatePet;

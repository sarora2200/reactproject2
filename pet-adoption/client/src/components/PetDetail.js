import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PetDetail() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/pets/${id}`)
      .then(response => {
        setPet(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error!', error);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    axios.delete(`http://localhost:5000/api/pets/${id}`)
      .then(response => {
        console.log(response.data);
        // Redirect to the home page or any other page after deletion
        window.location.href = '/';
      })
      .catch(error => {
        console.error('There was an error deleting the pet:', error);
      });
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : pet ? (
        <div>
          <h1>{pet.name}</h1>
          <p>Age: {pet.age}</p>
          <p>Breed: {pet.breed}</p>
          <p>{pet.description}</p>
          <img src={pet.image} alt={pet.name} />
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : (
        <p>No pet found with ID {id}</p>
      )}
    </div>
  );
}

export default PetDetail;








import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function PetList() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/pets')
      .then(response => {
        setPets(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  return (
    <div>
      <h1>Pet List</h1>
      <Link to="/add-pet">Add a Pet</Link>
      <ul>
        {pets.map(pet => (
          <li key={pet._id}>
            <Link to={`/pets/${pet._id}`}>{pet.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PetList;

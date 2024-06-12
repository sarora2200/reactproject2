import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PetList from './components/PetList';
import PetDetail from './components/PetDetail';
import AddPet from './components/AddPet';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<PetList />} />
          <Route path="/pets/:id" element={<PetDetail />} />
          <Route path="/add-pet" element={<AddPet />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



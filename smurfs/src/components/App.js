import React, { useState, useEffect } from 'react';
import './App.css';

import axios from 'axios';
import Smurfs from './Smurfs';
import AddSmurf from './AddSmurf';
import SmurfContext from '../contexts/SmurfContext';

export default function App() {
  const [smurfs, setSmurfs] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3333/smurfs')
      .then(res => {
        console.log(res.data);
        setSmurfs(res.data);
      })
      .catch(err => {
        console.error('server error', err);
      });
  }, []);

  const addSmurf = smurf => {
    axios
      .post('http://localhost:3333/smurfs', smurf)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      });
  };

  console.log('smurfs', smurfs);
  return (
    <div className="App">
      <SmurfContext.Provider value={{ smurfs }}>
        <h1>The Smurf Creater</h1>

        <Smurfs className="form" />
        <AddSmurf addSmurf={addSmurf} />
      </SmurfContext.Provider>
    </div>
  );
}

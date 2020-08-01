import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'
import AddPlace from './components/AddPlace';

function App() {
  return (
    <div>
      <Navbar />
      <AddPlace/>
      <Switch>
        <Route exact path="/" render={(props) => <Homepage {...props} />} />
      </Switch>
    </div>
  );
}

export default App;

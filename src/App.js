import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Homepage from './components/Homepage';
import EditPlace from './components/EditPlace';
import 'bootstrap/dist/css/bootstrap.min.css'
import PlacesList from './components/PlacesList';
import CustomNavbar from './components/Navbar';
import Search from './components/Search';
import Admin from './components/Admin';
import AddPlace from './components/AddPlace';
import PlaceDetails from './components/PlaceDetails';


function App() {
  return (
    <div>
      <CustomNavbar />
      <Switch>
        <Route exact path="/" render={(props) => <Homepage {...props} />} />
        <Route exact path='/edit/:id' render={(props) => <EditPlace {...props} />} />
        <Route exact path="/list" render={(props) => <PlacesList {...props} />} />
        <Route exact path="/search" render={(props) => <Search {...props} />} />
        <Route exact path="/admin" render={(props) => <Admin {...props} />} />
        <Route exact path="/addplace" render={(props) => <AddPlace {...props} />} />
        <Route exact path="/place/:id" render={(props) => <PlaceDetails {...props} />} />
      </Switch>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Restaurants from './Components/Restaurants';
import { Restaurant } from './Components/Restaurant';
import Registration from './Components/Registration';
import Authorisation from './Components/Authorisation';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { DataProvider } from './Context'
import Myrestaurants from './Components/Myrestaurants';
import Addrestaurant from './Components/Addrestaurant';
import Editrestaurant from './Components/Editrestaurant';
import Addmenu from './Components/Addmenu';
import Editmenu from './Components/Editmenu';
import { Container } from '@material-ui/core';
import Mymenus from './Components/Mymenus';

function App() {

  const firebase = require('firebase')
  require('firebase/firestore')

  let firebaseConfig = {
    apiKey: "AIzaSyCU0qPnVaOXwgOmC2BAiRwWBc7VojHMHb4",
    authDomain: "elmenu-341a1.firebaseapp.com",
    databaseURL: "https://elmenu-341a1.firebaseio.com",
    projectId: "elmenu-341a1",
    storageBucket: "elmenu-341a1.appspot.com",
    messagingSenderId: "1014017230972",
    appId: "1:1014017230972:web:b3df67d588eb7dcd6e21f9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  return (
    <>
      <DataProvider>
        <BrowserRouter>
          <Route component={Navbar} />
          <Container style={{ marginTop: 100 }}>
            <Route exact path="/" component={Restaurants} />
            <Route exact path="/registration" component={Registration} />
            <Route exact path="/authorisation" component={Authorisation} />
            <Route exact path="/myrestaurants" component={Myrestaurants} />
            <Route exact path="/mymenus" component={Mymenus} />
            <Route exact path="/addrestaurant" component={Addrestaurant} />
            <Route exact path="/editrestaurant" component={Editrestaurant} />
            <Route exact path="/addmenu" component={Addmenu} />
            <Route exact path="/editmenu" component={Editmenu} />
          </Container>
          <Route exact path="/restaurant/:id" component={Restaurant} />
        </BrowserRouter>
      </DataProvider>
    </>
  );
}

export default App;

import React, { Component } from 'react';
import './App.css';

import RestaurantList from './components/RestaurantList';
import RestoDetails from './components/RestoDetails';

import {
  BrowserRouter as Router,
  Route,
  Switch
 } from 'react-router-dom';
 import './components/RestaurantList';



function App (){
  
  
 
    return (
      <div className="container">
       
        
         
        <Router>
          <Switch>
            
           
            <Route path="/:id/detail/" exact component={RestoDetails}/>
             
             
            <Route path="/" exact component={RestaurantList}/>
          </Switch>
          </Router>
        
  
      </div>
    );
 
  
}

export default App;

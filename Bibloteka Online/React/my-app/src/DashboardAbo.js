import React, { useState } from 'react';
import "./App.css";
import { BrowserRouter, Route, Switch, NavLink , Redirect} from "react-router-dom";
import { LibriAbo } from './Faqet/LibriAbo';
import { AudioAbo } from './Faqet/AudioAbo';



function DashboardAbo({authorized}) {
  if(!authorized){
    return <Redirect to="/login"/>
  }
  return (
<>
    
    <BrowserRouter>
      <div className="App container" id='Staf'>
        <h3 className="d-flex justify-content-center m-3">
          Bibloteka Faqja e Abonuesit
        </h3>
        
        <nav className="navbar navbar-expand-sm bg-light navbar-dark">
          <ul className="navbar-nav">

          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/libri">
            Libri
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/audiobook">
            Audio Book
            </NavLink>
          </li>



          </ul>
        </nav>

        <Switch>
          <Route path='/libri' component={LibriAbo}/>
          <Route path='/audiobook' component={AudioAbo}/>
        </Switch>
        </div>



</BrowserRouter>
    
    
</>   
  );
}

export default DashboardAbo;

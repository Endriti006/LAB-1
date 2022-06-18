import React, { useState } from 'react';
import "./App.css";
import { BrowserRouter, Route, Switch, NavLink , Redirect} from "react-router-dom";
import { KutiaAnkesa } from './KutiaAnkesa';
import { LibriAbo } from './Faqet/LibriAbo';
import { AudioAbo } from './Faqet/AudioAbo';
import { KutiaAnkesaStaf } from './Faqet/KutiaAnkesaStaf';



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
            <NavLink className="btn btn-light btn-outline-primary" to="/kutiaankesa">
            Kutia e Ankesave
            </NavLink>
          </li>
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

          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/KutiaAnkesaStaf">
            Kutia e Ankesave
            </NavLink>
          </li>


          </ul>
        </nav>

        <Switch>
          <Route path='/kutiaankesa' component={KutiaAnkesa}/>
          <Route path='/libri' component={LibriAbo}/>
          <Route path='/audiobook' component={AudioAbo}/>
          <Route path='/KutiaAnkesaStaf' component={KutiaAnkesaStaf}/>
        </Switch>
        </div>



</BrowserRouter>
    
    
</>   
  );
}

export default DashboardAbo;

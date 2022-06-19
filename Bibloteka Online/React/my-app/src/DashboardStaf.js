import React, { useState } from 'react';
import "./App.css";
import { Department } from "./Department";
import { BrowserRouter, Route, Switch, NavLink , Redirect} from "react-router-dom";
import { ImportBook } from "./ImportBook";
import { ShtoAbonuesin } from "./ShtoAbonuesin";
import { Kujdestaria } from "./Kujdestaria";
import { KutiaAnkesa } from './KutiaAnkesa';
import { AudioBooks } from './AudioBooks';
import {Orari} from './Orari';
import {Donuesi} from './Donuesi'
import {Orariipunes} from './Orariipunes';
import {Tavolina} from './Tavolina';
import {Huazimi} from './Huazimi';
import {Rezervimi} from './Rezervimi';


function DashboardStaf({authorized}) {
  if(!authorized){
    return <Redirect to="/login"/>
  }
  return (
<>
    
    <BrowserRouter>
      <div className="App container" id='Staf'>
        <h3 className="d-flex justify-content-center m-3">
          Bibloteka Faqja e Stafit
        </h3>
        
        <nav className="navbar navbar-expand-sm bg-light navbar-dark">
          <ul className="navbar-nav">
            <li className="nav-item- m-1">
              <NavLink
                className="btn btn-light btn-outline-primary"
                to="/Salla"
              >
                Salla
              </NavLink>
            </li>
            <li className="nav-item- m-1">
              <NavLink
                className="btn btn-light btn-outline-primary"
                to="/Libri"
              >
                Libri
              </NavLink>
            </li>
            <li className="nav-item- m-1">
              <NavLink
                className="btn btn-light btn-outline-primary"
                to="/Abonuesi"
              >
                Abonuesi
              </NavLink>
            </li>
            <li className="nav-item- m-1">
              <NavLink
                className="btn btn-light btn-outline-primary"
                to="/Kujdestaria"
              >
                Kujdestaria
              </NavLink>
            </li>
            <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/kutiaankesa">
            Kutia e Ankesave
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/audiobooks">
            Audio Books
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/Orari">
            Orari
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/Donuesi">
            Donuesi
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/Orariipunes">
            Orari i Punes
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/Tavolina">
            Tavolina
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/Huazimi">
            Huazimi
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/Rezervimi">
            Rezervimi
            </NavLink>
          </li>


          </ul>
        </nav>

        <Switch>
          <Route path="/Salla" component={Department} />
          <Route path="/Libri" component={ImportBook} />
          <Route path="/Abonuesi" component={ShtoAbonuesin} />
          <Route path="/Kujdestaria" component={Kujdestaria} />
          <Route path='/kutiaankesa' component={KutiaAnkesa}/>
          <Route path='/audiobooks' component={AudioBooks}/>
          <Route path='/Orari' component={Orari}/>
          <Route path='/Donuesi' component={Donuesi}/>
          <Route path='/Orariipunes' component={Orariipunes}/>
          <Route path='/Tavolina' component={Tavolina}/>
          <Route path='/Huazimi' component={Huazimi}/>
          <Route path='/Rezervimi' component={Rezervimi}/>
        </Switch>
        </div>



</BrowserRouter>
    
    
</>   
  );
}

export default DashboardStaf;

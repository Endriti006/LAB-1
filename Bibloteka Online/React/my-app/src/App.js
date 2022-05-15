import logo from "./logo.svg";
import "./App.css";
import { Home } from "./Home";
import { Department } from "./Department";
import { Employee } from "./Employee";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import { ImportBook } from "./ImportBook";
import { ShtoAbonuesin } from "./ShtoAbonuesin";
import { Kujdestaria } from "./Kujdestaria";

function App() {
  return (
    <BrowserRouter>
      <div className="App container">
        <h3 className="d-flex justify-content-center m-3">
          Bibloteka Faqja e Adminit
        </h3>

        <nav className="navbar navbar-expand-sm bg-light navbar-dark">
          <ul className="navbar-nav">
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/Home">
                Home
              </NavLink>
            </li>
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
                to="/Punetori"
              >
                Stafi
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
          </ul>
        </nav>

        <Switch>
          <Route path="/Home" component={Home} />
          <Route path="/Salla" component={Department} />
          <Route path="/Punetori" component={Employee} />
          <Route path="/Libri" component={ImportBook} />
          <Route path="/Abonuesi" component={ShtoAbonuesin} />
          <Route path="/Kujdestaria" component={Kujdestaria} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

import logo from "./logo.svg";
import "./App.css";
import { Home } from "./Home";
import { Department } from "./Department";
import { Employee } from "./Employee";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import { ImportBook } from "./ImportBook";
import { ShtoAbonuesin } from "./ShtoAbonuesin";

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
              <NavLink className="btn btn-light btn-outline-primary" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item- m-1">
              <NavLink
                className="btn btn-light btn-outline-primary"
                to="/department"
              >
                Sallat
              </NavLink>
            </li>
            <li className="nav-item- m-1">
              <NavLink
                className="btn btn-light btn-outline-primary"
                to="/employee"
              >
                Stafi
              </NavLink>
            </li>
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/Book">
                Book
              </NavLink>
            </li>
            <li className="nav-item- m-1">
              <NavLink
                className="btn btn-light btn-outline-primary"
                to="/abonuesin"
              >
                Abonuesin
              </NavLink>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/department" component={Department} />
          <Route path="/employee" component={Employee} />
          <Route path="/Book" component={ImportBook} />
          <Route path="/abonuesin" component={ShtoAbonuesin} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

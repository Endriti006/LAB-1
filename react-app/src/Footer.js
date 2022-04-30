import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Switch } from "react-router-dom";
import DCandidates from './components/DCandidates';
import ImportBook from "./components/ImportBook"
import App from './App';
import AppBook from './Pages/AppBook';

  
const Footer = () => (
 
<>
<div class="footer-container">
    <footer className="footer">
      <nav>

        <button>Shto Studentin</button>
        <button>Shto Librin</button>
      </nav>
      <div>
        <DCandidates / >
        <ImportBook />
      </div>
    </footer>
      </div>
</>
 
);



  
export default Footer;
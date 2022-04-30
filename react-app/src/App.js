import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, Link, Switch } from "react-router-dom";
import './App.css';
import { store } from "./actions/store";
import { Provider } from "react-redux";
import DCandidates from './components/DCandidates';
import { Container } from "@material-ui/core";
import { ToastProvider } from "react-toast-notifications";
import Footer from "./Footer";
import AppBook from './Pages/AppBook';


function App() {
  return (
    <>
    <Provider store={store}>
      
      <Footer />
      <ToastProvider autoDismiss={true}>
        <Container maxWidth="lg">
          
        <DCandidates />
          
        </Container>
      </ToastProvider>
    </Provider>
    </>
  );
}

export default App;
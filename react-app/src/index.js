import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import AppBook from './Pages/AppBook';
import Footer from './Footer';

ReactDOM.render(<AppBook />, document.getElementById('root'));

serviceWorker.unregister();

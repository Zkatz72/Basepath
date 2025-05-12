import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import App from './App.js';
import {Helmet} from 'react-helmet';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SelectedPlayerContextProvider } from './components/store/selected-player-context';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './components/ui/theme.js';
//import 'bootstrap/dist/css/bootstrap.bundle.min.js'
//import reportWebVitals from './reportWebVitals';
/*
  <Helmet>
      <style>{'body { background-color: blue; }'}</style>
    </Helmet>

*/


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <SelectedPlayerContextProvider>
      
        {}
        <App />
    </SelectedPlayerContextProvider>
    </div>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();

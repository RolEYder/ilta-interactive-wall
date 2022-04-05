import React from 'react';
import logo from './logo.svg';
import Home from './pages/Home';
import MainRouter from './MainRouter';
import { hot } from 'react-hot-loader';
import './App.css';
import {BrowserRouter} from 'react-router-dom'

function App() {
  return (
    
    <MainRouter/>

  );
}

export default hot(module)(App)

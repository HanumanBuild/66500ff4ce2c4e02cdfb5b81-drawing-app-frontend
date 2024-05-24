import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Canvas from './pages/Canvas';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/canvas" component={Canvas} />
        <Route path="/" exact component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
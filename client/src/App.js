import React from 'react';
import Navbar from './Components/Navbar';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Todos from './Components/Todos';



function App() {
    return (
      <Router>
        <Navbar/>
        <Route exact path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/todos" component={Todos}/>


      </Router>
);
}

export default App;

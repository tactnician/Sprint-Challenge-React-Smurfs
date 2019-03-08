import React, { Component } from 'react';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import Home from './components/Home';

import axios from 'axios';
import {Route, NavLink} from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
      error: ''
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  componentDidMount = () => {
    axios
      .get('http://localhost:3333/smurfs')
      .then(res => {
        console.log(res);
        this.setState({smurfs: res.data});
      })
      .catch(err =>{
        console.log(err)
        this.setState({error: err})
      })
  }
  
  addSmurf = (e, smurf) => {
    e.preventDefault();
    axios
      .post('http://localhost:3333/smurfs', smurf)
      .then(res => {
        this.setState({smurfs: res.data})
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div className="App">
        <nav>
          <NavLink exact to='/'>Home </NavLink>
          <NavLink to='/smurfs'>Smurfs </NavLink>
          <NavLink to='/smurf-form'>Smurf Form </NavLink>
        </nav>
        <Route 
          exact path='/' 
          render={ props =>
            <Home {...props} />
          }
        />
        <Route
          path='/smurf-form'
          render={ 
            props => <SmurfForm {...props} addSmurf={this.addSmurf} />
          }
        />
        <Route 
          path='/smurfs'
          render={ 
            props => <Smurfs {...props} smurfs={this.state.smurfs} />
          }
        />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from './services/firebase.conf';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>Homepage</h1>
    )
  }
}

export default App;
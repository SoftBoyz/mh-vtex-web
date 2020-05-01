import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../services/firebase.conf';
import { Link } from 'react-router-dom';


class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        
        return(
            <h1>Login page</h1>
        )
    }
}


export default Login;
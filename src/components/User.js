import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../services/firebase.conf';
import { Link } from 'react-router-dom';


class User extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        
        return(
            <h1>User page</h1>
        )
    }
}


export default User;
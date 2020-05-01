import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Recover from './components/Recover';
import Login from './components/Login';
import Register from './components/Register';

import User from './components/User';


import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <Router>
      <div>
        <Route exact path='/' component={App} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/recover' component={Recover} />

        <Route path='/user/:id' component={User} />
        {/* <Route path='/user/:id/config' component={} /> */}

        {/* <Route path='/user/:id/orders' component={} /> */}
        {/* <Route path='/user/:id/orders/history' component={} /> */}
        {/* <Route path='/user/:id/order/:order-id' component={} /> */}

        {/* <Route path='/user/:id/products' component={} /> */}
        {/* <Route path='/user/:id/product/new' component={} /> */}
        {/* <Route path='/user/:id/product/:product-id' component={} /> */}
        {/* <Route path='/user/:id/product/:product-id/edit' component={} /> */}

        {/* <Route path='/user/:id/deli_partners' component={} /> */}
        {/* <Route path='/user/:id/deli_partner/:partner-id' component={} /> */}
        {/* <Route path='/user/:id/deli_partner/:partner-id/edit' component={} /> */}

        {/* <Route path='/user/:id/be-a-partner' component={} /> */}
        {/* <Route path='/user/:id/requests' component={} /> */}
        {/* <Route path='/user/:id/request/:req-id' component={} /> */}

        {/* <Route path='/user/:id/store-partners' component={} /> */}
        {/* <Route path='/user/:id/store-partner/:store-id' component={} /> */}
        {/* <Route path='/user/:id/store-partner/:store-id/edit' component={} /> */}
      </div>
  </Router>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

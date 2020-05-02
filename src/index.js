/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import LoginTab from "views/Login";
import UserProvider from "providers/UserProvider";

import "assets/css/material-dashboard-react.css?v=1.8.0";

const hist = createBrowserHistory();

import Recover from './components/Recover';
import Login from './components/Login';
import Register from './components/Register';

import User from './components/User';


import { BrowserRouter as Router, Route } from 'react-router-dom';


ReactDOM.render(
  <UserProvider>
    <Router history={hist}>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/login" component={LoginTab} />
        <Route path="/rtl" component={RTL} />
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </Router>
  </UserProvider>,
  document.getElementById("root")
);

// ReactDOM.render(
//   <Router>
//       <div>
//         <Route exact path='/' component={App} />
//         <Route path='/register' component={Register} />
//         <Route path='/login' component={Login} />
//         <Route path='/recover' component={Recover} />

//         <Route path='/user/:id' component={User} />
//         {/* <Route path='/user/:id/config' component={} /> */}

//         {/* <Route path='/user/:id/orders' component={} /> */}
//         {/* <Route path='/user/:id/orders/history' component={} /> */}
//         {/* <Route path='/user/:id/order/:order-id' component={} /> */}

//         {/* <Route path='/user/:id/products' component={} /> */}
//         {/* <Route path='/user/:id/product/new' component={} /> */}
//         {/* <Route path='/user/:id/product/:product-id' component={} /> */}
//         {/* <Route path='/user/:id/product/:product-id/edit' component={} /> */}

//         {/* <Route path='/user/:id/deli_partners' component={} /> */}
//         {/* <Route path='/user/:id/deli_partner/:partner-id' component={} /> */}
//         {/* <Route path='/user/:id/deli_partner/:partner-id/edit' component={} /> */}

//         {/* <Route path='/user/:id/be-a-partner' component={} /> */}
//         {/* <Route path='/user/:id/requests' component={} /> */}
//         {/* <Route path='/user/:id/request/:req-id' component={} /> */}

//         {/* <Route path='/user/:id/store-partners' component={} /> */}
//         {/* <Route path='/user/:id/store-partner/:store-id' component={} /> */}
//         {/* <Route path='/user/:id/store-partner/:store-id/edit' component={} /> */}
//       </div>
//   </Router>,

//   document.getElementById('root')
// );

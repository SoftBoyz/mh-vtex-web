import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import App from "./App";
import Register from "./components/Register";
import Login from "./components/Login";
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import LoginTab from "views/Login";
import { AuthProvider } from "providers/UserProvider";

import "assets/css/material-dashboard-react.css?v=1.8.0";

const hist = createBrowserHistory();

ReactDOM.render(
  <AuthProvider>
    <Router history={hist}>
      <Switch>
        <Route path="/admin" component={Admin} />
        {/* <Route path="/login" component={LoginTab} /> */}
        <Route path="/rtl" component={RTL} />

        <Route path="/" exact={true} component={App} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />

        {/* <Route exact path='/' component={App} /> */}
        {/* <Route path='/register' component={Register} /> */}
        {/* <Route path='/login' component={Login} /> */}
        {/* <Route path='/recover' component={Recover} /> */}

        {/* <Route path='/user/:id' component={User} /> */}
        {/* <Route path='/user/:id/config' component={} /> */}

        {/* <Route path='/user/:id/orders' component={} />  */}
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

        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </Router>
  </AuthProvider>,
  document.getElementById("root")
);

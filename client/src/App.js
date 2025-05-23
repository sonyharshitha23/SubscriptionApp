import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AuthRoute from "./components/routes/AuthRoute";
import Nav from "./components/nav";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import StripeSuccess from "./pages/stripe-success";
import StripeCancel from "./pages/stripe-cancel";
import Account from "./pages/account";
import Basic from "./pages/plans/basic";
import Standard from "./pages/plans/standard";
import Premium from "./pages/plans/premium";
function App() {
  return (
    <Router>
      <Nav />
      <Toaster position="bottom-right" toastOptions={{ duration: 1000 }} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <AuthRoute exact path="/stripe/success" component={StripeSuccess} />
        <AuthRoute exact path="/stripe/cancel" component={StripeCancel} />
        <AuthRoute exact path="/account" component={Account} />
        <AuthRoute exact path="/basic" component={Basic} />
        <AuthRoute exact path="/standard" component={Standard} />
        <AuthRoute exact path="/premium" component={Premium} />
      </Switch>
    </Router>
  );
}

export default App;

import React, { useEffect, Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect, Route, Switch } from "react-router-dom";

import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import Landing from "./components/Landing";

const App = (props) => {
  const { isLoggedIn, loadInitialData } = props;

  useEffect(() => {
    loadInitialData();
  }, []);

  return (
    <div>
      <Navbar />
      {isLoggedIn ? (
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/welcome" component={Welcome} />
          <Route path="/landing" component={Landing} />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      )}
    </div>
  );
};

const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
   
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData: () => dispatch(me()),
  };
};

export default withRouter(connect(mapState, mapDispatch)(App));

import React, { useEffect, Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect, Route, Switch } from "react-router-dom";

import { Login, Signup } from "./components/AuthForm";
import Profile from "./components/Profile";
import { me } from "./store";
import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import Landing from "./components/Landing";
import { fetchRestaurants } from "./store/restaurants";

const App = (props) => {
  const { isLoggedIn, fetchRestaurants, loadInitialData } = props;

  useEffect(() => {
    loadInitialData();
    fetchRestaurants();
  }, []);

  return (
    <div>
      <Navbar />
      {isLoggedIn ? (
        <Switch>
          <Route path="/profile" component={Profile} />
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
    fetchRestaurants: () => dispatch(fetchRestaurants()),
  };
};

export default withRouter(connect(mapState, mapDispatch)(App));

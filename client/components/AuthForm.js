import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import Cookies from "universal-cookie";

import { authenticate } from "../store/auth";
const cookies = new Cookies();

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <hr />
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    handleSubmit: async (evt) => {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      dispatch(authenticate(username, password, formName));

      // //Stream
      // const {
      //   data: { token, userId, username: streamUserName, hashedPassword },
      // } = await axios.post(`/auth-stream/${formName}`, {
      //   username,
      //   password,
      // });

      // // In case of Signup
      // if (formName === "signup") {
      //   cookies.set("hashedPassword", hashedPassword);
      // }

      // cookies.set("token", token);
      // cookies.set("username", streamUserName);
      // cookies.set("userId", userId);

      history.push("/landing");
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

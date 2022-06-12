import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import { authenticate } from "../store/auth";
import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import TextField from "@mui/joy/TextField";
import Button from "@mui/joy/Button";
import { FormLabel, Box } from "@mui/material";
import { FcGoogle } from "react-icons/fc";

import { Link } from "react-router-dom";

const cookies = new Cookies();

const googleLogin = () => {
  window.open("http://localhost:8080/google", "_self");
};

const AuthForm = (props) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const switchMode = () => {
    setIsSignUp((prevIsSignup) => !prevIsSignup);
  };

  const { name, handleSubmit, error } = props;

  return (
    <>
      <CssVarsProvider>
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 400,
            mx: "auto", // margin left & right
            my: 4, // margin top & botom
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: 1,
            borderRadius: "sm",
            boxShadow: "md",
          }}
        >
          <div>
            <Typography ml={1} level="h4" component="h1">
              <b>Welcome!</b>
            </Typography>
            <Typography level="body2">Sign in to continue</Typography>
          </div>
          <form onSubmit={handleSubmit} name={isSignUp ? "signup" : "login"}>
            <TextField
              // html input attribute
              name="username"
              type="text"
              placeholder="username"
              // pass down to FormLabel as children
              label="Username"
              sx={{
                width: 1,
                m: 0,
                p: 0,
                alignItems: "center",
              }}
            />
            <TextField
              name="password"
              type="password"
              placeholder="password"
              label="Password"
              sx={{ width: 1, m: 0, p: 0, alignItems: "center" }}
            />
            <Box
              width="1"
              display="flex"
              justifyContent="center"
              sx={{ p: 0, m: 0 }}
            >
              <Button
                sx={{
                  backgroundColor: "#67C79F",
                }}
                type="submit"
              >
                {isSignUp ? "Sign Up" : "Log In"}
              </Button>
            </Box>
            {error && error.response && (
              <div style={{ color: "red", fontSize: "12px" }}>
                {error.response.data}
              </div>
            )}
          </form>

          <Typography
            endDecorator={
              <Button
                variant="text"
                onClick={switchMode}
                sx={{ color: "blue", outline: "none", m: 0, p: 0, pt: 0.2 }}
              >
                {isSignUp ? "Log In" : "Sign Up"}
              </Button>
            }
            fontSize="sm"
            sx={{ alignSelf: "center" }}
          >
            {isSignUp ? (
              <div>Already have an account?</div>
            ) : (
              <div>Don't have an account?</div>
            )}
          </Typography>
          <hr style={{ width: "95%" }} />

          <Link to="/google">
            <Button
              key="google-login"
              onClick={() => {
                googleLogin();
              }}
              sx={{ backgroundColor: "#67C79F" }}
            >
              <FcGoogle style={{ fontSize: "20", marginRight: 10 }} /> Sign in
              with Google
            </Button>
          </Link>
        </Sheet>
      </CssVarsProvider>
    </>
  );
};

const mapState = (state) => {
  return {
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
      console.log("this is the formName", formName);
      //Stream
      const {
        data: { token, userId, username: streamUserName },
      } = await axios.post(`/auth-stream/${formName}`, {
        username,
        password,
      });

      cookies.set("token", token);
      cookies.set("username", streamUserName);
      cookies.set("userId", userId);

      dispatch(authenticate(username, password, formName));
    },
  };
};

export default connect(mapState, mapDispatch)(AuthForm);

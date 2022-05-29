import React from "react";

const GoogleLogin = () => {
  const google = () => {
    window.open("http://localhost:8080/auth/google", "_self");
  };
  return <button onClick={() => google()}>Google Login</button>;
};

export default GoogleLogin;

import React, { useState } from "react";
import { useDispatch, connect } from "react-redux";
import { logout } from "../store";

import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

const navbarMenu = ["tab1", "tab2", "tab3"];

const googleLogin = () => {
  window.open("http://localhost:8080/google", "_self");
};

const Navbar = ({ isLoggedIn }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "white" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              backgroundColor: "white",
            }}
          >
            <Link to="/landing">
              <img className="logo" src="./photos/LoopedIn2.png" />
            </Link>
          </Typography>
          <Link to="/map">map</Link>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", justifyContent: "center" },
            }}
          >
            {navbarMenu.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/favicon.ico" />
            </IconButton>

            {isLoggedIn ? (
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClick={handleCloseUserMenu}
              >
                <MenuItem
                  key="profile"
                  onClick={() => {
                    handleCloseUserMenu;
                  }}
                >
                  <Typography textAlign="center">
                    <Link to="/profile">Profile</Link>
                  </Typography>
                </MenuItem>

                <MenuItem
                  key="chat"
                  onClick={() => {
                    handleCloseUserMenu;
                  }}
                >
                  <Typography textAlign="center">
                    <Link to="/streamchat">Chat</Link>
                  </Typography>
                </MenuItem>

                <MenuItem
                  key="logout"
                  onClick={() => {
                    handleCloseUserMenu;
                    dispatch(logout());
                  }}
                >
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            ) : (
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClick={handleCloseUserMenu}
              >
                <MenuItem
                  key="login"
                  onClick={() => {
                    handleCloseUserMenu;
                  }}
                >
                  <Typography textAlign="center">
                    <Link to="/login">Login</Link>
                  </Typography>
                </MenuItem>

                <MenuItem
                  key="google-login"
                  onClick={() => {
                    handleCloseUserMenu;
                    googleLogin();
                  }}
                >
                  <Typography textAlign="center">
                    <Link to="/google">Google Login</Link>
                  </Typography>
                </MenuItem>

                <MenuItem
                  key="signup"
                  onClick={() => {
                    handleCloseUserMenu;
                  }}
                >
                  <Typography textAlign="center">
                    <Link to="/signup">Signup</Link>
                  </Typography>
                </MenuItem>
              </Menu>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);

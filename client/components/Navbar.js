import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { useSelector } from "react-redux";

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
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import FastfoodRoundedIcon from "@mui/icons-material/FastfoodRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

import AdbIcon from "@mui/icons-material/Adb";
import { debounce } from "./helpers";

const googleLogin = () => {
  window.open("http://localhost:8080/google", "_self");
};

const Navbar = ({ isLoggedIn }) => {
  const auth = useSelector(({ auth }) => auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const dispatch = useDispatch();

  const handleScroll = debounce(() => {
    const currentScrollPos = window.pageYOffset;

    setVisible(
      (prevScrollPos > currentScrollPos &&
        prevScrollPos - currentScrollPos > 70) ||
        currentScrollPos < 10
    );

    setPrevScrollPos(currentScrollPos);
  }, 100);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible, handleScroll]);

  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
    },
  }));

  const navbarStyles = {
    position: "fixed",
    height: "60px",
    width: "100%",
    backgroundColor: "RGB(253, 0, 25,0.8)",
    backdropFilter: "blur(4px)",
    textAlign: "center",
    transition: "top 0.6s",
  };

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
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <div style={{ ...navbarStyles, top: visible ? "0" : "-60px" }}>
          <Toolbar>
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
              }}
            >
              <Link to="/">
                <img className="logo" src="./photos/LoopedIn2.png" />
              </Link>
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <BootstrapTooltip title="Map">
                <Link to="/map">
                  <IconButton size="large" color="inherit">
                    <Avatar
                      sx={{
                        backgroundColor: "inherit",
                      }}
                    >
                      <FastfoodRoundedIcon />
                    </Avatar>
                  </IconButton>
                </Link>
              </BootstrapTooltip>
              <BootstrapTooltip title="Chat">
                <IconButton size="large" color="inherit">
                  <Link to="/streamchat">
                    <Avatar
                      sx={{
                        backgroundColor: "inherit",
                      }}
                    >
                      <ForumRoundedIcon />
                    </Avatar>
                  </Link>
                </IconButton>
              </BootstrapTooltip>
              <IconButton size="large" edge="end" color="inherit">
                <Link to="/profile">
                  <Avatar sx={{ bgcolor: "RGB(240, 207, 101)" }}>
                    {auth.username.charAt(0).toUpperCase()}
                  </Avatar>
                </Link>
              </IconButton>{" "}
              <MenuItem
                key="logout"
                onClick={() => {
                  handleCloseUserMenu;
                  dispatch(logout());
                }}
              >
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Box>
          </Toolbar>
        </div>
      </AppBar>
    </Box>
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

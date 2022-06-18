import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";

import { useDispatch, connect } from "react-redux";
import { useSelector } from "react-redux";

import { logout } from "../store";
import { debounce } from "./helpers";

import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import FastfoodRoundedIcon from "@mui/icons-material/FastfoodRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import MoreIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";

const googleLogin = () => {
  window.open("http://localhost:8080/google", "_self");
};

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

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Navbar = ({ isLoggedIn }) => {
  const auth = useSelector(({ auth }) => auth);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

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

  const navbarStyles = {
    position: "fixed",
    height: "60px",
    width: "100%",
    backgroundColor: "grey",
    background: "linear-gradient(15deg, #13547a 0%, #80d0c7 100%)",
    textAlign: "center",
    transition: "top 0.6s",
  };

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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

  const menuId = "primary-search-account-menu";

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link to="/map" style={{ color: "inherit", textDecoration: "inherit" }}>
        <MenuItem>
          <IconButton size="large" color="inherit">
            <FastfoodRoundedIcon />
          </IconButton>
          <p>Map</p>
        </MenuItem>
      </Link>
      <Link
        to="/streamchat"
        style={{ color: "inherit", textDecoration: "inherit" }}
      >
        <MenuItem>
          <IconButton size="large" color="inherit">
            <ForumRoundedIcon />
          </IconButton>
          <p>Chat</p>
        </MenuItem>
      </Link>
      <Link
        to="/profile"
        style={{ color: "inherit", textDecoration: "inherit" }}
      >
        <MenuItem>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Link>
      <MenuItem
        key="logout"
        onClick={() => {
          handleCloseUserMenu;
          dispatch(logout());
        }}
      >
        <IconButton size="large" color="inherit">
          <LogoutIcon />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          style={{
            ...navbarStyles,
            top: visible ? "0" : "-80px",
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <Link to="/">
                <img className="logo" src="./photos/LoopedIn2.png" />
              </Link>
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton size="large" color="inherit">
                <BootstrapTooltip title="Map">
                  <Link to="/map">
                    <Avatar sx={{ bgcolor: "inherit" }}>
                      <FastfoodRoundedIcon />
                    </Avatar>
                  </Link>
                </BootstrapTooltip>
              </IconButton>
              <IconButton size="large" color="inherit">
                <BootstrapTooltip title="Chat">
                  <Link to="/streamchat">
                    <Avatar sx={{ bgcolor: "inherit" }}>
                      <ForumRoundedIcon />
                    </Avatar>
                  </Link>
                </BootstrapTooltip>
              </IconButton>
              <IconButton size="large" color="inherit">
                <BootstrapTooltip title="Profile">
                  <Link to="/profile">
                    <Avatar
                      sx={{ bgcolor: "#37515F" }}
                      alt={`${auth.username}`}
                      src={`./photos/${auth.username}.jpeg`}
                    />
                  </Link>
                </BootstrapTooltip>
              </IconButton>

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
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
      </Box>
    </div>
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

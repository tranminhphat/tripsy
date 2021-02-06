import { Button, Menu, MenuItem } from "@material-ui/core";
import * as React from "react";
import { Link } from "react-router-dom";
import { isLoggedIn, logout } from "../api/Auth";
import BrandLogo from "../assets/images/tripsy_logo.png";
import UserAvatar from "../assets/images/user.svg";
import { SearchBar } from "./SearchBar";
import MenuIcon from "@material-ui/icons/Menu";

export const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const loggingOut = async () => {
    setAnchorEl(null);
    const res = await logout();
    console.log(res.data);
  };

  return (
    <header className="h-20 bg-white shadow-md">
      <div className="h-full flex justify-between items-center px-16">
        <div>
          <Link to="/">
            <img
              src={BrandLogo}
              height={100}
              width={100}
              alt="Tripsy brand logo"
            />
          </Link>
        </div>
        <div className="flex flex-col justify-center h-16 w-4/6">
          <SearchBar />
        </div>
        <div className="flex justify-center w-24 h-12">
          <Button
            className="border border-solid border-gray-300 focus:outline-none w-24 h-12 min-w-0 rounded-2xl"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MenuIcon className="mx-1" />
            <img
              className="mx-1"
              src={UserAvatar}
              width={32}
              height={32}
              alt="User not logged in"
            />
          </Button>
          {isLoggedIn() ? (
            <Menu
              className="mt-14"
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Link to="/" onClick={handleClose}>
                <MenuItem>Hi</MenuItem>
              </Link>
              <Link to="/" onClick={loggingOut}>
                <MenuItem>Logout</MenuItem>
              </Link>
            </Menu>
          ) : (
            <Menu
              className="mt-14"
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Link to="/login" onClick={handleClose}>
                <MenuItem>Login</MenuItem>
              </Link>
              <Link to="/register" onClick={handleClose}>
                <MenuItem>Register</MenuItem>
              </Link>
              <Link to="/hosttour" onClick={handleClose}>
                <MenuItem>Host a tour</MenuItem>
              </Link>
            </Menu>
          )}
        </div>
      </div>
    </header>
  );
};

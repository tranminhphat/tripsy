import * as React from "react";
import { Button, Menu, MenuItem } from "@material-ui/core";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className="h-20 bg-white shadow-md">
      <div className="h-full flex justify-between items-center px-16">
        <div>
          <Link to="/">Logo</Link>
        </div>
        <div>Search bar</div>
        <div>
          <Button
            className="focus:outline-none"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            Open Menu
          </Button>
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
          </Menu>
        </div>
      </div>
    </header>
  );
};

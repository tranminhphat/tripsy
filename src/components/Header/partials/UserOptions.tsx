import { Button, Menu, MenuItem } from "@material-ui/core";
import * as React from "react";
import UserAvatar from "../../../assets/images/user.svg";
import { isLoggedIn, logout } from "../../../api/Auth";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
interface Props {}

export const UserOptions: React.FC<Props> = () => {
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
    <>
      <Button
        className="border border-solid border-gray-300 p-0 focus:outline-none w-auto h-12 rounded-3xl"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MenuIcon className="mr-1 ml-2" />
        <img
          className="ml-1 mr-2"
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
            <MenuItem>Xin chào</MenuItem>
          </Link>
          <Link to="/" onClick={loggingOut}>
            <MenuItem>Đăng xuất</MenuItem>
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
            <MenuItem>Đăng nhập</MenuItem>
          </Link>
          <Link to="/register" onClick={handleClose}>
            <MenuItem>Đăng ký</MenuItem>
          </Link>
          <Link to="/hosttour" onClick={handleClose}>
            <MenuItem>Tổ chức trải nghiệm</MenuItem>
          </Link>
        </Menu>
      )}
    </>
  );
};

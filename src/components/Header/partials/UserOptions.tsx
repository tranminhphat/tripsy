import { Button, Menu, MenuItem } from "@material-ui/core";
import * as React from "react";
import UserAvatar from "../../../assets/images/user.svg";
import { isLoggedIn, logout } from "../../../api/Auth";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import { eraseUser } from "../../../actions/user";
import { connect } from "react-redux";
import User from "../../../@types/users/User";

interface Props {
  userData: { user: User };
  eraseUser: () => void;
}

const UserOptions: React.FC<Props> = ({ userData, eraseUser }) => {
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
    eraseUser();
  };

  return (
    <>
      <div className="flex items-center justify-center ">
        <Button className=" focus:outline-none p-0 border border-solid border-gray-300 h-12 w-12 lg:hidden mr-3 rounded-full">
          <SearchIcon className="text-3xl" />
        </Button>
      </div>
      <Button
        className="border border-solid border-gray-300 p-0 focus:outline-none h-12 rounded-3xl"
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
            <MenuItem>Xin chào, {userData.user.fullName}</MenuItem>
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

const mapStateToProps = (state) => ({
  userData: state.users,
});

const mapDispatchToProps = (dispatch) => ({
  eraseUser: () => dispatch(eraseUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserOptions);

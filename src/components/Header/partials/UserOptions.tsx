import { Avatar, Button, IconButton, Menu, MenuItem } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import BellIcon from "@material-ui/icons/NotificationsNone";
import SearchIcon from "@material-ui/icons/Search";
import { logout } from "api/auth";
import { getCurrentUser } from "api/users";
import SkeletonUserAvatar from "assets/images/icons/user.svg";
import { IUser } from "interfaces/users/user.interface";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { showAlert } from "redux/actions/alert/alertAction";
import { setAuth } from "redux/actions/auth/authAction";

const UserOptions: React.FC = () => {
  const [menuEl, setMenuEl] = useState(null);
  const [userData, setUserData] = useState<IUser>();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    } else {
      setUserData(undefined);
    }
  }, [isLoggedIn]);

  const fetchData = async () => {
    const { data } = await getCurrentUser(["_id", "firstName", "avatarUrl"]);
    setUserData(data.user);
  };
  const handleClick = (event) => {
    setMenuEl(event.currentTarget);
  };

  const handleClose = () => {
    setMenuEl(null);
  };

  const loggingOut = async () => {
    setMenuEl(null);
    const res = await logout();
    if (res) {
      dispatch(showAlert("success", "Đăng xuất thành công"));
      dispatch(setAuth());
    }
  };

  return (
    <>
      <div className="flex items-center justify-center ">
        <Button className="focus:outline-none hover:bg-transparent hover:shadow-lg p-0 border border-solid border-gray-300 h-12 w-12 lg:hidden mr-3 rounded-full">
          <SearchIcon className="text-3xl" />
        </Button>
      </div>
      {isLoggedIn ? (
        <>
          <IconButton className="text-black mr-2 border border-solid hover:bg-transparent hover:shadow-lg border-gray-300 focus:outline-none">
            <BellIcon />
          </IconButton>
          <Button
            className="border border-solid hover:bg-transparent hover:shadow-lg border-gray-300 p-0 focus:outline-none h-12 rounded-3xl"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MenuIcon className="mr-1 ml-2" />
            <Avatar
              className="ml-1 mr-2"
              src={
                userData && userData.avatarUrl
                  ? userData.avatarUrl
                  : SkeletonUserAvatar
              }
              style={{ width: "32px", height: "32px" }}
              alt="User not logged in"
            />
          </Button>
          <Menu
            className="mt-14"
            id="simple-menu"
            anchorEl={menuEl}
            keepMounted
            open={Boolean(menuEl)}
            onClose={handleClose}
          >
            <Link to="/" onClick={handleClose}>
              <MenuItem>
                Xin chào, {userData ? userData.firstName : ""}
              </MenuItem>
            </Link>
            <Link to={`/user/profile/${userData ? userData._id : ""}`}>
              <MenuItem>Trang cá nhân</MenuItem>
            </Link>
            <Link to={`/account-settings`}>
              <MenuItem>Tài khoản</MenuItem>
            </Link>
            <Link to="/user/experience-hosting">
              <MenuItem>Quản lí trải nghiệm</MenuItem>
            </Link>
            <Link to="/login" onClick={loggingOut}>
              <MenuItem>Đăng xuất</MenuItem>
            </Link>
          </Menu>
        </>
      ) : (
        <>
          <div className="underline hover:no-underline mr-2">
            <Link to="/login" onClick={handleClose}>
              Đăng nhập{" "}
            </Link>
          </div>
          <div className="underline hover:no-underline ml-2">
            <Link to="/register" onClick={handleClose}>
              Đăng ký
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default UserOptions;

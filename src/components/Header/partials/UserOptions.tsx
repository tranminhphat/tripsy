import { Avatar, Button, IconButton, Menu, MenuItem } from "@material-ui/core";
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
    <div className="flex items-center justify-center">
      <IconButton className="text-black mr-2 border border-solid hover:bg-transparent hover:shadow-lg border-gray-300 focus:outline-none rounded-full lg:hidden">
        <SearchIcon />
      </IconButton>
      {isLoggedIn ? (
        <>
          <div>
            <IconButton className="text-black mr-2 border border-solid hover:bg-transparent hover:shadow-lg border-gray-300 focus:outline-none rounded-full">
              <BellIcon />
            </IconButton>
          </div>

          <Button
            className="focus:outline-none rounded-full"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <Avatar
              src={
                userData && userData.avatarUrl
                  ? userData.avatarUrl
                  : SkeletonUserAvatar
              }
              style={{ width: "48px", height: "48px" }}
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
        <div className="flex items-center justify-center">
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
        </div>
      )}
    </div>
  );
};

export default UserOptions;

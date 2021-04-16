import { Avatar, Button, IconButton, Menu, MenuItem } from "@material-ui/core";
import BellIcon from "@material-ui/icons/NotificationsNone";
import SearchIcon from "@material-ui/icons/Search";
import { logout } from "api/auth";
import SkeletonUserAvatar from "assets/images/icons/user.svg";
import AlertContext from "contexts/AlertContext";
import AuthContext from "contexts/AuthContext";
import useCurrentUser from "hooks/queries/users/useCurrentUser";
import * as React from "react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

const UserOptions: React.FC = () => {
  const [menuEl, setMenuEl] = useState(null);
  const { alert } = useContext(AlertContext);
  const { data: userData } = useCurrentUser();
  const { isAuth, refreshAuth } = useContext(AuthContext);

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
      alert("success", "Đăng xuất thành công");
      refreshAuth();
    }
  };

  return (
    <div className="flex items-center justify-center">
      <IconButton className="text-black mr-2 border border-solid hover:bg-transparent hover:shadow-lg border-gray-300 focus:outline-none rounded-full lg:hidden">
        <SearchIcon />
      </IconButton>
      {isAuth ? (
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

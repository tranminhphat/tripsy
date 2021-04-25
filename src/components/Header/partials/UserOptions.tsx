import {
  Avatar,
  Button,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import DashboardIcon from "@material-ui/icons/Dashboard";
import GamepadIcon from "@material-ui/icons/Gamepad";
import HomeIcon from "@material-ui/icons/Home";
import LayerIcon from "@material-ui/icons/Layers";
import SearchIcon from "@material-ui/icons/Search";
import { logout } from "api/auth";
import SkeletonUserAvatar from "assets/images/icons/user.svg";
import AlertContext from "contexts/AlertContext";
import AuthContext from "contexts/AuthContext";
import { useNotifications } from "hooks/queries/notifications";
import { useCurrentUser } from "hooks/queries/users";
import * as React from "react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import NotificationCenter from "./NotificationCenter";

const useStyles = makeStyles({
  paper: {
    marginTop: 40,
    left: "1118px !important",
  },
});

const UserOptions: React.FC = () => {
  const [menuEl, setMenuEl] = useState(null);
  const classes = useStyles();
  const { alert } = useContext(AlertContext);
  const { data: userData } = useCurrentUser();
  const { data: notifications } = useNotifications();
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
      {isAuth && notifications ? (
        <>
          <div>
            <NotificationCenter data={notifications} />
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
            classes={{ paper: classes.paper }}
            id="simple-menu"
            anchorEl={menuEl}
            keepMounted
            open={Boolean(menuEl)}
            onClose={handleClose}
          >
            <Link to={`/user/profile/${userData ? userData._id : ""}`}>
              <MenuItem>
                <div className="flex items-center">
                  <HomeIcon style={{ width: 21, height: 21 }} />
                  <p className="ml-2">Trang cá nhân</p>
                </div>
              </MenuItem>
            </Link>
            <Link to={`/account-settings`}>
              <MenuItem>
                <div className="flex items-center mt-2">
                  <AccountCircleIcon style={{ width: 21, height: 21 }} />
                  <p className="ml-2">Tài khoản</p>
                </div>
              </MenuItem>
            </Link>
            {userData?.isPayOutEnabled ? (
              <Link to={`/account-settings`}>
                <MenuItem>
                  <div className="flex items-center mt-2">
                    <DashboardIcon style={{ width: 21, height: 21 }} />
                    <p className="ml-2">Bảng điều khiển</p>
                  </div>
                </MenuItem>
              </Link>
            ) : null}
            <Link to="/user/activities">
              <MenuItem>
                <div className="flex items-center mt-2">
                  <GamepadIcon style={{ width: 21, height: 21 }} />
                  <p className="ml-2">Hoạt động</p>
                </div>
              </MenuItem>
            </Link>
            <Link to="/user/experience-hosting">
              <MenuItem>
                <div className="flex items-center mt-2">
                  <LayerIcon style={{ width: 21, height: 21 }} />
                  <p className="ml-2">Quản lí trải nghiệm</p>
                </div>
              </MenuItem>
            </Link>
            <Link to="/login" onClick={loggingOut}>
              <MenuItem
                className="py-2 bg-gray-100"
                style={{ marginBottom: -8, marginTop: 10 }}
              >
                <div className="text-center w-full">
                  <p className="font-semibold">Đăng xuất</p>
                </div>
              </MenuItem>
            </Link>
          </Menu>
        </>
      ) : (
        <div className="flex items-center justify-center">
          <div className="border border-secondary p-1 rounded-md hover:bg-secondary hover:text-white mr-2">
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

import * as React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Menu, MenuItem } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";

import { isLoggedIn, logout } from "api/auth";
import SkeletonUserAvatar from "assets/images/icons/user.svg";
import { showAlert } from "redux/actions/alert/alertAction";
import { getUserById } from "api/users";
import { setUserId } from "redux/actions/user/userAction";

const UserOptions: React.FC = () => {
  const [menuEl, setMenuEl] = React.useState(null);
  const [userFirstName, setUserFirstName] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState(SkeletonUserAvatar);
  const { userId } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    fetchData(userId);
  }, [userId]);

  const fetchData = async (id: string | null) => {
    if (id) {
      const { data } = await getUserById(id);
      try {
        if (data) {
          setUserFirstName(data.firstName);
          setUserAvatar(data.avatarUrl);
        }
      } catch (e) {
        console.error(e);
        showAlert("error", "Đã xảy ra lỗi");
      }
    } else {
      setUserFirstName("");
      setUserAvatar(SkeletonUserAvatar);
    }
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
      dispatch(setUserId(null));
    }
  };

  return (
    <>
      <div className="flex items-center justify-center ">
        <Button className="focus:outline-none hover:bg-transparent hover:shadow-lg p-0 border border-solid border-gray-300 h-12 w-12 lg:hidden mr-3 rounded-full">
          <SearchIcon className="text-3xl" />
        </Button>
      </div>
      <Button
        className="border border-solid hover:bg-transparent hover:shadow-lg border-gray-300 p-0 focus:outline-none h-12 rounded-3xl"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MenuIcon className="mr-1 ml-2" />
        <img
          className="ml-1 mr-2 rounded-full"
          src={userAvatar}
          style={{ width: "32px", height: "32px" }}
          alt="User not logged in"
        />
      </Button>
      {isLoggedIn() ? (
        <Menu
          className="mt-14"
          id="simple-menu"
          anchorEl={menuEl}
          keepMounted
          open={Boolean(menuEl)}
          onClose={handleClose}
        >
          <Link to="/" onClick={handleClose}>
            <MenuItem>Xin chào, {userFirstName}</MenuItem>
          </Link>
          <Link to={`/user/profile/${userId}`}>
            <MenuItem>Tài khoản</MenuItem>
          </Link>
          <Link to="/login" onClick={loggingOut}>
            <MenuItem>Đăng xuất</MenuItem>
          </Link>
        </Menu>
      ) : (
        <Menu
          className="mt-14"
          id="simple-menu"
          anchorEl={menuEl}
          keepMounted
          open={Boolean(menuEl)}
          onClose={handleClose}
        >
          <Link to="/login" onClick={handleClose}>
            <MenuItem>Đăng nhập</MenuItem>
          </Link>
          <Link to="/register" onClick={handleClose}>
            <MenuItem>Đăng ký</MenuItem>
          </Link>
        </Menu>
      )}
    </>
  );
};

export default UserOptions;

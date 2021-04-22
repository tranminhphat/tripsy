import { IconButton, makeStyles, Menu } from "@material-ui/core";
import BellIcon from "@material-ui/icons/NotificationsNone";
import { useReadAllNotification } from "hooks/mutations/notifications";
import INotification from "interfaces/notifications/notification.interface";
import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  paper: {
    marginTop: 40,
    left: "945px !important",
    width: 300,
    height: 400,
  },
  list: {
    padding: 8,
  },
});

interface Props {
  data: INotification[];
}

const NotificationCenter: React.FC<Props> = ({ data }) => {
  const [menuEl, setMenuEl] = useState(null);
  const markAllAsRead = useReadAllNotification();
  const classes = useStyles();

  const handleClick = (event) => {
    setMenuEl(event.currentTarget);
  };

  const handleClose = () => {
    markAllAsRead.mutate();
    setMenuEl(null);
  };
  return (
    <>
      <IconButton
        className="focus:outline-none rounded-full"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <div className="relative">
          {data.filter((item) => item.new).length !== 0 ? (
            <div
              style={{ width: 16, height: 16 }}
              className="absolute flex items-center justify-center bg-danger rounded-full"
            >
              <p className="text-white font-semibold text-xs">
                {data.filter((item) => item.new).length}
              </p>
            </div>
          ) : null}
          <BellIcon style={{ width: 32, height: 32 }} />
        </div>
      </IconButton>

      <Menu
        classes={{ paper: classes.paper, list: classes.list }}
        id="simple-menu"
        anchorEl={menuEl}
        keepMounted
        open={Boolean(menuEl)}
        onClose={handleClose}
      >
        <div className="outline-none">
          <p className="text-xl font-bold">Thông báo</p>
        </div>
        <hr className="my-2" />
        {data.map((item) => (
          <Link key={item._id} to={item.link}>
            <div
              className={`p-2 rounded-sm mt-2 ${item.new ? "bg-gray-100" : ""}`}
            >
              <p>{item.message}</p>
              <div>{item.new ? "chua doc" : "da doc"}</div>
            </div>
          </Link>
        ))}
      </Menu>
    </>
  );
};

export default NotificationCenter;

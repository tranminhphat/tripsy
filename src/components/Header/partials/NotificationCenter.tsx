import { IconButton, makeStyles, Menu } from "@material-ui/core";
import BellIcon from "@material-ui/icons/NotificationsNone";
import INotification from "interfaces/notifications/notification.interface";
import * as React from "react";
import { useState } from "react";

const useStyles = makeStyles({
  paper: {
    marginTop: 40,
    left: "945px !important",
    width: 300,
    height: 400,
  },
});

interface Props {
  data: INotification[];
}

const NotificationCenter: React.FC<Props> = ({ data }) => {
  const [menuEl, setMenuEl] = useState(null);
  const classes = useStyles();

  const handleClick = (event) => {
    setMenuEl(event.currentTarget);
  };

  const handleClose = () => {
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
          <div
            style={{ width: 16, height: 16 }}
            className="absolute flex items-center justify-center bg-danger rounded-full"
          >
            <p className="text-white font-semibold text-xs">{data.length}</p>
          </div>
          <BellIcon style={{ width: 32, height: 32 }} />
        </div>
      </IconButton>

      <Menu
        classes={{ paper: classes.paper }}
        id="simple-menu"
        anchorEl={menuEl}
        keepMounted
        open={Boolean(menuEl)}
        onClose={handleClose}
      >
        {data.map((item) => (
          <div>{item.message}</div>
        ))}
      </Menu>
    </>
  );
};

export default NotificationCenter;

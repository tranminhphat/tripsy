import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import DashboardIcon from "@material-ui/icons/Dashboard";
import GroupIcon from "@material-ui/icons/Group";
import * as React from "react";
import { Link } from "react-router-dom";

const listTabs = [
  {
    tabName: "Bảng điều khiển",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    tabName: "Người dùng",
    path: "/admin/user",
    icon: <GroupIcon />,
  },
  {
    tabName: "Phân quyền",
    path: "/admin/role",
    icon: <AssignmentIndIcon />,
  },
];

interface Props {
  tabName: string;
}

const DrawerList: React.FC<Props> = ({ tabName }) => {
  return (
    <List>
      {listTabs.map((item, index) => (
        <div
          key={index}
          className={`${item.tabName === tabName ? "bg-gray-200" : ""}`}
        >
          <Link
            to={{
              pathname: item.path,
              state: { tabName: item.tabName },
            }}
          >
            <ListItem button>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.tabName} />
            </ListItem>
          </Link>
        </div>
      ))}
    </List>
  );
};

export default DrawerList;

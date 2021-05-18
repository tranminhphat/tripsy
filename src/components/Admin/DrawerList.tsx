import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import DashboardIcon from "@material-ui/icons/Dashboard";
import GroupIcon from "@material-ui/icons/Group";
import * as React from "react";
import { Link } from "react-router-dom";

const listTabs = [
  {
    tabName: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    tabName: "User Management",
    path: "/admin/user",
    icon: <GroupIcon />,
  },
  {
    tabName: "Role Management",
    path: "/admin/role",
    icon: <AssignmentIndIcon />,
  },
];

interface Props {
  tabName: string;
}

const DrawerList: React.FC<Props> = ({ tabName }) => {
  return (
    <List className="p-0">
      {listTabs.map((item, index) => (
        <div key={index}>
          <Link
            to={{
              pathname: item.path,
              state: { tabName: item.tabName },
            }}
          >
            <ListItem button selected={item.tabName === tabName}>
              <ListItemIcon
                className={`${
                  item.tabName === tabName ? "text-white" : "text-gray-400"
                }`}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                className={`${
                  item.tabName === tabName ? "text-white" : "text-gray-400"
                }`}
                primary={item.tabName}
              />
            </ListItem>
          </Link>
        </div>
      ))}
    </List>
  );
};

export default DrawerList;

import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DashboardIcon from "@material-ui/icons/Dashboard";
import GroupIcon from "@material-ui/icons/Group";
import MenuIcon from "@material-ui/icons/Menu";
import { logout } from "api/auth";
import clsx from "clsx";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import AlertContext from "contexts/AlertContext";
import AuthContext from "contexts/AuthContext";
import { useCurrentUser } from "hooks/queries/users";
import React, { useContext, useState } from "react";
import { Link, Route, Switch, useLocation } from "react-router-dom";

const drawerWidth = 240;
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

const HomePage = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const {
    state: { tabName },
  } = useLocation<{ tabName: string }>();
  const { data: currentUser } = useCurrentUser();
  const { alert } = useContext(AlertContext);
  const { refreshAuth } = useContext(AuthContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const loggingOut = async () => {
    const res = await logout();
    if (res) {
      alert("success", "Đăng xuất thành công");
      refreshAuth();
    }
  };

  return (
    <div className={classes.root}>
      {currentUser ? (
        <>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, {
                  [classes.hide]: open,
                })}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                {tabName}
              </Typography>
            </Toolbar>
            <div className="ml-auto mr-12 flex">
              <Typography>Chào, {currentUser.firstName}</Typography>
              <Link className="ml-4" to="/login" onClick={loggingOut}>
                <Typography className="underline">Đăng xuất</Typography>
              </Link>
            </div>
          </AppBar>
          <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              }),
            }}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </div>
            <Divider />
            <List>
              {listTabs.map((item, index) => (
                <Link
                  to={{ pathname: item.path, state: { tabName: item.tabName } }}
                  key={index}
                >
                  <ListItem button>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.tabName} />
                  </ListItem>
                </Link>
              ))}
            </List>
            <Divider />
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <div>
              <Switch>
                <Route exact path="/admin/dashboard">
                  Bang dieu khien
                </Route>
                <Route exact path="/admin/user">
                  Nguoi dung
                </Route>
                <Route exact path="/admin/role">
                  Phan quyen
                </Route>
              </Switch>
            </div>
          </main>
        </>
      ) : (
        <div className="flex-grow justify-center items-center">
          <MyLoadingIndicator width={300} height={300} />
        </div>
      )}
    </div>
  );
};

export default HomePage;

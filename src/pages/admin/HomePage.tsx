import { Hidden } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import { logout } from "api/auth";
import DrawerList from "components/Admin/DrawerList";
import MyAlert from "components/Shared/MyAlert";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import AlertContext from "contexts/AlertContext";
import AuthContext from "contexts/AuthContext";
import { useCurrentUser } from "hooks/queries/users";
import React, { useContext } from "react";
import { Link, Route, Switch, useLocation } from "react-router-dom";
import UserManagement from "./UserManagement";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#233044",
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: "#233044",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

interface Props {
  window?: () => Window;
}

const HomePage = (props: Props) => {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const loggingOut = async () => {
    const res = await logout();
    if (res) {
      alert("success", "Đăng xuất thành công");
      refreshAuth();
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;
  const {
    state: { tabName },
  } = useLocation<{ tabName: string }>();
  const { data: currentUser } = useCurrentUser();
  const { alert } = useContext(AlertContext);
  const { refreshAuth } = useContext(AuthContext);
  return (
    <div className={classes.root}>
      {currentUser ? (
        <>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                {tabName}
              </Typography>
            </Toolbar>
            <div className="ml-auto mr-8 flex">
              <Typography>Hi, {currentUser.firstName}</Typography>
              <Link className="ml-4" to="/login" onClick={loggingOut}>
                <Typography className="underline">Log out</Typography>
              </Link>
            </div>
          </AppBar>
          <nav className={classes.drawer} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
              <Drawer
                container={container}
                variant="temporary"
                anchor={theme.direction === "rtl" ? "right" : "left"}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                <div>
                  <div className={classes.toolbar} />
                  <Divider />

                  <DrawerList tabName={tabName} />
                </div>
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
              >
                <div className={classes.toolbar} />
                <DrawerList tabName={tabName} />
              </Drawer>
            </Hidden>
          </nav>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <div>
              <Switch>
                <Route exact path="/admin/dashboard">
                  Bang dieu khien
                </Route>
                <Route exact path="/admin/user">
                  <UserManagement />
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
      <MyAlert />
    </div>
  );
};

export default HomePage;

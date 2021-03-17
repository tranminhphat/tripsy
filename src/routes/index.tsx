import Cookies from "js-cookie";
import NotFoundPage from "pages/404/404Page";
import AccountPage from "pages/client/account/AccountPage";
import ForgotPasswordPage from "pages/client/auth/ForgotPasswordPage";
import LoginPage from "pages/client/auth/LoginPage";
import RegisterPage from "pages/client/auth/RegisterPage";
import ResetPasswordPage from "pages/client/auth/ResetPasswordPage";
import ExperienceCreationPage from "pages/client/experience/ExperienceCreationPage/ExperienceCreationPage";
import ExperiencePage from "pages/client/experience/ExperiencePage";
import HomePage from "pages/client/home/HomePage";
import ProfilePage from "pages/client/profile/ProfilePage";
import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

interface Entry {
  exact?: boolean;
  path: string;
  component?: React.FC<any>;
  authRoute?: boolean;
}

const routes: Entry[] = [
  { exact: true, path: "/", component: HomePage },
  { exact: true, path: "/login", component: LoginPage },
  { exact: true, path: "/register", component: RegisterPage },
  { exact: true, path: "/forgot-password", component: ForgotPasswordPage },
  { exact: true, path: "/reset-password/:token", component: ResetPasswordPage },
  {
    exact: true,
    path: "/user/profile/:id",
    component: ProfilePage,
    authRoute: true,
  },
  {
    exact: true,
    path: "/account-settings",
    component: AccountPage,
    authRoute: true,
  },
  {
    exact: true,
    path: "/user/experience-hosting",
    component: ExperiencePage,
    authRoute: true,
  },
  {
    path: "/user/experience-hosting/:id",
    component: ExperienceCreationPage,
    authRoute: true,
  },
  {
    path: "*",
    component: NotFoundPage,
  },
];

const isLoggedIn = () => {
  return Cookies.get("jwt") !== undefined;
};

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isLoggedIn() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )
    }
  />
);

const AppRouter: React.FC = () => {
  return (
    <Switch>
      {routes.map((route) => {
        if (!route.authRoute) {
          return <Route key={route.path} exact={route.exact} {...route} />;
        } else {
          return (
            <AuthRoute
              component={HomePage}
              key={route.path}
              exact={route.exact}
              {...route}
            />
          );
        }
      })}
    </Switch>
  );
};

export default AppRouter;

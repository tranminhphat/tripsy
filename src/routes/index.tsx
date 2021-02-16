import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { isLoggedIn } from "api/auth";
import HomePage from "pages/client/HomePage";
import LoginPage from "pages/client/auth/LoginPage";
import RegisterPage from "pages/client/auth/RegisterPage";
import ForgotPasswordPage from "pages/client/auth/ForgotPasswordPage";

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
  { exact: true, path: "/hosttour", component: RegisterPage, authRoute: true },
];

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

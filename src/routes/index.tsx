import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { HomePage } from "../pages/client/HomePage";
import { LoginPage } from "../pages/client/LoginPage";
import { RegisterPage } from "../pages/client/RegisterPage";

interface Entry {
  exact?: boolean;
  path: string;
  component?: React.FC<any>;
}

const routes: Entry[] = [
  { exact: true, path: "/", component: HomePage },
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
];

const AppRouter: React.FC = () => {
  return (
    <Switch>
      {routes.map((route) => {
        return <Route exact={route.exact} {...route} />;
      })}
    </Switch>
  );
};

export default AppRouter;

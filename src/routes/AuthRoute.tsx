import AuthContext from "contexts/AuthContext";
import { getDecodedToken } from "helpers/jwtHelpers";
import NotFoundPage from "pages/404/404Page";
import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

const AuthRoute = ({ component: Component, adminRoute, ...rest }) => {
  const { isAuth } = useContext(AuthContext);
  const decodedToken = getDecodedToken();
  console.log(decodedToken);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? (
          adminRoute ? (
            decodedToken &&
            decodedToken.role.includes("603275723be1c62dc86527b8") ? (
              <Component {...props} />
            ) : (
              <NotFoundPage />
            )
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );
};

export default AuthRoute;

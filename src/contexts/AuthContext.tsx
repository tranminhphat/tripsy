import Cookies from "js-cookie";
import * as React from "react";
import { createContext, useState } from "react";

const AuthContext = createContext<any>(null);

const AuthProvider: React.FC<{}> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(Cookies.get("jwt") !== undefined);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        refreshAuth: () => setIsAuth(Cookies.get("jwt") !== undefined),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;

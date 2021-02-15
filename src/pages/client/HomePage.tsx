import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setUserData } from "redux/actions/user/userAction";
import { getCurrentUser } from "api/auth";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchData = async () => {
    if (userData === undefined) {
      const { data } = await getCurrentUser();
      if (data.user) {
        dispatch(setUserData(data.user));
      }
    }
  };
  return <div>Hello world </div>;
};

export default HomePage;

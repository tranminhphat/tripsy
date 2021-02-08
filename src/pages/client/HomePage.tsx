import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getUserById } from "../../api/User";

interface StateType {
  userId: string;
}

export const HomePage: React.FC = () => {
  const location = useLocation<StateType>();
  const [userFullName, setUserFullName] = useState("");
  const { userId } = location.state;

  useEffect(() => {
    const fetchUserFullName = async () => {
      const { data } = await getUserById(userId);
      setUserFullName(data.user.fullName);
    };
    fetchUserFullName();
  });

  return <div>Hello, {userFullName}</div>;
};

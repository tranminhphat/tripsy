import IUserResponse from "interfaces/users/user.interface";
import * as React from "react";

interface Props {
  userData: IUserResponse;
}

const UserProfile: React.FC<Props> = ({ userData }) => {
  const userFirstName = userData ? userData.firstName : "";
  return <div>Chào bạn, tôi là {userFirstName}</div>;
};

export default UserProfile;

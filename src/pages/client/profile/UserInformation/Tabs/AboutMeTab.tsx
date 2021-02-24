import Typography from "@material-ui/core/Typography";
import { IUserResponse } from "interfaces/users/user.interface";
import * as React from "react";

interface Props {
  userData: IUserResponse;
}

const AboutMeTab: React.FC<Props> = ({ userData }) => {
  const userFirstName = userData ? userData.firstName : "";
  return (
    <div>
      <Typography>Xin chào, tôi là {userFirstName}</Typography>
    </div>
  );
};

export default AboutMeTab;

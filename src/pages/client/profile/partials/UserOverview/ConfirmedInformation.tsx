import React from "react";
import { IUserResponse } from "interfaces/users/user.interface";
import { Typography } from "@material-ui/core";
import Check from "@material-ui/icons/Check";

interface Props {
  userData: IUserResponse;
}

const ConfirmedInformation: React.FC<Props> = ({ userData }) => {
  return (
    <ul>
      {userData && userData.isVerified ? (
        <li key="email">
          <Typography>
            <span>
              <Check />
            </span>{" "}
            Địa chỉ email
          </Typography>
        </li>
      ) : null}
      {userData && userData.phoneNumber ? (
        <li key="phoneNumber">
          <Typography>
            <span>
              <Check />
            </span>{" "}
            Số điện thoại
          </Typography>
        </li>
      ) : null}
    </ul>
  );
};

export default ConfirmedInformation;
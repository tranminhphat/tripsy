import { Typography } from "@material-ui/core";
import VerifiedUserOutlinedIcon from "@material-ui/icons/VerifiedUserOutlined";
import { IUser } from "interfaces/users/user.interface";
import React from "react";

interface Props {
  userData: IUser;
}

const ConfirmedInformation: React.FC<Props> = ({ userData }) => {
  return (
    <ul>
      {userData.isEmailVerified ? (
        <li className="mt-3" key="email">
          <Typography>
            <span className="mr-2">
              <VerifiedUserOutlinedIcon style={{ width: 36, height: 36 }} />
            </span>
            <span>Địa chỉ email</span>
          </Typography>
        </li>
      ) : null}
      {userData.phoneNumber ? (
        <li className="mt-3" key="phoneNumber">
          <Typography>
            <span className="mr-2">
              <VerifiedUserOutlinedIcon style={{ width: 36, height: 36 }} />
            </span>
            <span>Số điện thoại</span>
          </Typography>
        </li>
      ) : null}
    </ul>
  );
};

export default ConfirmedInformation;

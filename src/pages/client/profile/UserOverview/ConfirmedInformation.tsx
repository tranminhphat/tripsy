import { Typography } from "@material-ui/core";
import CheckGuardIcon from "assets/images/icons/checkguard.svg";
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
            <span>
              <img
                className="inline"
                src={CheckGuardIcon}
                alt="email verified"
              />
            </span>{" "}
            Địa chỉ email
          </Typography>
        </li>
      ) : null}
      {userData.phoneNumber ? (
        <li className="mt-3" key="phoneNumber">
          <Typography>
            <span>
              <img
                className="inline"
                src={CheckGuardIcon}
                alt="phone verified"
              />
            </span>{" "}
            Số điện thoại
          </Typography>
        </li>
      ) : null}
      {userData.isIdVerified ? (
        <li className="mt-3" key="id">
          <Typography>
            <span>
              <img className="inline" src={CheckGuardIcon} alt="id verified" />
            </span>{" "}
            Giấy tờ tùy thân
          </Typography>
        </li>
      ) : null}
    </ul>
  );
};

export default ConfirmedInformation;

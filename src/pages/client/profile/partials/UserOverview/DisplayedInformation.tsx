import React from "react";
import { Tooltip, Typography } from "@material-ui/core";

import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/PhoneIphone";
import GenderIcon from "@material-ui/icons/Wc";
import CakeIcon from "@material-ui/icons/Cake";
import LocationIcon from "@material-ui/icons/LocationOn";

import {
  IUserResponse,
  IDisplayedUserData,
} from "interfaces/users/user.interface";

interface Props {
  displayedUserData: IDisplayedUserData;
  userData: IUserResponse;
}

const DisplayedInformation: React.FC<Props> = ({
  userData,
  displayedUserData,
}) => {
  const displayedFields = [
    {
      name: "email",
      title: "Email",
      icon: <EmailIcon />,
      isDisplayed: displayedUserData.email && userData.email,
      value: userData.email,
    },
    {
      name: "phoneNumber",
      title: "Số điện thoại",
      icon: <PhoneIcon />,
      isDisplayed: displayedUserData.phoneNumber && userData.phoneNumber,
      value: userData.phoneNumber,
    },
    {
      name: "gender",
      title: "Giới tính",
      icon: <GenderIcon />,
      isDisplayed: displayedUserData.gender && userData.gender,
      value: userData.gender === "male" ? "Nam" : "Nữ",
    },
    {
      name: "dateOfBirth",
      title: "Ngày sinh",
      icon: <CakeIcon />,
      isDisplayed: displayedUserData.dateOfBirth && userData.dateOfBirth,
      value: userData.dateOfBirth?.slice(0, 10),
    },
    {
      name: "address",
      title: "Địa chỉ",
      icon: <LocationIcon />,
      isDisplayed: displayedUserData.address && userData.address,
      value: userData.address,
    },
  ];
  return (
    <ul>
      {displayedFields.map((field) => {
        return field.isDisplayed ? (
          <li className="mt-3" key={field.name}>
            <Typography>
              <Tooltip title={field.title}>
                <span className="mr-1">{field.icon}</span>
              </Tooltip>
              {field.value}
            </Typography>
          </li>
        ) : null;
      })}
    </ul>
  );
};
export default DisplayedInformation;

import { Tooltip, Typography } from "@material-ui/core";
import CakeIcon from "@material-ui/icons/Cake";
import EmailIcon from "@material-ui/icons/Email";
import LocationIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/PhoneIphone";
import GenderIcon from "@material-ui/icons/Wc";
import {
  IDisplayedUserData,
  IUserResponse,
} from "interfaces/users/user.interface";
import React from "react";

interface Props {
  displayedField: IDisplayedUserData;
  displayedData: IUserResponse;
}

const DisplayedInformation: React.FC<Props> = ({
  displayedData,
  displayedField,
}) => {
  const displayedFields = [
    {
      name: "email",
      title: "Email",
      icon: <EmailIcon />,
      isDisplayed: displayedField.email && displayedData.email,
      value: displayedData.email,
    },
    {
      name: "phoneNumber",
      title: "Số điện thoại",
      icon: <PhoneIcon />,
      isDisplayed: displayedField.phoneNumber && displayedData.phoneNumber,
      value: displayedData.phoneNumber,
    },
    {
      name: "gender",
      title: "Giới tính",
      icon: <GenderIcon />,
      isDisplayed: displayedField.gender && displayedData.gender,
      value: displayedData.gender === "male" ? "Nam" : "Nữ",
    },
    {
      name: "dateOfBirth",
      title: "Ngày sinh",
      icon: <CakeIcon />,
      isDisplayed: displayedField.dateOfBirth && displayedData.dateOfBirth,
      value: displayedData.dateOfBirth?.slice(0, 10),
    },
    {
      name: "address",
      title: "Địa chỉ",
      icon: <LocationIcon />,
      isDisplayed: displayedField.address && displayedData.address,
      value: displayedData.address,
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

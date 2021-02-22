import * as React from "react";

import EditRoundedIcon from "@material-ui/icons/EditRounded";
import { FileReaderResultType } from "types";
import { updateUserById } from "api/users";
import SkeletonUserAvatar from "assets/images/icons/user.svg";
import IUserResponse from "interfaces/users/user.interface";
import Check from "@material-ui/icons/Check";
import { Button, Typography } from "@material-ui/core";

interface Props {
  userData: IUserResponse;
}

const UserOverview: React.FC<Props> = ({ userData }) => {
  const [fileInputState] = React.useState("");
  const [fileReader, setFileReader] = React.useState<FileReaderResultType>();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFileReader(reader.result);
    };
  };

  const changeUserAvatar = async (fileReader) => {
    const { data } = await updateUserById(userData._id, {
      avatarUrl: fileReader,
    });
    if (data) {
      window.location.reload();
    }
  };

  const firstName = userData ? userData.firstName : "";
  const userAvatar =
    !userData || !userData.avatarUrl ? SkeletonUserAvatar : userData.avatarUrl;
  const confirmedInformations = [
    {
      name: "Địa chỉ email",
      isConfirmed: userData ? userData.email : false,
    },
    {
      name: "Số điện thoại",
      isConfirmed: userData ? userData.phoneNumber : false,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative">
        <img
          style={{ width: "96px", height: "96px" }}
          className="rounded-full"
          src={userAvatar}
          alt="avatar"
        />
        <div
          style={{ width: "30px", height: "30px" }}
          className="absolute bottom-1 right-0 border border-gray-300 rounded-full bg-white flex items-center justify-center"
        >
          <label className="cursor-pointer">
            <EditRoundedIcon className="text-md" />
            <input
              type="file"
              className="hidden"
              onChange={handleFileInputChange}
              value={fileInputState}
            />
          </label>
        </div>
      </div>
      <div>
        {fileReader ? (
          <Button
            className="bg-main-blue text-white mt-4"
            onClick={() => changeUserAvatar(fileReader)}
          >
            Change
          </Button>
        ) : (
          ""
        )}
      </div>
      <div className="my-4 w-full h-px border border-solid border-main-blue" />
      <div className="self-start">
        <Typography className="text-lg font-bold text-main-blue">
          {firstName} đã xác thực:
        </Typography>
        <ul>
          {confirmedInformations.map((item, idx) => {
            if (item.isConfirmed) {
              return (
                <li key={idx}>
                  <Typography>
                    <span>
                      <Check />
                    </span>{" "}
                    {item.name}
                  </Typography>
                </li>
              );
            } else {
              return null;
            }
          })}
        </ul>
      </div>
    </div>
  );
};

export default UserOverview;

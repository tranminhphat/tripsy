import * as React from "react";
import { Button, Tooltip, Typography } from "@material-ui/core";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import SettingIcon from "@material-ui/icons/Settings";

import { FileReaderResultType } from "types";
import { updateUserById } from "api/users";
import SkeletonUserAvatar from "assets/images/icons/user.svg";

import {
  IDisplayedUserData,
  IUserResponse,
} from "interfaces/users/user.interface";

import DisplayedInformation from "./DisplayedInformation";
import ConfirmedInformation from "./ConfirmedInformation";
import DisplayedInformationForm from "./DisplayedInformationForm";

interface Props {
  userData: IUserResponse;
}

const UserOverview: React.FC<Props> = ({ userData }) => {
  const [fileInputState] = React.useState("");
  const [isConfiguaredMetadata, setIsConfiguaredMetadata] = React.useState(
    false
  );
  const [
    displayedInformationField,
    setDisplayedInformationField,
  ] = React.useState<IDisplayedUserData>({
    email: true,
    gender: true,
    phoneNumber: true,
    dateOfBirth: true,
    address: true,
  });
  const [fileReader, setFileReader] = React.useState<FileReaderResultType>();

  const handleSetDisplayedInformation = (values: IDisplayedUserData) => {
    setDisplayedInformationField(values);
    setIsConfiguaredMetadata(false);
  };

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
      <div className="self-start w-full">
        <Typography className="text-lg font-bold text-main-blue">
          {firstName} đã xác thực:
        </Typography>
        <ConfirmedInformation userData={userData!} />
      </div>
      <div className="my-4 w-full h-px border border-solid border-main-blue" />
      <div className="self-start w-full">
        <div className="flex justify-between">
          <Typography className="text-lg font-bold text-main-blue">
            Thông tin về {firstName}:
          </Typography>
          <div className="cursor-pointer">
            <Tooltip title="Thay đổi thông tin được hiển thị">
              <SettingIcon
                onClick={() => setIsConfiguaredMetadata(!isConfiguaredMetadata)}
              />
            </Tooltip>
          </div>
        </div>
        {!isConfiguaredMetadata ? (
          <DisplayedInformation
            displayedUserData={displayedInformationField!}
            userData={userData!}
          />
        ) : (
          <DisplayedInformationForm
            initialValues={displayedInformationField}
            onSubmit={(values) => handleSetDisplayedInformation(values)}
          />
        )}
      </div>
    </div>
  );
};

export default UserOverview;

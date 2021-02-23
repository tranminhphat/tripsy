import * as React from "react";
import { Button, Tooltip, Typography } from "@material-ui/core";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import SettingIcon from "@material-ui/icons/Settings";
import CreateIcon from "@material-ui/icons/Create";
import KeyIcon from "@material-ui/icons/VpnKey";

import { FileReaderResultType } from "types";
import { updateUserById } from "api/users";
import SkeletonUserAvatar from "assets/images/icons/user.svg";

import {
  IDisplayedUserData,
  IUpdateUserData,
  IUserResponse,
} from "interfaces/users/user.interface";

import DisplayedInformation from "./DisplayedInformation";
import ConfirmedInformation from "./ConfirmedInformation";
import DisplayedInformationForm from "./DisplayedInformationForm";
import UpdateInformationForm from "./UpdateInformationForm";

interface Props {
  userData: IUserResponse;
}

const UserOverview: React.FC<Props> = ({ userData }) => {
  const [fileInputState] = React.useState("");
  const [
    isConfiguaringUserDisplayedData,
    setIsConfiguaringUserDisplayedData,
  ] = React.useState(false);
  const [isUpdatingUserData, setIsUpdatingUserData] = React.useState(false);
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

  const [
    updateUserInformationField,
    setUpdateUserInformationField,
  ] = React.useState<IUpdateUserData>({
    gender: userData.gender,
    phoneNumber: userData.phoneNumber,
    address: userData.address,
  });

  const [fileReader, setFileReader] = React.useState<FileReaderResultType>();

  const handleSetDisplayedInformation = (values: IDisplayedUserData) => {
    setDisplayedInformationField(values);
    setIsConfiguaringUserDisplayedData(false);
  };

  const handleUpdateUserInformation = async (values: IUpdateUserData) => {
    const { data } = await updateUserById(userData._id, values);
    if (data) {
      setIsUpdatingUserData(false);
      setUpdateUserInformationField(values);
      window.location.reload();
    }
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

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative">
        <img
          style={{ width: "96px", height: "96px" }}
          className="rounded-full"
          src={!userData.avatarUrl ? SkeletonUserAvatar : userData.avatarUrl}
          alt="avatar"
        />
        <div
          style={{ width: "30px", height: "30px" }}
          className="absolute bottom-1 right-0 border border-gray-300 rounded-full bg-white flex items-center justify-center"
        >
          <Tooltip title="Thay đổi avatar">
            <label className="cursor-pointer">
              <EditRoundedIcon className="text-md" />
              <input
                type="file"
                className="hidden"
                onChange={handleFileInputChange}
                value={fileInputState}
              />
            </label>
          </Tooltip>
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
          {userData.firstName} đã xác thực:
        </Typography>
        <ConfirmedInformation userData={userData} />
      </div>
      <div className="my-4 w-full h-px border border-solid border-main-blue" />
      <div className="self-start w-full">
        <div className="flex justify-between">
          <Typography className="text-lg font-bold text-main-blue">
            Thông tin về {userData.firstName}:
          </Typography>
          <div className="flex">
            <div className="cursor-pointer">
              <Tooltip title="Đổi mật khẩu">
                <KeyIcon />
              </Tooltip>
            </div>
            <div className="cursor-pointer ml-1">
              <Tooltip title="Cập nhật thông tin của bạn">
                <CreateIcon
                  onClick={() => {
                    if (isConfiguaringUserDisplayedData) {
                      setIsConfiguaringUserDisplayedData(false);
                      setIsUpdatingUserData(!isUpdatingUserData);
                    } else {
                      setIsUpdatingUserData(!isUpdatingUserData);
                    }
                  }}
                />
              </Tooltip>
            </div>
            <div className="cursor-pointer ml-1">
              <Tooltip title="Thay đổi thông tin được hiển thị">
                <SettingIcon
                  onClick={() => {
                    if (isUpdatingUserData) {
                      setIsUpdatingUserData(false);
                      setIsConfiguaringUserDisplayedData(
                        !isConfiguaringUserDisplayedData
                      );
                    } else {
                      setIsConfiguaringUserDisplayedData(
                        !isConfiguaringUserDisplayedData
                      );
                    }
                  }}
                />
              </Tooltip>
            </div>
          </div>
        </div>
        {isConfiguaringUserDisplayedData ? (
          <DisplayedInformationForm
            initialValues={displayedInformationField}
            onSubmit={(values) => handleSetDisplayedInformation(values)}
          />
        ) : isUpdatingUserData ? (
          <UpdateInformationForm
            initialValues={updateUserInformationField}
            onSubmit={(values) => handleUpdateUserInformation(values)}
          />
        ) : (
          <DisplayedInformation
            displayedUserData={displayedInformationField}
            userData={userData}
          />
        )}
      </div>
    </div>
  );
};

export default UserOverview;

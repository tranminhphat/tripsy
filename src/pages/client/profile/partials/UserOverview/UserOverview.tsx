import * as React from "react";
import { Button, Tooltip, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
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
import ChangePasswordForm from "./ChangePasswordForm";
import { showAlert } from "redux/actions/alert/alertAction";

interface Props {
  userData: IUserResponse;
}

const UserOverview: React.FC<Props> = ({ userData }) => {
  const dispatch = useDispatch();

  /* Store user updated avatar file */
  const [fileInputState] = React.useState("");

  /* Store base64 string of the avatar file  */
  const [fileReader, setFileReader] = React.useState<FileReaderResultType>();

  /* Check if user is configuring the displayed informations */
  const [
    isUpdatingDisplayedField,
    setIsUpdatingDisplayedField,
  ] = React.useState(false);

  /* Check if user is updating informations */
  const [isUpdatingUserData, setIsUpdatingUserData] = React.useState(false);

  /* Check if user is updating password */

  const [isUpdatingUserPassword, setIsUpdatingUserPassword] = React.useState(
    false
  );

  /* Store the fields will be displayed on UserOview component */
  const [
    displayedField,
    setDisplayedField,
  ] = React.useState<IDisplayedUserData>({
    email: true,
    gender: true,
    phoneNumber: true,
    dateOfBirth: true,
    address: true,
  });

  /* Store the displayed data of user */

  const [displayedData, setDisplayedData] = React.useState<IUserResponse>({
    email: userData.email,
    gender: userData.gender,
    phoneNumber: userData.phoneNumber,
    dateOfBirth: userData.dateOfBirth,
    address: userData.address,
  });

  /* Store the updated information of user */
  const [
    updatedInformation,
    setUpdatedInformation,
  ] = React.useState<IUpdateUserData>({
    gender: userData.gender,
    phoneNumber: userData.phoneNumber,
    address: userData.address,
  });

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFileReader(reader.result);
    };
  };

  const changeUserAvatar = async (fileReader) => {
    const { data } = await updateUserById(userData._id!, {
      avatarUrl: fileReader,
    });
    if (data) {
      window.location.reload();
    }
  };

  const toggleOptionTab = (tabName?: string) => {
    switch (tabName) {
      case "password": {
        setIsUpdatingUserData(false);
        setIsUpdatingDisplayedField(false);
        setIsUpdatingUserPassword(!isUpdatingUserPassword);
        break;
      }
      case "userData": {
        setIsUpdatingUserPassword(false);
        setIsUpdatingDisplayedField(false);
        setIsUpdatingUserData(!isUpdatingUserData);
        break;
      }
      case "displayedData": {
        setIsUpdatingUserData(false);
        setIsUpdatingUserPassword(false);
        setIsUpdatingDisplayedField(!isUpdatingDisplayedField);
        break;
      }
      default:
        setIsUpdatingUserData(false);
        setIsUpdatingUserPassword(false);
        setIsUpdatingDisplayedField(false);
        break;
    }
  };

  const handleUpdateDisplayedField = (values: IDisplayedUserData) => {
    setDisplayedField(values);
    dispatch(showAlert("success", "Cập nhật thành công"));
  };

  const handleUpdatedInformation = async (values: IUpdateUserData) => {
    const { data } = await updateUserById(userData._id!, values);
    if (data) {
      setUpdatedInformation(values);
      setDisplayedData({ ...displayedData, ...values });
      dispatch(showAlert("success", "Cập nhật thành công"));
    }
  };

  const handleChangePassword = async (values) => {
    const { data } = await updateUserById(userData._id!, {
      password: values.newPassword,
    });
    if (data) {
      dispatch(showAlert("success", "Cập nhật thành công"));
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
                <KeyIcon onClick={() => toggleOptionTab("password")} />
              </Tooltip>
            </div>
            <div className="cursor-pointer ml-1">
              <Tooltip title="Cập nhật thông tin của bạn">
                <CreateIcon onClick={() => toggleOptionTab("userData")} />
              </Tooltip>
            </div>
            <div className="cursor-pointer ml-1">
              <Tooltip title="Thay đổi thông tin được hiển thị">
                <SettingIcon onClick={() => toggleOptionTab("displayedData")} />
              </Tooltip>
            </div>
          </div>
        </div>
        {isUpdatingDisplayedField ? (
          <DisplayedInformationForm
            initialValues={displayedField}
            onSubmit={(values) => handleUpdateDisplayedField(values)}
            onDone={() => toggleOptionTab()}
          />
        ) : isUpdatingUserPassword ? (
          <ChangePasswordForm
            onSubmit={(values) => handleChangePassword(values)}
            onDone={() => toggleOptionTab()}
          />
        ) : isUpdatingUserData ? (
          <UpdateInformationForm
            initialValues={updatedInformation}
            onSubmit={(values) => handleUpdatedInformation(values)}
            onDone={() => toggleOptionTab()}
          />
        ) : (
          <DisplayedInformation
            displayedField={displayedField}
            displayedData={displayedData}
          />
        )}
      </div>
    </div>
  );
};

export default UserOverview;

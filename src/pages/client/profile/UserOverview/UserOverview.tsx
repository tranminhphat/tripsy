import { Avatar, Button, Tooltip, Typography } from "@material-ui/core";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import { getProfileById } from "api/profile";
import { updateUserById } from "api/users";
import StarIcon from "assets/images/icons/star.svg";
import SkeletonUserAvatar from "assets/images/icons/user.svg";
import IProfile from "interfaces/profiles/profile.interface";
import { IUser } from "interfaces/users/user.interface";
import * as React from "react";
import { useEffect, useState } from "react";
import { FileReaderResultType } from "types";
import ConfirmedInformation from "./ConfirmedInformation";

interface Props {
  userData: IUser;
  isCurrentUser: boolean;
}

const UserOverview: React.FC<Props> = ({ userData, isCurrentUser }) => {
  /* Store user profile */
  const [profile, setProfile] = useState<IProfile>();
  /* Store user updated avatar file */
  const [fileInputState] = useState("");

  /* Store base64 string of the avatar file  */
  const [fileReader, setFileReader] = useState<FileReaderResultType>();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const {
      data: { profile },
    } = await getProfileById(userData.profileId as string);
    if (profile) {
      setProfile(profile);
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
    const { data } = await updateUserById(userData._id!, {
      avatarUrl: fileReader,
    });
    if (data) {
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative">
        {!fileReader ? (
          <Avatar
            style={{ width: "96px", height: "96px" }}
            src={userData.avatarUrl ? userData.avatarUrl : SkeletonUserAvatar}
            alt="avatar"
          />
        ) : (
          <Avatar
            style={{ width: "96px", height: "96px" }}
            src={fileReader as string}
            alt="avatar"
          />
        )}
        {isCurrentUser ? (
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
        ) : null}
      </div>
      <div>
        {fileReader ? (
          <>
            <Button
              className="mt-4 mr-1"
              variant="contained"
              onClick={() => setFileReader(null)}
            >
              Hủy
            </Button>
            <Button
              variant="contained"
              className="bg-main-blue text-white mt-4 ml-1"
              onClick={() => changeUserAvatar(fileReader)}
            >
              Thay đổi
            </Button>
          </>
        ) : null}
      </div>
      <div className="self-start w-full my-4">
        {profile ? (
          <div className="flex items-center">
            <span className="mr-3">
              <img src={StarIcon} alt="id verified" />
            </span>
            <Typography className="font-bold">
              {profile?.reviews.length} đánh giá
            </Typography>
          </div>
        ) : null}
      </div>
      <hr className="w-full text-gray-300" />
      <div className="self-start w-full my-4">
        <Typography className="text-lg font-bold">
          {userData.firstName} đã xác thực:
        </Typography>
        <ConfirmedInformation userData={userData} />
      </div>
    </div>
  );
};

export default UserOverview;

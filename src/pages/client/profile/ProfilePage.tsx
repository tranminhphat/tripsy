import * as React from "react";
import { useParams } from "react-router-dom";

import SkeletonUserAvatar from "assets/images/icons/user.svg";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import { getUserById, updateUserById } from "api/users";
import IUserResponse from "interfaces/users/user.interface";
import { FileReaderResultType } from "types";

interface Props {}

const ProfilePage: React.FC<Props> = () => {
  const { id } = useParams<{ id: string }>();
  const [userData, setUserData] = React.useState<IUserResponse>();
  const [fileInputState] = React.useState("");
  const [fileReader, setFileReader] = React.useState<FileReaderResultType>();

  React.useEffect(() => {
    fetchData(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFileReader(reader.result);
    };
  };

  const changeUserAvatar = async (fileReader) => {
    await updateUserById(id, { avatarUrl: fileReader });
  };

  const fetchData = async (id: string) => {
    const { data } = await getUserById(id);
    setUserData(data);
  };

  const firstName = userData ? userData.firstName : "";
  const lastName = userData ? userData.lastName : "";
  const userAvatar =
    !userData || !userData.avatarUrl ? SkeletonUserAvatar : userData.avatarUrl;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="bg-white border border-gray-200 shadow-2xl rounded-2xl">
        <div className="flex flex-col items-center justify-center p-4">
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
              <button onClick={() => changeUserAvatar(fileReader)}>
                Change
              </button>
            ) : (
              ""
            )}
          </div>
          <p className="font-bold text-xl text-gray-600 mt-2">{`${firstName} ${lastName}`}</p>
        </div>
      </div>
      <div className="bg-white border border-gray-200 shadow-2xl rounded-2xl md:col-span-2">
        2
      </div>
    </div>
  );
};

export default ProfilePage;

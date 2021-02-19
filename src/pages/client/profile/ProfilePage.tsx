import * as React from "react";
import { useParams } from "react-router-dom";

import SkeletonUserAvatar from "assets/images/icons/user.svg";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import { getUserById } from "api/user";
import IUserResponse from "interfaces/users/user.interface";

interface Props {}

const ProfilePage: React.FC<Props> = () => {
  const { id } = useParams<{ id: string }>();
  const [userData, setUserData] = React.useState<IUserResponse>();

  React.useEffect(() => {
    fetchData(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              src={userAvatar}
              alt="avatar"
            />
            <div
              style={{ width: "30px", height: "30px" }}
              className="absolute bottom-1 right-0 border border-gray-300 rounded-full bg-white flex items-center justify-center"
            >
              <label className="cursor-pointer">
                <EditRoundedIcon className="text-md" />
                <input type="file" className="hidden" />
              </label>
            </div>
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

import * as React from "react";
import { useParams } from "react-router-dom";

import { getUserById } from "api/users";
import { IUserResponse } from "interfaces/users/user.interface";
import UserOverview from "./partials/UserOverview/UserOverview";
import UserInformation from "./partials/UserInformation/UserInformation";

interface Props {}

const ProfilePage: React.FC<Props> = () => {
  const { id } = useParams<{ id: string }>();
  const [userData, setUserData] = React.useState<IUserResponse>();

  React.useEffect(() => {
    fetchData(id);
  }, [id]);

  const fetchData = async (id: string) => {
    const { data } = await getUserById(id);
    setUserData(data);
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="bg-white border border-gray-200 shadow-2xl rounded-2xl">
        <UserOverview userData={userData!} />
      </div>
      <div className="bg-white border border-gray-200 shadow-2xl rounded-2xl md:col-span-2">
        <UserInformation userData={userData!} />
      </div>
    </div>
  );
};

export default ProfilePage;

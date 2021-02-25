import * as React from "react";
import { useParams } from "react-router-dom";

import { getUserById } from "api/users";
import { IUserResponse } from "interfaces/users/user.interface";
import CircularProgress from "@material-ui/core/CircularProgress";

/* Partials */
import UserOverview from "./UserOverview/UserOverview";
import UserInformation from "./UserInformation/UserInformation";

interface Props {}

const ProfilePage: React.FC<Props> = () => {
  const { id } = useParams<{ id: string }>();
  const [userData, setUserData] = React.useState<IUserResponse>();

  React.useEffect(() => {
    fetchData(id);
  }, [id]);

  const fetchData = async (id: string) => {
    const { data } = await getUserById(id);
    if (data) {
      setUserData(data);
    }
  };

  if (userData) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="bg-white border border-gray-200 shadow-2xl rounded-2xl">
          <UserOverview userData={userData} />
        </div>
        <div className="bg-white border border-gray-200  rounded-2xl md:col-span-3">
          <UserInformation userData={userData!} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="p-8 flex items-center justify-center bg-white border border-gray-200 shadow-2xl rounded-2xl">
          <CircularProgress />
        </div>
        <div className="p-8 flex items-center justify-center bg-white border border-gray-200 rounded-2xl">
          <CircularProgress />
        </div>
      </div>
    );
  }
};

export default ProfilePage;

import CircularProgress from "@material-ui/core/CircularProgress";
import { getCurrentUser, getUserById } from "api/users";
import { IUser } from "interfaces/users/user.interface";
import MainLayout from "layouts/MainLayout";
import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserInformation from "./UserInformation/UserInformation";
import UserOverview from "./UserOverview/UserOverview";

interface Props {}

const ProfilePage: React.FC<Props> = () => {
  const { id } = useParams<{ id: string }>();
  const [userData, setUserData] = useState<IUser>();
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const fetchData = async (id: string) => {
    const { data } = await getUserById(id);
    const currentUser = await getCurrentUser(["_id"]);
    if (data) {
      setUserData(data);
    }
    if (currentUser) {
      setIsCurrentUser(data._id === currentUser.data.user._id);
    }
  };
  return (
    <MainLayout withSearchBar={false}>
      {userData ? (
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:gap-12 md:grid-cols-7">
          <div className="bg-white border border-gray-300 rounded-2xl md:col-span-2">
            <UserOverview userData={userData} isCurrentUser={isCurrentUser} />
          </div>
          <div className="md:col-span-5">
            <UserInformation
              userData={userData}
              isCurrentUser={isCurrentUser}
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="p-8 flex items-center justify-center bg-white">
            <CircularProgress />
          </div>
          <div className="p-8 flex items-center justify-center bg-white">
            <CircularProgress />
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default ProfilePage;

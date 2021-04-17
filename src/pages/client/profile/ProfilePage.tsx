import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import { useCurrentUser, useUser } from "hooks/queries/users";
import MainLayout from "layouts/MainLayout";
import * as React from "react";
import { useParams } from "react-router-dom";
import UserInformation from "./UserInformation/UserInformation";
import UserOverview from "./UserOverview/UserOverview";

interface Props {}

const ProfilePage: React.FC<Props> = () => {
  const { id } = useParams<{ id: string }>();
  const { data: userData } = useUser(id);
  const { data: currentUser } = useCurrentUser();

  return (
    <MainLayout withSearchBar={false}>
      {userData && currentUser ? (
        <div className="mt-8 max-w-6xl mx-auto grid grid-cols-1 md:gap-12 md:grid-cols-7">
          <div
            style={{ height: "max-content" }}
            className="bg-white border border-gray-300 rounded-2xl md:col-span-2"
          >
            <UserOverview
              userData={userData}
              isCurrentUser={userData._id === currentUser._id}
            />
          </div>
          <div className="md:col-span-5">
            <UserInformation
              userData={userData}
              isCurrentUser={userData._id === currentUser._id}
            />
          </div>
        </div>
      ) : (
        <div className="flex-grow justify-center items-center">
          <MyLoadingIndicator width={300} height={300} />
        </div>
      )}
    </MainLayout>
  );
};

export default ProfilePage;

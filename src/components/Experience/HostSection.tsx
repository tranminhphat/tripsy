import { Avatar } from "@material-ui/core";
import { getProfileById } from "api/profile";
import { getUserById } from "api/users";
import SkeletonUserAvatar from "assets/images/icons/user.svg";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import MyTruncateText from "components/Shared/MyTruncateText";
import { IUser } from "interfaces/users/user.interface";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  userId: string;
}

const HostSection: React.FC<Props> = ({ userId }) => {
  const [hostData, setHostData] = useState<IUser>();
  const [introduction, setIntroduction] = useState("");

  const fetchHostData = async () => {
    const { data } = await getUserById(userId);
    if (data) {
      setHostData(data);
      const {
        data: { profile },
      } = await getProfileById(data.profileId);
      if (profile) {
        setIntroduction(profile.introduction);
      }
    }
  };

  useEffect(() => {
    fetchHostData();
  }, []);
  return (
    <>
      {hostData ? (
        <>
          <div className="flex">
            <div>
              <Link to={`/user/profile/${userId}`}>
                <Avatar
                  src={
                    hostData.avatarUrl ? hostData.avatarUrl : SkeletonUserAvatar
                  }
                  style={{ width: "48px", height: "48px" }}
                  alt="User"
                />
              </Link>
            </div>
            <div className="ml-2">
              <h1 className="text-2xl font-bold">
                Người hướng dẫn của bạn, {hostData.firstName}
              </h1>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-lg">
              <MyTruncateText text={introduction} />
            </p>
          </div>
        </>
      ) : (
        <MyLoadingIndicator />
      )}
    </>
  );
};

export default HostSection;

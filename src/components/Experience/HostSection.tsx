import { Avatar } from "@material-ui/core";
import SkeletonUserAvatar from "assets/images/icons/user.svg";
import MyTruncateText from "components/Shared/MyTruncateText";
import * as React from "react";
import { Link } from "react-router-dom";

interface Props {
  userId: string;
  userAvatar: string;
  userFirstName: string;
  introduction: string;
}

const HostSection: React.FC<Props> = ({
  userId,
  userAvatar,
  userFirstName,
  introduction,
}) => {
  return (
    <>
      <div className="flex">
        <div>
          <Link to={`/user/profile/${userId}`}>
            <Avatar
              src={userAvatar ? userAvatar : SkeletonUserAvatar}
              style={{ width: "48px", height: "48px" }}
              alt="User"
            />
          </Link>
        </div>
        <div className="ml-2">
          <h1 className="text-2xl font-bold">
            Người hướng dẫn của bạn, {userFirstName}
          </h1>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-lg">
          <MyTruncateText text={introduction} />
        </p>
      </div>
    </>
  );
};

export default HostSection;

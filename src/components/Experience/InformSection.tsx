import { Avatar } from "@material-ui/core";
import ClockIcon from "assets/images/icons/clock.svg";
import ConversationIcon from "assets/images/icons/conversation.svg";
import ListIcon from "assets/images/icons/list.svg";
import PeopleIcon from "assets/images/icons/people.svg";
import SkeletonUserAvatar from "assets/images/icons/user.svg";
import IExperience from "interfaces/experiences/experience.interface";
import * as React from "react";
import { Link } from "react-router-dom";

interface Props {
  experience: IExperience;
  userId: string;
  userFirstName: string;
  userAvatar: string;
}

const InformSection: React.FC<Props> = ({
  experience,
  userId,
  userFirstName,
  userAvatar,
}) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">
            Trải nghiệm được tổ chức bởi {userFirstName}
          </h1>
        </div>
        <div>
          <Link to={`/user/profile/${userId}`}>
            <Avatar
              src={userAvatar ? userAvatar : SkeletonUserAvatar}
              style={{ width: "48px", height: "48px" }}
              alt="User"
            />
          </Link>
        </div>
      </div>

      <div className="mt-8 flex flex-col md:flex-row md:items-stretch justify-start flex-wrap">
        <div className="w-1/2 mb-4 flex items-center relative">
          <div>
            <img src={ClockIcon} alt="hours" />
          </div>
          <div className="ml-4 text-lg">{experience.duration} giờ</div>
        </div>
        <div className="w-1/2 mb-4 flex items-center relative">
          <div>
            <img src={ListIcon} alt="hours" />
          </div>
          <div className="ml-4 text-lg">
            Bao gồm:{" "}
            {experience.hostProvisions?.map((item) => (
              <span key={item.id}>{item.itemName}</span>
            ))}
          </div>
        </div>
        <div className="w-1/2 mb-4 flex items-center relative">
          <div>
            <img src={PeopleIcon} alt="hours" />
          </div>
          <div className="ml-4 text-lg">
            Tối đa {experience.groupSize} khách{" "}
          </div>
        </div>
        <div className="w-1/2 mb-4 flex items-center relative">
          <div>
            <img src={ConversationIcon} alt="hours" />
          </div>
          <div className="ml-4 text-lg">Tổ chức bằng {experience.language}</div>
        </div>
      </div>
    </>
  );
};

export default InformSection;

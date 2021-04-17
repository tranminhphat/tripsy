import { Avatar } from "@material-ui/core";
import ClockIcon from "assets/images/icons/clock.svg";
import ConversationIcon from "assets/images/icons/conversation.svg";
import ListIcon from "assets/images/icons/list.svg";
import PeopleIcon from "assets/images/icons/people.svg";
import SkeletonUserAvatar from "assets/images/icons/user.svg";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import { useUser } from "hooks/queries/users";
import IExperience from "interfaces/experiences/experience.interface";
import * as React from "react";
import { Link } from "react-router-dom";

interface Props {
  experience: IExperience;
}

const InformSection: React.FC<Props> = ({ experience }) => {
  const { data: host } = useUser(experience.hostId as string);
  return (
    <>
      {host ? (
        <>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">
                Trải nghiệm được tổ chức bởi {host.firstName}
              </h1>
            </div>
            <div>
              <Link to={`/user/profile/${host._id}`}>
                <Avatar
                  src={host.avatarUrl ? host.avatarUrl : SkeletonUserAvatar}
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
                <img src={ListIcon} width={56} height={56} alt="hours" />
              </div>
              <div className="ml-4 text-lg">
                Bao gồm:{" "}
                {experience.hostProvisions?.map((item, idx) => (
                  <span key={item.id}>
                    {item.itemName}
                    {idx !== experience.hostProvisions!.length - 1 ? ", " : ""}
                  </span>
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
              <div className="ml-4 text-lg">
                Tổ chức bằng {experience.language}
              </div>
            </div>
          </div>
        </>
      ) : (
        <MyLoadingIndicator />
      )}
    </>
  );
};

export default InformSection;

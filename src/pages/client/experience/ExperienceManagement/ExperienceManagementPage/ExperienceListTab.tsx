import { CircularProgress } from "@material-ui/core";
import { getReceipts } from "api/receipt";
import { getCurrentUser } from "api/users";
import * as React from "react";
import { useEffect, useState } from "react";

interface Props {}

const ExperienceListTab: React.FC<Props> = () => {
  const [experience, setExperience] = useState<any[]>();
  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = async () => {
    const {
      data: {
        user: { _id: userId },
      },
    } = await getCurrentUser(["_id"]);
    if (userId) {
      const { data } = await getReceipts({ guestId: userId });
      if (data) {
        setExperience(data);
      }
    }
  };

  return (
    <div>
      {experience ? (
        experience.map((item) => <div key={item._id}>{item.experienceId}</div>)
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default ExperienceListTab;

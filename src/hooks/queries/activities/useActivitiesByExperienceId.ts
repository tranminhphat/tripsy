import { getActivities } from "api/activity";
import IActivity from "interfaces/activity/activity.interface";
import { useQuery } from "react-query";

const useActivitiesByExperienceId = (experienceId: string) => {
  return useQuery<IActivity[]>(
    ["activities", experienceId],
    async () => {
      const {
        data: { activities },
      } = await getActivities({ experienceId });
      return activities;
    },
    { enabled: !!experienceId }
  );
};

export default useActivitiesByExperienceId;

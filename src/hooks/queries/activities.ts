import { getActivities, getActivityById } from "api/activity";
import IActivity from "interfaces/activity/activity.interface";
import { useQuery } from "react-query";

export const useActivity = (activityId: string) => {
  return useQuery(
    ["activities", activityId],
    async () => {
      const {
        data: { activity },
      } = await getActivityById(activityId);

      return activity;
    },
    {
      enabled: !!activityId,
    }
  );
};

export const useActivitiesByExperienceId = (experienceId: string) => {
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

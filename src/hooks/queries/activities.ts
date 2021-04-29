import { getActivities, getActivityById } from "api/activity";
import IActivity from "interfaces/activity/activity.interface";
import { useQuery } from "react-query";

export const useActivities = (filterObject?: any, sortString?: string) => {
  return useQuery<IActivity[]>(
    ["activities", filterObject, sortString],
    async () => {
      const {
        data: { activities },
      } = await getActivities(filterObject, sortString);
      return activities;
    }
  );
};

export const useActivity = (activityId: string) => {
  return useQuery<IActivity>(
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

export const useActivitiesByExperienceId = (
  experienceId: string,
  status?: number
) => {
  return useQuery<IActivity[]>(
    ["activities", experienceId],
    async () => {
      const {
        data: { activities },
      } = await getActivities({ experienceId, status });
      return activities;
    },
    { enabled: !!experienceId }
  );
};

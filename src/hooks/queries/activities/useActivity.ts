import { getActivityById } from "api/activity";
import { useQuery } from "react-query";

const useActivity = (activityId: string) => {
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

export default useActivity;

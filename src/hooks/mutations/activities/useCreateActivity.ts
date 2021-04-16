import { createActivity } from "api/activity";
import { useMutation, useQueryClient } from "react-query";

const useCreateActivity = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ experienceId, newDate }: any) => {
      const { data } = await createActivity({
        experienceId: experienceId,
        date: newDate,
      });

      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("activities");
      },
    }
  );
};

export default useCreateActivity;

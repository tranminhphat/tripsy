import { deleteActivityById } from "api/activity";
import { useMutation, useQueryClient } from "react-query";

const useDeleteActivity = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ activityId }: any) => {
      return await deleteActivityById(activityId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("activities");
      },
    }
  );
};

export default useDeleteActivity;

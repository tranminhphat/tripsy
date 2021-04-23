import {
  createActivity,
  deleteActivityById,
  updateListOfGuest,
} from "api/activity";
import { useMutation, useQueryClient } from "react-query";

export const useCreateActivity = () => {
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

export const useDeleteActivity = () => {
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

export const useUpdateGuestList = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ activityId }: any) => {
      return await updateListOfGuest(activityId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("activities");
      },
    }
  );
};

import { addActivityLog, removeActivityLog } from "api/akin";
import { useMutation, useQueryClient } from "react-query";

export const useAddActivityLog = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ userId, experienceId }: any) => {
      const { data } = await addActivityLog(userId, experienceId);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("akin");
      },
    }
  );
};

export const useRemoveActivityLog = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ userId, experienceId }: any) => {
      const { data } = await removeActivityLog(userId, experienceId);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("akin");
      },
    }
  );
};

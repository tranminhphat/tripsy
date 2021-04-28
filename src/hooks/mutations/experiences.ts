import {
  createExperience,
  deleteExperienceById,
  updateExperienceById,
} from "api/experiences";
import { useMutation, useQueryClient } from "react-query";

export const useCreateExperience = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async () => {
      const { data } = await createExperience();
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("experiences");
      },
    }
  );
};

export const useUpdateExperience = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ experienceId, updatedValues }: any) => {
      const { data } = await updateExperienceById(experienceId, updatedValues);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("experiences");
      },
    }
  );
};

export const useDeleteExperience = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ experienceId }: any) => {
      const {
        data: { message },
      } = await deleteExperienceById(experienceId);
      return message;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("experiences");
      },
    }
  );
};

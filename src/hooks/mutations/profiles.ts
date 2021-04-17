import {
  saveExperience,
  updateCheckpoints,
  updateProfileById,
} from "api/profile";
import { useMutation, useQueryClient } from "react-query";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ profileId, values }: any) => {
      const {
        data: { profile },
      } = await updateProfileById(profileId, { ...values });
      return profile;
    },
    {
      onSuccess: (profile) => {
        queryClient.invalidateQueries(["profiles", profile._id]);
      },
    }
  );
};

export const useSaveExperiences = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ profileId, experienceId }: any) => {
      const {
        data: { profile },
      } = await saveExperience(profileId, experienceId);
      return profile;
    },
    {
      onSuccess: (profile) => {
        queryClient.invalidateQueries(["profiles", profile._id]);
      },
    }
  );
};

export const useUpdateCheckpoint = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ themeId }: any) => {
      const { data } = await updateCheckpoints(themeId);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("profiles");
      },
    }
  );
};

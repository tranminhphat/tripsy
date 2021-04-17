import { saveExperience, updateCheckpoints } from "api/profile";
import { useMutation, useQueryClient } from "react-query";

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

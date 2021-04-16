import { saveExperience } from "api/profile";
import { useMutation, useQueryClient } from "react-query";

interface Params {
  profileId: string;
  experienceId: string;
}

const useSaveExperiences = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ profileId, experienceId }: Params) => {
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

export default useSaveExperiences;

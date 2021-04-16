import { saveExperience } from "api/profile";
import { QueryClient, useMutation } from "react-query";

interface Params {
  profileId: string;
  experienceId: string;
}

const useSaveExperiences = () => {
  const queryClient = new QueryClient();

  return useMutation(
    async ({ profileId, experienceId }: Params) => {
      const { data } = await saveExperience(profileId, experienceId);
      return data;
    },
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(["profiles", variables.profileId]);
      },
    }
  );
};

export default useSaveExperiences;

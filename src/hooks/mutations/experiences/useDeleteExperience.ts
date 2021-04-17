import { deleteExperienceById } from "api/experiences";
import { useMutation, useQueryClient } from "react-query";

const useDeleteExperience = () => {
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

export default useDeleteExperience;

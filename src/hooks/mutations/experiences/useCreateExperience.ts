import { createExperience } from "api/experiences";
import { useMutation, useQueryClient } from "react-query";

const useCreateExperience = () => {
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
export default useCreateExperience;

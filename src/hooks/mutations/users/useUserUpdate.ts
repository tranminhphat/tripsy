import { updateUserById } from "api/users";
import { useMutation, useQueryClient } from "react-query";

const useUserUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (values: any) => {
      const {
        data: { user },
      } = await updateUserById(values.userId, { ...values });
      return user;
    },
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries("currentUser");
      },
    }
  );
};

export default useUserUpdate;

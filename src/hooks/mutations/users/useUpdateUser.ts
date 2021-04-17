import { updateUserById } from "api/users";
import { useMutation, useQueryClient } from "react-query";

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ userId, values }: any) => {
      const {
        data: { user },
      } = await updateUserById(userId, { ...values });
      return user;
    },
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries("currentUser");
      },
    }
  );
};

export default useUpdateUser;

import { deleteUserById, updateUserById } from "api/users";
import { useMutation, useQueryClient } from "react-query";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ userId, values }: any) => {
      const {
        data: { user },
      } = await updateUserById(userId, { ...values });
      return user;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("currentUser");
      },
    }
  );
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ userId }: any) => {
      const {
        data: { user },
      } = await deleteUserById(userId);
      return user;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    }
  );
};

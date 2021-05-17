import { createRole, deleteRoleById, updateRoleById } from "api/roles";
import { useMutation, useQueryClient } from "react-query";

export const useCreateRole = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ model }: any) => {
      const { data } = await createRole(model);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("roles");
      },
    }
  );
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ roleId, updatedProperties }: any) => {
      const { data } = await updateRoleById(roleId, updatedProperties);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("roles");
      },
    }
  );
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ roleId }: any) => {
      const { data } = await deleteRoleById(roleId);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("roles");
      },
    }
  );
};

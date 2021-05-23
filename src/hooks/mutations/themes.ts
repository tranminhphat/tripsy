import { createTheme, deleteThemeById, updateThemeById } from "api/theme";
import { useMutation, useQueryClient } from "react-query";

export const useCreateTheme = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ model }: any) => {
      const { data } = await createTheme(model);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("themes");
      },
    }
  );
};

export const useUpdateTheme = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ themeId, updatedProperties }: any) => {
      const { data } = await updateThemeById(themeId, updatedProperties);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("themes");
      },
    }
  );
};

export const useDeleteTheme = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ themeId }: any) => {
      const { data } = await deleteThemeById(themeId);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("themes");
      },
    }
  );
};

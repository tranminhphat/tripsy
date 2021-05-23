import { getThemeById, getThemes } from "api/theme";
import { useQuery } from "react-query";

export const useThemes = () => {
  return useQuery(["themes"], async () => {
    const {
      data: { themes },
    } = await getThemes();
    return themes;
  });
};

export const useTheme = (id: string) => {
  return useQuery(["themes", id], async () => {
    const {
      data: { theme },
    } = await getThemeById(id);
    return theme;
  });
};

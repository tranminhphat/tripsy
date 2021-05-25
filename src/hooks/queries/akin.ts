import { getRecommendByUserId } from "api/akin";
import { useQuery } from "react-query";

export const useRecommendByUserId = (id: string) => {
  return useQuery(
    ["akin", id],
    async () => {
      const { data } = await getRecommendByUserId(id);
      return data;
    },
    { enabled: !!id }
  );
};

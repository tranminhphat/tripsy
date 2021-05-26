import { getRecommendByUserId } from "api/akin";
import { useQuery } from "react-query";

export const useRecommendByUserId = (id: string) => {
  return useQuery(
    ["akin", id],
    async () => {
      const {
        data: { recommendations },
      } = await getRecommendByUserId(id);
      return recommendations;
    },
    { enabled: !!id }
  );
};

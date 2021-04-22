import { countReviews } from "api/review";
import { useQuery } from "react-query";

export const useCountReview = (objectId: string) => {
  return useQuery(
    ["countReviews", objectId],
    async () => {
      const { data } = await countReviews({ objectId });
      return data;
    },
    {
      enabled: !!objectId,
    }
  );
};

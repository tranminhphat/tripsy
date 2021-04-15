import { getExperiencesByDate } from "api/experiences";
import IExperience from "interfaces/experiences/experience.interface";
import { useQuery } from "react-query";

const useExperiencesByDate = (dayOfYear: number | undefined) => {
  return useQuery<IExperience[]>(
    ["experiences", dayOfYear],
    async () => {
      const { data } = await getExperiencesByDate(dayOfYear!);
      return data;
    },
    { enabled: !!dayOfYear }
  );
};

export default useExperiencesByDate;

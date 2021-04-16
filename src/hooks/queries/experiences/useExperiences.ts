import { getExperiences } from "api/experiences";
import IExperience from "interfaces/experiences/experience.interface";
import { useQuery } from "react-query";

const useExperiences = (filterObject: any, sortString: string) => {
  return useQuery<IExperience[]>(
    ["experiences", filterObject, sortString],
    async () => {
      const { data: experiences } = await getExperiences(
        filterObject,
        sortString
      );
      return experiences;
    }
  );
};

export default useExperiences;

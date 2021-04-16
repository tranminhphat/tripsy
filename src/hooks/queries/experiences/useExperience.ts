import { getExperienceById } from "api/experiences";
import IExperience from "interfaces/experiences/experience.interface";
import { useQuery } from "react-query";

const useExperience = (experienceId: string) => {
  return useQuery<IExperience>(["experiences", experienceId], async () => {
    const {
      data: { experience },
    } = await getExperienceById(experienceId);

    return experience;
  });
};

export default useExperience;

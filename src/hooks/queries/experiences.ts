import {
	getExperienceById,
	getExperiences,
	getExperiencesByDate,
	getSimilarExperiences,
} from "api/experiences";
import IExperience from "interfaces/experiences/experience.interface";
import { useQuery } from "react-query";

export const useExperience = (experienceId: string) => {
	return useQuery<IExperience>(
		["experiences", experienceId],
		async () => {
			const {
				data: { experience },
			} = await getExperienceById(experienceId);

			return experience;
		},
		{
			enabled: !!experienceId,
		}
	);
};

export const useExperiences = (filterObject?: any, sortString?: string) => {
	return useQuery<IExperience[]>(
		["experiences", filterObject, sortString],
		async () => {
			const {
				data: { experiences },
			} = await getExperiences(filterObject, sortString);
			return experiences;
		}
	);
};

export const useExperiencesByDate = (dayOfYear: number | undefined) => {
	return useQuery<IExperience[]>(
		["experiences", dayOfYear],
		async () => {
			const { data } = await getExperiencesByDate(dayOfYear!);
			return data;
		},
		{ enabled: !!dayOfYear }
	);
};

export const useSimilarExperiences = (experienceId: string) => {
	return useQuery<string[]>(
		["similarExperiences", experienceId],
		async () => {
			const {
				data: { similarDocuments },
			} = await getSimilarExperiences(experienceId);

			return similarDocuments;
		},
		{
			enabled: !!experienceId,
		}
	);
};

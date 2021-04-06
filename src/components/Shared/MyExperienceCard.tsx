import currencyFormatter from "helpers/currencyFormatter";
import IExperience from "interfaces/experiences/experience.interface";
import * as React from "react";

interface Props {
  experience: IExperience;
}

const MyExperienceCard: React.FC<Props> = ({ experience }) => {
  return (
    <div className="flex justify-between border border-gray-300 rounded-lg max-w-lg">
      <div className="mt-2 p-4">
        <h1 className="text-2xl font-bold">{experience.title}</h1>
        <p className="text-lg">
          {currencyFormatter(experience.pricing?.individualPrice!)} / người
        </p>
      </div>
      <img
        className="rounded-lg"
        width={120}
        src={experience.photoGallery![0].url}
        alt="experience"
      />
    </div>
  );
};

export default MyExperienceCard;

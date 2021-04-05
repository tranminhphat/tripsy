import currencyFormatter from "helpers/currencyFormatter";
import * as React from "react";

interface Props {
  experienceTitle: string;
  experienceImage: string;
  experiencePrice: number;
}

const MyExperienceCard: React.FC<Props> = ({
  experienceTitle,
  experienceImage,
  experiencePrice,
}) => {
  return (
    <div>
      <div>
        <img
          className="rounded-lg"
          width={220}
          height={300}
          src={experienceImage}
          alt="experience"
        />
      </div>
      <div className="mt-2">
        <h1 className="text-2xl font-bold">{experienceTitle}</h1>
        <p className="text-lg">{currencyFormatter(experiencePrice)} / người</p>
      </div>
    </div>
  );
};

export default MyExperienceCard;

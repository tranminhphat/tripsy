import StarIcon from "@material-ui/icons/Star";
import currencyFormatter from "helpers/currencyFormatter";
import { useCountReview } from "hooks/queries/reviews";
import IExperience from "interfaces/experiences/experience.interface";
import * as React from "react";

interface Props {
  experience: IExperience;
}

const MyExperienceCard: React.FC<Props> = ({ experience }) => {
  const { data: reviews } = useCountReview(experience._id!);

  return (
    <div className="flex justify-between border border-gray-300 rounded-lg">
      {reviews ? (
        <>
          <div className="mt-2 p-4">
            <h1 className="text-2xl font-bold">{experience.title}</h1>
            <p className="text-lg my-2">
              {currencyFormatter(experience.pricing?.individualPrice!)} / người
            </p>
            <div className="flex items-center">
              <span className="mr-2">
                <StarIcon style={{ width: 30, height: 30 }} />
              </span>
              <p className="mt-1">
                {reviews.averageStars} ({reviews.totalItems})
              </p>
            </div>
          </div>
          <img
            className="rounded-lg"
            width={120}
            src={experience.photoGallery![0].url}
            alt="experience"
          />
        </>
      ) : null}
    </div>
  );
};

export default MyExperienceCard;

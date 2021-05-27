import StarIcon from "@material-ui/icons/Star";
import { useExperience } from "hooks/queries/experiences";
import { useCountReview } from "hooks/queries/reviews";
import * as React from "react";
import { Link } from "react-router-dom";

interface Props {
  experienceId: string;
}

const ExperienceCard: React.FC<Props> = ({ experienceId }) => {
  const { data: experience } = useExperience(experienceId);
  const { data: reviews } = useCountReview(experienceId);
  return (
    <>
      {experience && reviews ? (
        <Link to={`/experience/${experienceId}`}>
          <img
            style={{ width: 200, height: 300 }}
            className="rounded-md border border-gray-500"
            src={experience.photoGallery![0]?.url}
            alt="description"
          />
          <div style={{ maxWidth: 200, height: 40 }}>
            <div className="mt-2">
              <span>
                <StarIcon className="text-sm text-secondary" />
              </span>
              <span className="text-sm text-gray-500 mx-1">
                {reviews.averageStars}
              </span>
              <span className="text-sm text-gray-500">
                ({reviews.totalItems})
              </span>
              <span>·</span>
              <span className="text-sm text-gray-500 mx-1">
                {experience.address?.city}
              </span>
            </div>
          </div>
          <div style={{ maxWidth: 200 }}>
            <div className="mt-2">
              <span className="text-sm font-bold">{experience.title}</span>
            </div>
          </div>
        </Link>
      ) : null}
    </>
  );
};

export default ExperienceCard;

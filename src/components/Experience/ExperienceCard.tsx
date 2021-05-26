import { useExperience } from "hooks/queries/experiences";
import * as React from "react";
import { Link } from "react-router-dom";

interface Props {
  experienceId: string;
}

const ExperienceCard: React.FC<Props> = ({ experienceId }) => {
  const { data: experience } = useExperience(experienceId);
  return (
    <>
      {experience ? (
        <Link to={`/experience/${experienceId}`}>
          <img
            style={{ width: 200, height: 300 }}
            className="rounded-md border border-gray-500"
            src={experience.photoGallery![0]?.url}
            alt="description"
          />
          <div style={{ maxWidth: 200 }}>
            <div className="mt-2 text-center">
              <p>{experience.title}</p>
            </div>
          </div>
        </Link>
      ) : null}
    </>
  );
};

export default ExperienceCard;

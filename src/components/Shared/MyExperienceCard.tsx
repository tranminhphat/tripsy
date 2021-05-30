import StarIcon from "@material-ui/icons/Star";
import LoveIcon from "assets/images/icons/love.svg";
import LovedIcon from "assets/images/icons/loved.svg";
import currencyFormatter from "helpers/currencyFormatter";
import { useExperience } from "hooks/queries/experiences";
import { useCountReview } from "hooks/queries/reviews";
import * as React from "react";

interface Props {
  experienceId: string;
  isSaved: boolean;
}

const MyExperienceCard: React.FC<Props> = ({ experienceId, isSaved }) => {
  const { data: experience } = useExperience(experienceId);
  const { data: reviews } = useCountReview(experienceId);

  return (
    <>
      {experience && reviews ? (
        <div>
          <hr className="my-6" />
          <div className="flex">
            <div style={{ minWidth: 190 }} className="mr-4">
              <img
                className="rounded-lg"
                width={190}
                src={experience.photoGallery![0].url}
                alt="experience"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between">
                <div>
                  <h1 className="text-xl font-semibold">{experience.title}</h1>
                </div>
                <div>
                  <img
                    src={isSaved ? LovedIcon : LoveIcon}
                    alt="saved experience"
                    width={24}
                    height={24}
                  />
                </div>
              </div>
              <div className="mt-2">
                <hr className="w-12" />
              </div>
              <div className="mt-2">
                <span className="text-sm font-bold">Nội dung:</span>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  {experience.description?.substr(0, 300)}...
                </p>
              </div>
              <div className="mt-2">
                <span className="text-sm text-gray-500">
                  {experience.duration} giờ
                </span>
                <span className="text-sm text-gray-500"> · </span>
                <span className="text-sm text-gray-500">
                  {experience.groupSize} người tham gia
                </span>
              </div>
              <div className="mt-auto flex justify-between">
                <div className="flex items-center">
                  <span className="mr-2">
                    <StarIcon style={{ width: 30, height: 30 }} />
                  </span>
                  <p>
                    {reviews.averageStars} ({reviews.totalItems})
                  </p>
                </div>
                <div>
                  <p className="text-lg">
                    <span className="text-2xl font-semibold">
                      {currencyFormatter(experience.pricing?.individualPrice!)}
                    </span>
                    <span> / </span>
                    <span>người</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MyExperienceCard;

import { Button } from "@material-ui/core";
import LoveIcon from "assets/images/icons/love.svg";
import LovedIcon from "assets/images/icons/loved.svg";
import NoDataIcon from "assets/images/icons/no-data.svg";
import DescriptionSection from "components/Experience/DescriptionSection";
import HostSection from "components/Experience/HostSection";
import InformSection from "components/Experience/InformSection";
import LocationSection from "components/Experience/LocationSection";
import PhotoGallerySection from "components/Experience/PhotoGallerySection";
import ReviewSection from "components/Experience/ReviewSection";
import SimilarExpSection from "components/Experience/SimilarExpSection";
import TitleSection from "components/Experience/TitleSection";
import MyBreadcrumbs from "components/Shared/MyBreadcrumbs";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import currencyFormatter from "helpers/currencyFormatter";
import toWeekDayString from "helpers/toWeekDayString";
import { useSaveExperiences } from "hooks/mutations/profiles";
import { useActivitiesByExperienceId } from "hooks/queries/activities";
import {
  useExperience,
  useSimilarExperiences,
} from "hooks/queries/experiences";
import { useProfile } from "hooks/queries/profiles";
import { useCurrentUser } from "hooks/queries/users";
import IActivity from "interfaces/activity/activity.interface";
import MainLayout from "layouts/MainLayout";
import * as React from "react";
import { Link, useParams, useRouteMatch } from "react-router-dom";

interface Props {}

const ExperiencePage: React.FC<Props> = () => {
  const { id } = useParams<{ id: string }>();
  const { url } = useRouteMatch();
  const savedExperience = useSaveExperiences();
  const { data: experience } = useExperience(id);
  const { data: activities } = useActivitiesByExperienceId(id, 0);
  const { data: user } = useCurrentUser();
  const { data: userProfile } = useProfile(user?.profileId);
  const { data: expList } = useSimilarExperiences(id);
  const isExperienceSaved = userProfile?.savedExperiences?.includes(id);

  const compareFunction = (a: IActivity, b: IActivity) => {
    return a.date.dateObject.unix - b.date.dateObject.unix;
  };

  return (
    <MainLayout>
      {experience && user && userProfile && expList ? (
        <div className="w-full h-full mx-auto max-w-screen-lg">
          <div className="flex justify-between mt-4">
            <MyBreadcrumbs
              linkArray={[
                {
                  path: "/",
                  name: "Trang chủ",
                },
                {
                  path: `/experience/${id}`,
                  name: `${experience.title}`,
                },
              ]}
            />
            <div>
              <button
                type="button"
                onClick={() => {
                  savedExperience.mutate({
                    profileId: userProfile._id!,
                    experienceId: experience._id!,
                  });
                }}
              >
                <div className="flex items-center">
                  <img
                    className="mr-1"
                    src={isExperienceSaved ? LovedIcon : LoveIcon}
                    alt="saved experience"
                    width={16}
                    height={16}
                  />
                  <span className="ml-1 underline">
                    {!isExperienceSaved ? "Lưu" : "Xóa"}
                  </span>
                </div>
              </button>
            </div>
          </div>
          <div className="mt-4">
            <PhotoGallerySection photoGallery={experience.photoGallery!} />
          </div>
          <div className="my-8">
            <div className="flex justify-between">
              <div className="mr-10 max-w-xl">
                <div className="mt-8">
                  <TitleSection title={experience.title!} />
                </div>
                <div className="mt-8">
                  <hr />
                </div>
                <div className="mt-8">
                  <InformSection experience={experience} />
                </div>
                <div className="mt-8">
                  <hr />
                </div>
                <div className="mt-8">
                  <DescriptionSection description={experience.description!} />
                </div>
                <div className="mt-8">
                  <hr />
                </div>
                <div className="mt-8">
                  <HostSection userId={experience.hostId!} />
                </div>
              </div>
              <div className="flex-grow ml-10">
                <div className="mt-8 top-24 z-10 inline-block w-full">
                  <div className="border border-gray-300 rounded-lg shadow-lg p-4">
                    <div>
                      <p>
                        <span className="text-xl font-bold">
                          {currencyFormatter(
                            experience.pricing?.individualPrice as number
                          )}
                        </span>
                        <span className="text-xl"> / người</span>
                      </p>
                    </div>
                    <div className="mt-4">
                      {experience.hostId === user._id ? (
                        <>
                          <p className="text-lg mb-2">
                            Đây là hoạt động do bạn tổ chức
                          </p>
                          <Link
                            to={`/user/experience-hosting/${id}/activation`}
                          >
                            <p className="underline">Đi đến hoạt động</p>
                          </Link>
                        </>
                      ) : (
                        <>
                          {activities && activities.length !== 0 ? (
                            activities
                              .sort(compareFunction)
                              .map((item, idx) => (
                                <div
                                  key={idx}
                                  className="mt-2 flex items-center justify-between"
                                >
                                  <p>
                                    {toWeekDayString(
                                      item.date.dateObject.weekDay
                                    )}
                                    , {item.date.dateObject.day}/
                                    {item.date.dateObject.month}/
                                    {item.date.dateObject.year}
                                  </p>
                                  <Link
                                    to={{
                                      pathname: `${url}/confirm-booking`,
                                      search: `?activityId=${item._id}`,
                                    }}
                                  >
                                    <Button
                                      className="bg-primary text-white"
                                      variant="contained"
                                    >
                                      Đặt chổ
                                    </Button>
                                  </Link>
                                </div>
                              ))
                          ) : (
                            <div className="mt-8">
                              <div className="flex flex-col items-center justify-center text-center">
                                <img
                                  src={NoDataIcon}
                                  width={150}
                                  height={150}
                                  alt="no data"
                                />
                                <p className="mt-2 text-xl text-gray-500">
                                  Không có dữ liệu
                                </p>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="my-8">
            <div className="mt-8">
              <hr />
            </div>
            <div className="mt-8">
              <LocationSection
                detail={experience.address?.detail!}
                coordinates={experience.location!.coordinates}
              />
            </div>
            <div className="mt-8">
              <hr />
            </div>
            <div className="mt-8">
              <ReviewSection experienceId={experience._id!} />
            </div>
            <div className="mt-8">
              <hr />
            </div>
            <div className="mt-8">
              <SimilarExpSection expList={expList!} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-grow justify-center items-center">
          <MyLoadingIndicator width={300} height={300} />
        </div>
      )}
    </MainLayout>
  );
};

export default ExperiencePage;

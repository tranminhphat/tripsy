import { Button } from "@material-ui/core";
import { getActivities } from "api/activity";
import { getExperienceById } from "api/experiences";
import { getProfileById, saveExperience } from "api/profile";
import { getCurrentUser } from "api/users";
import LoveIcon from "assets/images/icons/love.svg";
import LovedIcon from "assets/images/icons/loved.svg";
import DescriptionSection from "components/Experience/DescriptionSection";
import HostSection from "components/Experience/HostSection";
import InformSection from "components/Experience/InformSection";
import LocationSection from "components/Experience/LocationSection";
import PhotoGallerySection from "components/Experience/PhotoGallerySection";
import ReviewSection from "components/Experience/ReviewSection";
import TitleSection from "components/Experience/TitleSection";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import currencyFormatter from "helpers/currencyFormatter";
import toWeekDayString from "helpers/toWeekDayString";
import IActivity from "interfaces/activity/activity.interface";
import IExperience from "interfaces/experiences/experience.interface";
import IProfile from "interfaces/profiles/profile.interface";
import { IUser } from "interfaces/users/user.interface";
import MainLayout from "layouts/MainLayout";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import { showAlert } from "redux/actions/alert/alertAction";

interface Props {}

const ExperiencePage: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const { url } = useRouteMatch();
  const [isExperienceSaved, setIsExperienceSaved] = useState(false);
  const [experience, setExperience] = useState<IExperience>();
  const [activities, setActivities] = useState<IActivity[]>();
  const [userProfile, setUserProfile] = useState<IProfile>();
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    fetchExperience(id);
    fetchActivitiesByExperienceId(id);
    fetchUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchExperience = async (id: string) => {
    const {
      data: { experience },
    } = await getExperienceById(id);
    if (experience) {
      setExperience(experience);
    }
  };

  const fetchActivitiesByExperienceId = async (experienceId: string) => {
    const { data: activities } = await getActivities({
      experienceId: experienceId,
    });
    setActivities(activities);
  };

  const fetchUserProfile = async () => {
    const {
      data: { user },
    } = await getCurrentUser();
    if (user) {
      setUser(user);
    }
    if (user.profileId) {
      const {
        data: { profile },
      } = await getProfileById(user.profileId);
      if (profile) {
        setUserProfile(profile);
        setIsExperienceSaved(!!userProfile?.savedExperiences?.includes(id));
      }
    }
  };

  const savedExperience = async () => {
    const { data } = await saveExperience(
      userProfile?._id as string,
      experience?._id as string
    );

    if (data) {
      dispatch(showAlert("success", "Lưu thành công"));
      setIsExperienceSaved(true);
    } else {
      dispatch(showAlert("success", "Xóa thành công"));
      setIsExperienceSaved(false);
    }
  };

  const compareFunction = (a: IActivity, b: IActivity) => {
    return a.date.dateObject.unix - b.date.dateObject.unix;
  };

  return (
    <MainLayout>
      {experience && user && userProfile ? (
        <div className="w-full h-full mx-auto max-w-screen-lg">
          <div className="flex justify-between">
            <div>Breadcrumb</div>
            <div>
              <button type="button" onClick={savedExperience}>
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
          <div className="mt-8">
            <PhotoGallerySection photoGallery={experience.photoGallery!} />
          </div>
          <div className="my-8">
            <div className="px-4 flex justify-between">
              <div className="relative w-7/12 mx-0">
                <div className="mt-8">
                  <TitleSection title={experience.title!} />
                </div>
                <div className="mt-8">
                  <hr />
                </div>
                <div className="mt-8">
                  <InformSection
                    experience={experience}
                    userId={user._id!}
                    userFirstName={user.firstName!}
                    userAvatar={user.avatarUrl!}
                  />
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
                <div className="mt-8">
                  <hr />
                </div>
                <div className="mt-8">
                  <LocationSection
                    coordinates={experience.location!.coordinates}
                  />
                </div>
                <div className="mt-8">
                  <hr />
                </div>
                <div className="mt-8">
                  <ReviewSection experienceId={experience._id!} />
                </div>
              </div>
              <div className="relative w-1/3 ml-1/12">
                <div className="sticky mt-8 top-24 z-10 inline-block w-full">
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
                        <p className="text-lg">
                          Đây là hoạt động do bạn tổ chức
                        </p>
                      ) : (
                        <>
                          <p className="text-lg">Lịch hoạt động: </p>
                          {activities
                            ? activities
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
                                        className="bg-secondary-blue text-white"
                                        variant="contained"
                                      >
                                        Đặt chổ
                                      </Button>
                                    </Link>
                                  </div>
                                ))
                            : null}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
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

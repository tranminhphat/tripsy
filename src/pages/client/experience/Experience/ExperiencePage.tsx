import { CircularProgress, Hidden } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { loadStripe } from "@stripe/stripe-js";
import { getExperienceById } from "api/experiences";
import { createBookingSession } from "api/payment";
import { getProfileById, updateProfileById } from "api/profile";
import { getCurrentUser } from "api/users";
import ClockIcon from "assets/images/icons/clock.svg";
import ConversationIcon from "assets/images/icons/conversation.svg";
import ListIcon from "assets/images/icons/list.svg";
import LoveIcon from "assets/images/icons/love.svg";
import LovedIcon from "assets/images/icons/loved.svg";
import PeopleIcon from "assets/images/icons/people.svg";
import SkeletonUserAvatar from "assets/images/icons/user.svg";
import MyImageCarousel from "components/Shared/MyImageCarousel";
import MyImageHero from "components/Shared/MyImageHero";
import MyMapbox from "components/Shared/MyMapbox";
import currencyFormatter from "helpers/currencyFormatter";
import { IExperienceResponse } from "interfaces/experiences/experience.interface";
import { IProfileResponse } from "interfaces/profiles/profile.interface";
import { IUserResponse } from "interfaces/users/user.interface";
import MainLayout from "layouts/MainLayout";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { showAlert } from "redux/actions/alert/alertAction";

const stripePromise = loadStripe(
  "pk_test_51IXjZvDcrQRGXIG6oVlm1uSOLxiyQnMTeGoCgnoYV3dcMAISpT1WpHia1PmB85B7oyIF26CQCkt3IbcQKcXvSs6C00Z348v2eg"
);

interface Props {}

const ExperiencePage: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const [isExperienceSaved, setIsExperienceSaved] = useState(false);
  const [experience, setExperience] = useState<IExperienceResponse>();
  const [userProfile, setUserProfile] = useState<IProfileResponse>();
  const [user, setUser] = useState<IUserResponse>();

  useEffect(() => {
    fetchExperience(id);
    fetchUserProfile();
  }, [id]);

  const fetchExperience = async (id: string) => {
    const {
      data: { experience },
    } = await getExperienceById(id);
    if (experience) {
      setExperience(experience);
    }
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
    if (!isExperienceSaved) {
      const res = await updateProfileById(userProfile?._id as string, {
        savedExperiences: [...(userProfile?.savedExperiences as string[]), id],
      });
      if (res) {
        dispatch(showAlert("success", "Lưu thành công"));
        setIsExperienceSaved(true);
      }
    } else {
      const res = await updateProfileById(userProfile?._id as string, {
        savedExperiences: userProfile?.savedExperiences?.filter(
          (item) => item !== id
        ),
      });
      if (res) {
        dispatch(showAlert("success", "Xóa thành công"));
        setIsExperienceSaved(false);
      }
    }
  };

  const handleClick = async () => {
    const stripe = await stripePromise;
    const {
      data: { id },
    } = await createBookingSession();
    if (stripe && id) {
      const result = await stripe.redirectToCheckout({
        sessionId: id,
      });
      console.log(result);
    }
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
            <div className="overflow-hidden rounded-lg">
              <Hidden mdUp>
                <MyImageCarousel
                  urlArray={
                    experience.photoGallery?.map((item) => item.url) as string[]
                  }
                />
              </Hidden>
              <Hidden mdDown>
                <MyImageHero photoGallery={experience.photoGallery!} />
              </Hidden>
            </div>
          </div>
          <div className="mt-8">
            <div className="px-4 flex justify-between">
              <div className="relative w-7/12 mx-0">
                <div className="mt-8">
                  <section>
                    <div className="relative">
                      <div>
                        <h1 className="text-4xl font-bold">
                          {experience.title}
                        </h1>
                      </div>
                    </div>
                  </section>
                </div>
                <div className="mt-8">
                  <hr />
                </div>
                <div className="mt-8">
                  <div className="flex justify-between items-center">
                    <div>
                      <h1 className="text-2xl font-bold">
                        Trải nghiệm được tổ chức bởi {user.firstName}
                      </h1>
                    </div>
                    <div>
                      <Link to={`/user/profile/${user._id}`}>
                        <Avatar
                          src={
                            user.avatarUrl ? user.avatarUrl : SkeletonUserAvatar
                          }
                          style={{ width: "48px", height: "48px" }}
                          alt="User"
                        />
                      </Link>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col md:flex-row md:items-stretch justify-start flex-wrap">
                    <div className="w-1/2 mb-4 flex items-center relative">
                      <div>
                        <img src={ClockIcon} alt="hours" />
                      </div>
                      <div className="ml-4 text-lg">
                        {experience.duration} giờ
                      </div>
                    </div>
                    <div className="w-1/2 mb-4 flex items-center relative">
                      <div>
                        <img src={ListIcon} alt="hours" />
                      </div>
                      <div className="ml-4 text-lg">
                        Bao gồm:{" "}
                        {experience.hostProvisions?.map((item) => (
                          <span>{item.itemName}</span>
                        ))}
                      </div>
                    </div>
                    <div className="w-1/2 mb-4 flex items-center relative">
                      <div>
                        <img src={PeopleIcon} alt="hours" />
                      </div>
                      <div className="ml-4 text-lg">
                        Tối đa {experience.groupSize} khách{" "}
                      </div>
                    </div>
                    <div className="w-1/2 mb-4 flex items-center relative">
                      <div>
                        <img src={ConversationIcon} alt="hours" />
                      </div>
                      <div className="ml-4 text-lg">
                        Tổ chức bằng {experience.language}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <hr />
                </div>
                <div className="mt-8">
                  <div>
                    <div>
                      <h1 className="text-2xl font-bold">Bạn sẽ làm gì</h1>
                    </div>
                    <div className="mt-4">
                      <p className="text-lg">{experience.description}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <hr />
                </div>
                <div className="mt-8">
                  <div className="flex">
                    <div>
                      <Link to={`/user/profile/${user._id}`}>
                        <Avatar
                          src={
                            user.avatarUrl ? user.avatarUrl : SkeletonUserAvatar
                          }
                          style={{ width: "48px", height: "48px" }}
                          alt="User"
                        />
                      </Link>
                    </div>
                    <div className="ml-2">
                      <h1 className="text-2xl font-bold">
                        Người hướng dẫn của bạn, {user.firstName}
                      </h1>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-lg">{userProfile.introduction}</p>
                  </div>
                </div>
                <div className="mt-8">
                  <hr />
                </div>
                <div className="mt-8">
                  <div>
                    <h1 className="text-2xl font-bold">Địa điểm tổ chức</h1>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <MyMapbox
                      width="100%"
                      height="400px"
                      coordinates={
                        experience.location?.coordinates as [number, number]
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="relative w-1/3 ml-1/12">
                <div className="sticky top-20 z-10 inline-block w-full">
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
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <CircularProgress />
      )}
    </MainLayout>
  );
};

export default ExperiencePage;

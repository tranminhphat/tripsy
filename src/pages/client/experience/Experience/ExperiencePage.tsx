import { CircularProgress, Hidden } from "@material-ui/core";
import { loadStripe } from "@stripe/stripe-js";
import { getExperienceById } from "api/experiences";
import { createBookingSession } from "api/payment";
import { getProfileById, updateProfileById } from "api/profile";
import { getCurrentUser } from "api/users";
import LoveIcon from "assets/images/icons/love.svg";
import LovedIcon from "assets/images/icons/loved.svg";
import MyImageCarousel from "components/Shared/MyImageCarousel";
import MyImageHero from "components/Shared/MyImageHero";
import { IExperienceResponse } from "interfaces/experiences/experience.interface";
import { IProfileResponse } from "interfaces/profiles/profile.interface";
import MainLayout from "layouts/MainLayout";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
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
      data: {
        user: { profileId },
      },
    } = await getCurrentUser(["profileId"]);
    if (profileId) {
      const {
        data: { profile },
      } = await getProfileById(profileId);
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
        <div className="mt-4">
          {experience?.photoGallery ? (
            <div className="overflow-hidden rounded-lg">
              <Hidden smUp>
                <MyImageCarousel
                  urlArray={
                    experience.photoGallery?.map((item) => item.url) as string[]
                  }
                />
              </Hidden>
              <Hidden mdDown>
                <MyImageHero photoGallery={experience.photoGallery} />
              </Hidden>
            </div>
          ) : (
            <CircularProgress />
          )}
        </div>
        <div></div>
      </div>
    </MainLayout>
  );
};

export default ExperiencePage;

import { CircularProgress, Hidden } from "@material-ui/core";
import { loadStripe } from "@stripe/stripe-js";
import { getExperienceById } from "api/experiences";
import { createBookingSession } from "api/payment";
import MyImageCarousel from "components/Shared/MyImageCarousel";
import MyImageHero from "components/Shared/MyImageHero";
import { IExperienceResponse } from "interfaces/experiences/experience.interface";
import MainLayout from "layouts/MainLayout";
import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const stripePromise = loadStripe(
  "pk_test_51IXjZvDcrQRGXIG6oVlm1uSOLxiyQnMTeGoCgnoYV3dcMAISpT1WpHia1PmB85B7oyIF26CQCkt3IbcQKcXvSs6C00Z348v2eg"
);

interface Props {}

const ExperiencePage: React.FC<Props> = () => {
  const { id } = useParams<{ id: string }>();
  const [experience, setExperience] = useState<IExperienceResponse>();

  useEffect(() => {
    fetchExperience(id);
  }, [id]);

  const fetchExperience = async (id: string) => {
    const {
      data: { experience },
    } = await getExperienceById(id);
    if (experience) {
      setExperience(experience);
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
    </MainLayout>
  );
};

export default ExperiencePage;

import { CircularProgress } from "@material-ui/core";
import { loadStripe } from "@stripe/stripe-js";
import { getExperienceById } from "api/experiences";
import { createBookingSession } from "api/payment";
import { IExperienceResponse } from "interfaces/experiences/experience.interface";
import * as React from "react";
import { useEffect, useState } from "react";
import { DateObject } from "react-multi-date-picker";
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
    <div>
      {experience?.availableDates ? (
        <>
          <div>availables date</div>
          {experience.availableDates
            .filter((item) => {
              const today = new DateObject();
              return item.unix - today.unix > experience.bookingDate! * 86400;
            })
            .map((item) => (
              <div key={item.unix}>
                {item.day}/{item.month}/{item.year}
              </div>
            ))}
          <button type="button" onClick={handleClick}>
            book
          </button>
        </>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default ExperiencePage;

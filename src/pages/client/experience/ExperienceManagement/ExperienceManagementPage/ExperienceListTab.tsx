import { CircularProgress } from "@material-ui/core";
import { getReceipts } from "api/receipt";
import { createRefund, getCheckoutSessionById } from "api/stripe";
import { getCurrentUser } from "api/users";
import * as React from "react";
import { useEffect, useState } from "react";

interface Props {}

const ExperienceListTab: React.FC<Props> = () => {
  const [experience, setExperience] = useState<any[]>();
  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = async () => {
    const {
      data: {
        user: { _id: userId },
      },
    } = await getCurrentUser(["_id"]);
    if (userId) {
      const { data } = await getReceipts({ guestId: userId });
      if (data) {
        setExperience(data);
      }
    }
  };

  const handleRefundExperience = async (checkOutSessionId: string) => {
    const {
      data: { session },
    } = await getCheckoutSessionById(checkOutSessionId);
    if (session.payment_intent) {
      const refund = await createRefund(session.payment_intent);
      console.log(refund);
    }
  };

  return (
    <div>
      {experience ? (
        experience.map((item) => (
          <div key={item._id}>
            <p>{item.experienceId}</p>
            <button
              onClick={() => handleRefundExperience(item.checkOutSessionId)}
            >
              refund
            </button>
          </div>
        ))
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default ExperienceListTab;

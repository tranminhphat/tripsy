import { CircularProgress } from "@material-ui/core";
import { updateListOfGuest } from "api/activity";
import { deleteReceiptById, getReceipts } from "api/receipt";
import { createRefund, getCheckoutSessionById } from "api/stripe";
import { getCurrentUser } from "api/users";
import IReceipt from "interfaces/receipts/receipt.interface";
import * as React from "react";
import { useEffect, useState } from "react";

interface Props {}

const ExperienceListTab: React.FC<Props> = () => {
  const [receipts, setReceipts] = useState<IReceipt[]>();
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
        setReceipts(data);
      }
    }
  };

  const handleRefundExperience = async (
    checkOutSessionId: string,
    receipt: IReceipt
  ) => {
    const {
      data: { session },
    } = await getCheckoutSessionById(checkOutSessionId);
    if (session.payment_intent) {
      await deleteReceiptById(receipt._id!);
      await updateListOfGuest(receipt.activityId);
      await createRefund(session.payment_intent);
    }
  };

  return (
    <div>
      {receipts ? (
        receipts.map((item) => (
          <div key={item._id}>
            <p>{item.experienceId}</p>
            <button
              onClick={() =>
                handleRefundExperience(item.checkOutSessionId as string, item)
              }
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

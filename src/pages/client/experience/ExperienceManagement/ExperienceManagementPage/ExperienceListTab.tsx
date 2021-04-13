import { Button } from "@material-ui/core";
import { updateListOfGuest } from "api/activity";
import { getExperienceById } from "api/experiences";
import { updateCheckpoints } from "api/profile";
import { deleteReceiptById, getReceipts } from "api/receipt";
import { createRefund, getCheckoutSessionById } from "api/stripe";
import { getCurrentUser } from "api/users";
import CheckpointModal from "components/Modals/CheckpointModal";
import ExperienceReviewModal from "components/Modals/ExperienceReviewModal";
import UserReviewModal from "components/Modals/UserReviewModal";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import { themes } from "constants/index";
import IReceipt from "interfaces/receipts/receipt.interface";
import * as React from "react";
import { useEffect, useState } from "react";

interface Props {}

const ExperienceListTab: React.FC<Props> = () => {
  const [openCheckpointModal, setOpenCheckpointModal] = useState(false);
  const [openUserReviewModal, setOpenUserReviewModal] = useState(false);
  const [openExperienceReviewModal, setOpenExperienceReviewModal] = useState(
    false
  );

  const [isLoading, setIsLoading] = useState(false);
  const [percent, setPercent] = useState<number | null>(null);
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
      const { data } = await getReceipts({ guestId: userId, status: "paid" });
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

  const handleCompleteExperience = async (experienceId: string) => {
    setIsLoading(true);
    const {
      data: { experience },
    } = await getExperienceById(experienceId);
    const [{ id: themeId }] = themes.filter(
      (item) => item.name === experience.theme
    );
    const { data } = await updateCheckpoints(themeId);
    setPercent(data.currentPoints);
    setIsLoading(false);
  };

  return (
    <div>
      {receipts ? (
        receipts.map((item) => (
          <div key={item._id}>
            <p>{item.experienceId}</p>
            <div>
              <Button
                className="bg-secondary-blue text-white overflow-hidden"
                style={{ width: "160px", height: "50px" }}
                variant="contained"
                onClick={() =>
                  handleRefundExperience(item.checkOutSessionId as string, item)
                }
              >
                <span>refund</span>
              </Button>
            </div>
            <div>
              <Button
                className="bg-secondary-blue text-white overflow-hidden"
                style={{ width: "160px", height: "50px" }}
                variant="contained"
                onClick={() => setOpenUserReviewModal(true)}
              >
                <span>user review</span>
              </Button>
            </div>
            <div>
              <Button
                className="bg-secondary-blue text-white overflow-hidden"
                style={{ width: "160px", height: "50px" }}
                variant="contained"
                onClick={() => setOpenExperienceReviewModal(true)}
              >
                <span>experience review</span>
              </Button>
            </div>
            <div>
              <Button
                className="bg-secondary-blue text-white overflow-hidden"
                style={{ width: "160px", height: "50px" }}
                variant="contained"
                onClick={() => {
                  handleCompleteExperience(item.experienceId);
                  setOpenCheckpointModal(true);
                }}
              >
                <span>
                  {!isLoading ? "done experience" : <MyLoadingIndicator />}
                </span>
              </Button>
            </div>

            <UserReviewModal
              open={openUserReviewModal}
              setOpen={setOpenUserReviewModal}
              objectId={item.hostId}
            />

            <ExperienceReviewModal
              open={openExperienceReviewModal}
              setOpen={setOpenExperienceReviewModal}
              objectId={item.experienceId}
            />

            {percent ? (
              <CheckpointModal
                isOpen={openCheckpointModal}
                onClose={() => {
                  setPercent(null);
                }}
                percent={percent}
              />
            ) : null}
          </div>
        ))
      ) : (
        <div className="flex-grow justify-center items-center">
          <MyLoadingIndicator width={300} height={300} />
        </div>
      )}
    </div>
  );
};

export default ExperienceListTab;

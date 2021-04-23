import { Avatar, Button, Tooltip, Typography } from "@material-ui/core";
import { getExperienceById } from "api/experiences";
import { createRefund, getCheckoutSessionById } from "api/stripe";
import ClockIcon from "assets/images/icons/clock.svg";
import DestinationIcon from "assets/images/icons/destination.svg";
import HostIcon from "assets/images/icons/host.svg";
import SkeletonUserAvatar from "assets/images/icons/user.svg";
import FilterExperienceList from "components/Experience/FilterExperienceList";
import CheckpointModal from "components/Modals/CheckpointModal";
import ExperienceReviewModal from "components/Modals/ExperienceReviewModal";
import UserReviewModal from "components/Modals/UserReviewModal";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import { themes } from "constants/index";
import { createCancelBookingNotificationModel } from "helpers/createNotificationModel";
import currencyFormatter from "helpers/currencyFormatter";
import { useUpdateGuestList } from "hooks/mutations/activities";
import { useCreateNotification } from "hooks/mutations/notifications";
import { useUpdateCheckpoint } from "hooks/mutations/profiles";
import { useDeleteReceipt, useUpdateReceipt } from "hooks/mutations/receipts";
import { useReceipts } from "hooks/queries/receipts";
import { useCurrentUser } from "hooks/queries/users";
import IReceipt from "interfaces/receipts/receipt.interface";
import * as React from "react";
import { useState } from "react";

interface Props {}

const ExperienceListTab: React.FC<Props> = () => {
  const [openCheckpointModal, setOpenCheckpointModal] = useState(false);
  const [openUserReviewModal, setOpenUserReviewModal] = useState(false);
  const [openExperienceReviewModal, setOpenExperienceReviewModal] = useState(
    false
  );
  const [status, setStatus] = useState<string>("paid");

  const [isCompleting, setIsCompleting] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [checkpointData, setCheckpointData] = useState<any>(null);
  const { data: currentUser } = useCurrentUser();
  const { data: receipts } = useReceipts({ guestId: currentUser?._id, status });
  const updateCheckpoint = useUpdateCheckpoint();
  const updateReceipt = useUpdateReceipt();
  const deleteReceipt = useDeleteReceipt();
  const updateGuestList = useUpdateGuestList();
  const createNotification = useCreateNotification();

  const handleCancelExperience = async (
    checkOutSessionId: string,
    receipt: IReceipt
  ) => {
    setIsCancelling(true);
    const {
      data: { session },
    } = await getCheckoutSessionById(checkOutSessionId);
    if (session.payment_intent) {
      await createRefund(session.payment_intent);
      deleteReceipt.mutate({ receiptId: receipt._id as string });
      updateGuestList.mutate({ activityId: receipt.activity?._id as string });
      const notificationModel = await createCancelBookingNotificationModel(
        receipt.activityId as string
      );
      createNotification.mutate(notificationModel, {
        onSuccess: () => {
          setIsCancelling(false);
        },
      });
    }
  };

  const handleCompleteExperience = async (
    experienceId: string,
    receiptId: string
  ) => {
    setIsCompleting(true);
    const {
      data: { experience },
    } = await getExperienceById(experienceId);
    const [{ id: themeId }] = themes.filter(
      (item) => item.name === experience.theme
    );
    updateCheckpoint.mutate(
      { themeId },
      {
        onSuccess: (data) => {
          setCheckpointData(data);
          updateReceipt.mutate({ receiptId, values: { status: "finish" } });
          setIsCompleting(false);
        },
      }
    );
  };

  return (
    <div className="max-w-2xl my-8">
      <FilterExperienceList setStatus={setStatus} />
      {receipts ? (
        receipts.map((item) => (
          <div className="mt-4" key={item._id}>
            <div className="flex justify-between border border-gray-300 rounded-lg ">
              <div className="mt-2 p-4 flex-grow">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold">
                    {item.experience?.title}
                  </h1>
                  <Typography className="underline">
                    {currencyFormatter(
                      item.experience?.pricing?.individualPrice!
                    )}
                  </Typography>
                </div>
                <div className="flex items-center mt-4">
                  <img src={HostIcon} alt="host" width={32} height={32} />
                  <div className="ml-6 flex items-center">
                    <Avatar
                      src={
                        item.host?.avatarUrl
                          ? item.host?.avatarUrl
                          : SkeletonUserAvatar
                      }
                      style={{ width: "32px", height: "32px" }}
                      alt="User"
                    />
                    <Typography className="ml-2 text-lg">
                      {item.host?.lastName} {item.host?.firstName}
                    </Typography>
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <img
                    src={DestinationIcon}
                    alt="destination"
                    width={32}
                    height={32}
                  />
                  <Typography className="ml-6 text-lg">
                    {item.experience?.address?.district},{" "}
                    {item.experience?.address?.city}
                  </Typography>
                </div>
                <div className="flex items-center mt-2">
                  <img src={ClockIcon} alt="date" width={32} height={32} />
                  <Typography className="ml-6 text-lg">
                    {item.activity?.date.dateObject.day}/
                    {item.activity?.date.dateObject.month}/
                    {item.activity?.date.dateObject.year}
                  </Typography>
                </div>
                <div className="flex items-center mt-4">
                  {item.status !== "finish" ? (
                    <>
                      <div className="mr-4">
                        <Tooltip title="Hủy và nhận hoàn tiền">
                          <Button
                            className="border-black overflow-hidden"
                            variant="outlined"
                            onClick={() =>
                              handleCancelExperience(
                                item.checkOutSessionId as string,
                                item
                              )
                            }
                          >
                            {!isCancelling ? (
                              <div className="flex items-center">
                                <Typography>Hủy bỏ</Typography>
                              </div>
                            ) : (
                              <div className="overflow-hidden">
                                <MyLoadingIndicator />
                              </div>
                            )}
                          </Button>
                        </Tooltip>
                      </div>
                      <div className="ml-2">
                        <Tooltip title="Hoàn thành và nhận điểm tích lũy">
                          <Button
                            className="bg-primary text-white overflow-hidden"
                            variant="contained"
                            onClick={() => {
                              handleCompleteExperience(
                                item.experienceId,
                                item._id!
                              );
                              setOpenCheckpointModal(true);
                            }}
                          >
                            {!isCompleting ? (
                              <div className="flex items-center">
                                <Typography>Hoàn thành</Typography>
                              </div>
                            ) : (
                              <div className="overflow-hidden">
                                <MyLoadingIndicator />
                              </div>
                            )}
                          </Button>
                        </Tooltip>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mr-4">
                        <Button
                          className="border-black hover:bg-black hover:text-white whitespace-nowrap overflow-hidden"
                          style={{ width: "200px", height: "50px" }}
                          variant="outlined"
                          onClick={() => setOpenUserReviewModal(true)}
                        >
                          <span>Đánh giá người tổ chức</span>
                        </Button>
                      </div>
                      <div className="ml-4">
                        <Button
                          className="border-black hover:bg-black hover:text-white whitespace-nowrap overflow-hidden"
                          style={{ width: "200px", height: "50px" }}
                          variant="outlined"
                          onClick={() => setOpenExperienceReviewModal(true)}
                        >
                          <span>Đánh giá trải nghiệm</span>
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <img
                className="rounded-lg"
                width={180}
                src={item.experience?.photoGallery![0].url}
                alt="experience"
              />
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

            {checkpointData ? (
              <CheckpointModal
                isOpen={openCheckpointModal}
                onClose={() => {
                  setCheckpointData(null);
                }}
                checkpointData={checkpointData}
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

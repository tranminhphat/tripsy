import { Avatar, Button, Tooltip, Typography } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
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
import MyModal from "components/Shared/MyModal";
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
import { DateObject } from "react-multi-date-picker";

interface Props {}

const ExperienceListTab: React.FC<Props> = () => {
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
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

  const canActivityCancel = (unixTime: number) => {
    const today = new DateObject();
    return unixTime - today.unix > 86400 * 14;
  };

  const isActivityFinish = (unixTime: number) => {
    const today = new DateObject();
    return today.unix > unixTime;
  };

  return (
    <div className="my-8">
      {receipts ? (
        receipts.map((item) => (
          <>
            <FilterExperienceList setStatus={setStatus} />
            <div className="flex">
              <div className="mt-4 w-full max-w-2xl" key={item._id}>
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
                    <div className="flex items-center justify-between mt-4">
                      {item.status !== "finish" ? (
                        <>
                          <div
                            className={`mt-2 h-12 ${
                              !canActivityCancel(
                                item.activity?.date.dateObject.unix!
                              )
                                ? "cursor-not-allowed"
                                : ""
                            }`}
                          >
                            <Tooltip title="Hủy và nhận hoàn tiền">
                              <Button
                                className={`outline-none overflow-hidden w-full h-full ${
                                  !canActivityCancel(
                                    item.activity?.date.dateObject.unix!
                                  )
                                    ? "pointer-events-none bg-gray-300 text-gray-500"
                                    : "border-danger text-danger hover:bg-danger hover:text-white"
                                }`}
                                variant="outlined"
                                onClick={() => setOpenConfirmDeleteModal(true)}
                              >
                                {!isCancelling ? (
                                  <div className="flex items-center">
                                    <p className="text-semibold">
                                      Hủy bỏ hoạt động này
                                    </p>
                                  </div>
                                ) : (
                                  <MyLoadingIndicator />
                                )}
                              </Button>
                            </Tooltip>
                          </div>
                          <div
                            className={`mx-auto mt-2 h-12 ${
                              !isActivityFinish(
                                item.activity?.date.dateObject.unix!
                              )
                                ? "cursor-not-allowed"
                                : ""
                            }`}
                          >
                            <Tooltip title="Hoàn thành và nhận điểm tích lũy">
                              <Button
                                className={`w-full h-full  overflow-hidden ${
                                  !isActivityFinish(
                                    item.activity?.date.dateObject.unix!
                                  )
                                    ? "pointer-events-none bg-gray-300 border-gray-300 text-gray-500"
                                    : "border-primary text-primary hover:bg-primary hover:text-white"
                                }`}
                                variant="outlined"
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
                                    <p className="text-semibold">
                                      Nhận điểm tích lũy
                                    </p>
                                  </div>
                                ) : (
                                  <MyLoadingIndicator />
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

                <MyModal
                  size="xl"
                  open={openConfirmDeleteModal}
                  setOpen={setOpenConfirmDeleteModal}
                >
                  {{
                    header: (
                      <p className="text-semibold text-xl">
                        Bạn có chắc chắc muốn xóa hoạt động này?
                      </p>
                    ),
                    footer: (
                      <div className="flex justify-end">
                        <button
                          onClick={() => setOpenConfirmDeleteModal(false)}
                        >
                          <p className="text-lg underline">Hủy</p>
                        </button>
                        <Button
                          variant="contained"
                          className="bg-danger mx-8 text-white"
                          onClick={() =>
                            handleCancelExperience(
                              item.checkOutSessionId as string,
                              item
                            )
                          }
                        >
                          Xóa
                        </Button>
                      </div>
                    ),
                  }}
                </MyModal>

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

              <div className="mt-4 ml-auto max-w-xs">
                <div className="border border-black rounded-lg py-4 px-8 text-center">
                  <InfoIcon style={{ width: "50px", height: "50px" }} />
                  <p className="mt-8">
                    Bạn chỉ có thể hủy tham gia hoạt động trước thời điểm hoạt
                    động diễn ra 2 tuần.
                  </p>
                  <p className="mt-8">
                    Nhận điểm tích lũy sau mỗi trải nghiệm để đạt được danh
                    hiệu.
                  </p>
                </div>
              </div>
            </div>
          </>
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

import {
  Avatar,
  Button,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import { AvatarGroup } from "@material-ui/lab";
import { getReceipts } from "api/receipt";
import {
  createRefund,
  createTransfer,
  getCheckoutSessionById,
} from "api/stripe";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import MyModal from "components/Shared/MyModal";
import { startTimeOptions } from "constants/index";
import AlertContext from "contexts/AlertContext";
import toWeekDayString from "helpers/toWeekDayString";
import {
  useCreateActivity,
  useDeleteActivity,
} from "hooks/mutations/activities";
import { useDeleteReceipt } from "hooks/mutations/receipts";
import { useActivitiesByExperienceId } from "hooks/queries/activities";
import { useExperience } from "hooks/queries/experiences";
import IActivity from "interfaces/activity/activity.interface";
import MainLayout from "layouts/MainLayout";
import * as React from "react";
import { useContext, useState } from "react";
import { Calendar, DateObject } from "react-multi-date-picker";
import { Link, useParams, useRouteMatch } from "react-router-dom";

interface Props {}

const ExperienceActivationPage: React.FC<Props> = () => {
  const { id } = useParams<{ id: string }>();
  const { url } = useRouteMatch();
  const { alert } = useContext(AlertContext);
  const { data: experience } = useExperience(id);
  const { data: activities } = useActivitiesByExperienceId(experience?._id!);
  console.log(activities);
  const createActivity = useCreateActivity();
  const deleteActivity = useDeleteActivity();
  const deleteReceipt = useDeleteReceipt();
  const [pickerValue, setPickerValue] = useState<any>();
  const [open, setOpen] = useState(false);
  const [startTimeOpen, setStartTimeOpen] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState<any>();

  const handleCreateActivity = async () => {
    const newDate = {
      startTimeIdx: startTime,
      endTimeIdx: endTime,
      dateObject: {
        dayOfYear: pickerValue.dayOfYear,
        weekDay: pickerValue.weekDay.number,
        year: pickerValue.year,
        month: pickerValue.month.number,
        day: pickerValue.day,
        unix: pickerValue.unix,
      },
    };

    createActivity.mutate(
      { experienceId: experience?._id, newDate },
      {
        onSuccess: () => {
          alert("success", "Thêm thành công");
          setStartTime(0);
          setEndTime(0);
          setPickerValue(null);
          setOpen(false);
        },
      }
    );
  };

  const handleCancelActivity = async (activity: IActivity) => {
    if (activity.listOfGuestId.length === 0) {
      deleteActivity.mutate({ activityId: activity._id });
    } else {
      for (let i = 0; i < activity.listOfGuestId.length; i++) {
        const { data: receipt } = await getReceipts({
          activityId: activity._id,
          guestId: activity.listOfGuestId[i],
        });

        const {
          data: { session },
        } = await getCheckoutSessionById(receipt[0].checkOutSessionId);
        if (session.payment_intent) {
          await createRefund(session.payment_intent);
          deleteReceipt.mutate({ receiptId: receipt[0]._id });
          deleteActivity.mutate({ activityId: activity._id });
        }
      }
    }
  };

  const handleCompleteActivity = async (activityId: string) => {
    await createTransfer(activityId);
    deleteActivity.mutate({ activityId });
  };

  const canActivityCancel = (unixTime: number, listOfGuest: string[]) => {
    const today = new DateObject();
    return unixTime - today.unix < 86400 * 14 || listOfGuest.length === 0;
  };

  const isActivityEnd = (unixTime: number) => {
    const today = new DateObject();
    return today.unix > unixTime;
  };

  const compareFunction = (a: IActivity, b: IActivity) => {
    return a.date.dateObject.unix - b.date.dateObject.unix;
  };

  return (
    <MainLayout withSearchBar={false}>
      <div className="container mx-auto my-10">
        <div className="flex justify-between container">
          <Typography className="text-3xl text-secondary font-bold">
            Lịch hoạt động
          </Typography>
          <Button
            variant="outlined"
            className="focus:outline-none text-primary border-primary hover:bg-primary hover:text-white"
            onClick={() => setOpen(true)}
          >
            Thêm lịch hoạt động
          </Button>
        </div>
        {experience ? (
          <div className="flex justify-between container">
            <div className="mt-8">
              {activities
                ? activities.sort(compareFunction).map((item, idx) => (
                    <Link to={`${url}/${item._id}`}>
                      <div
                        style={{ width: 800 }}
                        key={idx}
                        className="border border-gray-300 rounded-md p-4 shadow-lg mt-4"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-lg font-semibold">
                              {toWeekDayString(item.date.dateObject.weekDay)},{" "}
                              ngày {item.date.dateObject.day}/
                              {item.date.dateObject.month}/
                              {item.date.dateObject.year}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <div>
                              <AvatarGroup max={4}>
                                {item.guestsInfo.map((guest) => (
                                  <Avatar
                                    alt={guest.firstName}
                                    src={guest.avatarUrl}
                                  />
                                ))}
                              </AvatarGroup>
                            </div>
                            <div className="ml-8 text-md text-gray-500">
                              <PlaylistAddCheckIcon className="mr-2" />
                              {item.guestsInfo.length} /{" "}
                              {item.experience?.groupSize!}
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            {startTimeOptions[item.date.startTimeIdx - 1].text}{" "}
                            - {startTimeOptions[item.date.endTimeIdx - 1].text}
                          </p>
                        </div>
                        {/* <div className="flex justify-between mt-4">
                          <div
                            className={`${
                              !canActivityCancel(
                                item.date.dateObject.unix,
                                item.listOfGuestId
                              )
                                ? "cursor-not-allowed"
                                : ""
                            }`}
                          >
                            <Button
                              variant="contained"
                              size="large"
                              onClick={() => handleCancelActivity(item)}
                              className={` text-white ${
                                !canActivityCancel(
                                  item.date.dateObject.unix,
                                  item.listOfGuestId
                                )
                                  ? " pointer-events-none bg-gray-400"
                                  : "bg-red-600"
                              }`}
                            >
                              Hủy
                            </Button>
                          </div>
                          <div
                            className={`${
                              !isActivityEnd(item.date.dateObject.unix)
                                ? "cursor-not-allowed"
                                : ""
                            }`}
                          >
                            <Button
                              variant="contained"
                              size="large"
                              className={`text-white ${
                                !isActivityEnd(item.date.dateObject.unix)
                                  ? "bg-gray-400"
                                  : "bg-primary"
                              }`}
                              onClick={() =>
                                handleCompleteActivity(item._id as string)
                              }
                            >
                              Hoàn thành
                            </Button>
                          </div>
                        </div> */}
                      </div>
                    </Link>
                  ))
                : null}
            </div>
            <MyModal size="xl" open={open} setOpen={setOpen}>
              {{
                header: (
                  <h1 className="text-2xl font-bold">Thêm lịch hoạt động</h1>
                ),
                content: (
                  <div className="flex">
                    <div className="mr-8">
                      <div className="mb-4">
                        <p className="text-lg">Chọn ngày:</p>
                      </div>
                      <Calendar
                        mapDays={({ date }) => {
                          const today = new DateObject();
                          if (
                            date.unix <
                            today.unix +
                              (experience.bookingDate as number) * 86400
                          ) {
                            return {
                              disabled: true,
                              style: {
                                disabled: true,
                                style: { color: "#ccc" },
                              },
                            };
                          }
                        }}
                        format="DD/MM/YYYY"
                        value={pickerValue}
                        onChange={setPickerValue}
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="mb-4">
                        <p className="text-lg">Chọn giờ bắt đầu: </p>
                      </div>
                      <Select
                        className="w-full"
                        variant="outlined"
                        open={startTimeOpen}
                        onOpen={() => setStartTimeOpen(true)}
                        onClose={() => setStartTimeOpen(false)}
                        value={startTime}
                        onChange={(e) => {
                          setStartTime(e.target.value as number);
                          if ((e.target.value as number) !== 0) {
                            if ((e.target.value as number) >= 45) {
                              setEndTime(
                                (e.target.value as number) +
                                  (experience.duration as number) * 2 -
                                  48
                              );
                            } else {
                              setEndTime(
                                (e.target.value as number) +
                                  (experience.duration as number) * 2
                              );
                            }
                          } else {
                            setEndTime(null);
                          }
                        }}
                      >
                        <MenuItem key={0} value={0}>
                          Giờ bắt đầu
                        </MenuItem>

                        {startTimeOptions.map((option: any) => (
                          <MenuItem key={option.index} value={option.index}>
                            {option.text}
                          </MenuItem>
                        ))}
                      </Select>
                      <div className="mt-4">
                        {endTime ? (
                          <p className="text-lg">
                            Giờ kết thúc: {startTimeOptions[endTime - 1].text}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ),
                footer: (
                  <div className="flex justify-between">
                    <Button
                      onClick={() => setOpen(false)}
                      variant="contained"
                      className="mr-2"
                    >
                      Hủy
                    </Button>
                    <Button
                      onClick={handleCreateActivity}
                      disabled={!(pickerValue && startTime && endTime)}
                      variant="contained"
                      color="primary"
                      className="ml-2"
                    >
                      Thêm
                    </Button>
                  </div>
                ),
              }}
            </MyModal>
          </div>
        ) : (
          <div className="flex-grow justify-center items-center">
            <MyLoadingIndicator width={300} height={300} />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ExperienceActivationPage;

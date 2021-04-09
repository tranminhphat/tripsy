import {
  Button,
  CircularProgress,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import {
  createActivity,
  deleteActivityById,
  getActivities,
} from "api/activity";
import { getExperienceById } from "api/experiences";
import { deleteReceiptById, getReceipts } from "api/receipt";
import {
  createRefund,
  createTransfer,
  getCheckoutSessionById,
} from "api/stripe";
import MyModal from "components/Shared/MyModal";
import { startTimeOptions } from "constants/index";
import toWeekDayString from "helpers/toWeekDayString";
import IActivity from "interfaces/activity/activity.interface";
import IExperience from "interfaces/experiences/experience.interface";
import MainLayout from "layouts/MainLayout";
import * as React from "react";
import { useState } from "react";
import { Calendar, DateObject } from "react-multi-date-picker";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { showAlert } from "redux/actions/alert/alertAction";

interface Props {}

const ExperienceActivationPage: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const [pickerValue, setPickerValue] = useState<any>();
  const [experience, setExperience] = useState<IExperience>();
  const [activities, setActivities] = useState<IActivity[]>();
  const [open, setOpen] = useState(false);
  const [startTimeOpen, setStartTimeOpen] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState<any>();
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    fetchExperience(id);
    fetchActivitesByExperienceId(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchExperience = async (id: string) => {
    const {
      data: { experience },
    } = await getExperienceById(id);
    if (experience) {
      setExperience(experience);
    }
  };

  const fetchActivitesByExperienceId = async (experienceId: string) => {
    const { data: activities } = await getActivities({
      experienceId: experienceId,
    });
    setActivities(activities);
  };

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

    const { data } = await createActivity({
      experienceId: experience?._id,
      date: newDate,
    });

    if (data) {
      dispatch(showAlert("success", "Thêm thành công"));
      setStartTime(0);
      setEndTime(0);
      setPickerValue(null);
      setOpen(false);
      fetchExperience(id);
    }
  };

  const handleCancelActivity = async (activity: IActivity) => {
    if (activity.listOfGuestId.length === 0) {
      await deleteActivityById(activity._id!);
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
          await deleteReceiptById(receipt[0]._id!);
          await createRefund(session.payment_intent);
          await deleteActivityById(activity._id!);
        }
      }
    }
  };

  const handleCompleteActivity = async (activityId: string) => {
    await createTransfer(activityId); // Tra tien cho host
    await deleteActivityById(activityId); // Xoa hoat dong
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
      <div className="container mx-auto px-48 my-10">
        <div className="flex justify-between container">
          <Typography className="text-3xl text-main-blue font-bold">
            Lịch hoạt động
          </Typography>
          <Button
            variant="outlined"
            className="focus:outline-none text-secondary-blue border-secondary-blue hover:bg-secondary-blue hover:text-white"
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
                    <div
                      key={idx}
                      className="border border-gray-300 rounded-xl p-4 shadow-lg mt-4"
                    >
                      <div>
                        <p className="text-lg">
                          Mã hoạt động: <span>{item._id}</span>
                        </p>
                      </div>
                      <div>
                        <p className="text-lg ">
                          Thời điểm diễn ra:{" "}
                          <span>
                            {toWeekDayString(item.date.dateObject.weekDay)},{" "}
                            {item.date.dateObject.day}/
                            {item.date.dateObject.month}/
                            {item.date.dateObject.year}
                          </span>
                        </p>
                      </div>
                      <div>
                        <p className="text-lg ">
                          Số lượng khách tham gia :{" "}
                          <span>
                            {item.listOfGuestId.length}/{experience.groupSize}
                          </span>
                        </p>
                      </div>
                      <div className="flex justify-between mt-4">
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
                                : "bg-secondary-blue"
                            }`}
                            onClick={() =>
                              handleCompleteActivity(item._id as string)
                            }
                          >
                            Hoàn thành
                          </Button>
                        </div>
                      </div>
                    </div>
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
          <CircularProgress />
        )}
      </div>
    </MainLayout>
  );
};

export default ExperienceActivationPage;

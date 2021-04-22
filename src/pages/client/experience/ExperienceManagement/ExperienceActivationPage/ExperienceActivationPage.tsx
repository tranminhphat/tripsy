import {
  Avatar,
  Button,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import { AvatarGroup } from "@material-ui/lab";
import MyBreadcrumbs from "components/Shared/MyBreadcrumbs";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import MyModal from "components/Shared/MyModal";
import { startTimeOptions } from "constants/index";
import AlertContext from "contexts/AlertContext";
import toWeekDayString from "helpers/toWeekDayString";
import { useCreateActivity } from "hooks/mutations/activities";
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
  const createActivity = useCreateActivity();
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

  const compareFunction = (a: IActivity, b: IActivity) => {
    return a.date.dateObject.unix - b.date.dateObject.unix;
  };

  return (
    <MainLayout withSearchBar={false}>
      <div className="container mx-auto my-4">
        <MyBreadcrumbs
          linkArray={[
            {
              path: "/user/experience-hosting",
              name: "Trải nghiệm của tôi",
            },
            {
              path: `/user/experience-hosting/${id}/activation`,
              name: "Hoạt động",
            },
          ]}
        />
        <div className="flex items-center container">
          <Typography className="text-3xl text-secondary font-bold">
            Lịch hoạt động
          </Typography>
          <IconButton
            className="focus:outline-none ml-2"
            onClick={() => setOpen(true)}
          >
            <AddCircleOutlineIcon
              style={{ width: 32, height: 32 }}
              className="text-secondary"
            />
          </IconButton>
        </div>
        {experience && activities ? (
          <div>
            <div className="mt-4">
              {activities.length !== 0 ? (
                activities.sort(compareFunction).map((item, idx) => (
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
                          {startTimeOptions[item.date.startTimeIdx - 1].text} -{" "}
                          {startTimeOptions[item.date.endTimeIdx - 1].text}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="w-full text-center">
                  <Typography>Chưa có hoạt động nào được tổ chức</Typography>
                </div>
              )}
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

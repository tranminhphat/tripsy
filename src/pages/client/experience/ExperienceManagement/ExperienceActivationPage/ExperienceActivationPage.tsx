import {
  Button,
  CircularProgress,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { getExperienceById, updateExperienceById } from "api/experiences";
import MyModal from "components/Shared/MyModal";
import { startTimeOptions } from "constants/index";
import toWeekDayString from "helpers/toWeekDayString";
import { IExperienceResponse } from "interfaces/experiences/experience.interface";
import MainLayout from "layouts/MainLayout";
import * as React from "react";
import { useState } from "react";
import { Calendar, DateObject } from "react-multi-date-picker";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { showAlert } from "redux/actions/alert/alertAction";

interface Props {}
interface Date {
  startTimeIdx: number;
  endTimeIdx: number;
  dateObject: {
    dayOfYear: number;
    weekDay: number;
    day: number;
    month: number;
    year: number;
    unix: number;
  };
}

const ExperienceActivationPage: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const [pickerValue, setPickerValue] = useState<any>();
  const [experience, setExperience] = useState<IExperienceResponse>();
  const [open, setOpen] = useState(false);
  const [startTimeOpen, setStartTimeOpen] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState<any>();
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    fetchAvailableDates(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAvailableDates = async (id: string) => {
    const {
      data: { experience },
    } = await getExperienceById(id);
    if (experience) {
      setExperience(experience);
    }
  };

  const filterDates = (filterString: string, dateArray: Date[]) => {
    const date = new DateObject();
    if (filterString === "future") {
      return dateArray.filter(
        (item) => item.dateObject.unix - date.unix > 1209600
      );
    }

    if (filterString === "upcomming") {
      return dateArray.filter(
        (item) => item.dateObject.unix - date.unix <= 1209600
      );
    }
  };

  const handleAddDate = async () => {
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

    const { data } = await updateExperienceById(id, {
      availableDates: [...experience?.availableDates, newDate],
    });

    if (data) {
      dispatch(showAlert("success", "Thêm thành công"));
      setStartTime(0);
      setEndTime(0);
      setPickerValue(null);
      setOpen(false);
      fetchAvailableDates(id);
    }
  };

  return (
    <MainLayout withSearchBar={false}>
      <div className="container mx-auto px-28">
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
            <div>
              <p>Up comming</p>
              {filterDates("upcomming", experience.availableDates)!.map(
                (item) => (
                  <div
                    className="mt-4"
                    key={`${item.dateObject.day}/${item.dateObject.month}/${item.dateObject.year}`}
                  >
                    <div className="border border-gray-300 rounded-xl p-4 shadow-lg">
                      {toWeekDayString(item.dateObject.weekDay)},{" "}
                      {item.dateObject.day}/{item.dateObject.month}/
                      {item.dateObject.year}
                    </div>
                  </div>
                )
              )}
              <p>Future</p>
              {filterDates("future", experience.availableDates)!.map((item) => (
                <div
                  className="mt-4"
                  key={`${item.dateObject.day}/${item.dateObject.month}/${item.dateObject.year}`}
                >
                  <div className="border border-gray-300 rounded-xl p-4 shadow-lg">
                    {toWeekDayString(item.dateObject.weekDay)},{" "}
                    {item.dateObject.day}/{item.dateObject.month}/
                    {item.dateObject.year}
                  </div>
                </div>
              ))}
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
                      onClick={handleAddDate}
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
            {/* <Calendar
                      mapDays={({ date, selectedDate }) => {
                        const today = new DateObject();
                        if (date.unix < today.unix + bookingDate * 86400) {
                          return {
                            disabled: true,
                            style: {
                              disabled: true,
                              style: { color: "#ccc" },
                            },
                          };
                        }
                        const upComming = upCommingDates.map(
                          (item) => item.dayOfYear
                        );
                        const future = futureDates.map(
                          (item) => item.dayOfYear
                        );
                        if (upComming.includes(date.dayOfYear)) {
                          return {
                            disabled: true,
                            style: {
                              color: "green",
                              fontWeight: "bold",
                            },
                          };
                        }
                        if (future.includes(date.dayOfYear)) {
                          return {
                            disabled: true,
                            style: {
                              color: "orange",
                              fontWeight: "bold",
                            },
                          };
                        }
                      }}
                      multiple
                      format="DD/MM/YYYY"
                      value={value}
                      onChange={setValue}
                    /> */}
          </div>
        ) : (
          <CircularProgress />
        )}
      </div>
    </MainLayout>
  );
};

export default ExperienceActivationPage;

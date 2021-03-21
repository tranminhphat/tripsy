import { CircularProgress, Typography } from "@material-ui/core";
import { getExperienceById, updateExperienceById } from "api/experiences";
import MainLayout from "layouts/MainLayout";
import * as React from "react";
import { useState } from "react";
import { Calendar, DateObject } from "react-multi-date-picker";
import { useParams } from "react-router-dom";

interface Props {}
interface Date {
  dayOfYear: number;
  day: number;
  month: number;
  year: number;
  unix: number;
}

const ExperienceActivationPage: React.FC<Props> = () => {
  const [value, setValue] = useState<any>();
  const [upCommingDates, setUpCommingDates] = useState<Date[]>();
  const [futureDates, setFutureDates] = useState<Date[]>();
  const [sortLabel, setSortLabel] = useState("before");
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    fetchAvailableDates(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAvailableDates = async (id: string) => {
    const {
      data: {
        experience: { availableDates },
      },
    } = await getExperienceById(id);
    if (availableDates) {
      setUpCommingDates(filterDates("upcomming", availableDates)!);
      setFutureDates(filterDates("future", availableDates)!);
    }
  };

  const handleSubmit = async () => {
    let updatedValues: Date[] = [];
    if (value) {
      if (!(value instanceof Array)) {
        updatedValues.push({
          dayOfYear: value.dayOfYear,
          day: value.day,
          month: value.month.number,
          year: value.year,
          unix: value.unix,
        });
      } else {
        for (let i = 0; i < value.length; i++) {
          updatedValues.push({
            dayOfYear: value[i].dayOfYear,
            day: value[i].day,
            month: value[i].month.number,
            year: value[i].year,
            unix: value[i].unix,
          });
        }
      }
    }
    if (upCommingDates && futureDates) {
      const { data } = await updateExperienceById(id, {
        availableDates: [...upCommingDates, ...futureDates, ...updatedValues],
      });
    } else {
      const { data } = await updateExperienceById(id, {
        availableDates: [...updatedValues],
      });
    }

    setValue([]);
    window.location.reload();
  };

  const filterDates = (filterString: string, dateArray: Date[]) => {
    const date = new DateObject();
    if (filterString === "future") {
      return dateArray.filter((item) => item.unix - date.unix > 1209600);
    }

    if (filterString === "upcomming") {
      return dateArray.filter((item) => item.unix - date.unix <= 1209600);
    }
  };

  return (
    <MainLayout withSearchBar={false}>
      <div className="container mx-auto px-28">
        <div className="flex justify-between container">
          <Typography className="text-3xl text-main-blue font-bold">
            Lịch hoạt động
          </Typography>
        </div>
        {upCommingDates && futureDates ? (
          <div className="flex justify-between container">
            <div>
              <p>Up comming</p>
              {upCommingDates.map((item) => (
                <div key={`${item.day}/${item.month}/${item.year}`}>
                  {item.day}/{item.month}/{item.year}
                </div>
              ))}
              <p>Future</p>
              {futureDates.map((item, idx) => (
                <div key={`${item.day}/${item.month}/${item.year}`}>
                  {item.day}/{item.month}/{item.year}
                  <span>
                    <button
                      onClick={() =>
                        setFutureDates(
                          futureDates.filter((item, index) => index !== idx)
                        )
                      }
                    >
                      x
                    </button>
                  </span>
                </div>
              ))}
            </div>
            <Calendar
              mapDays={({ date, selectedDate }) => {
                const today = new DateObject();
                if (date.dayOfYear < today.dayOfYear) {
                  return {
                    disabled: true,
                    style: {
                      disabled: true,
                      style: { color: "#ccc" },
                    },
                  };
                }
                const upComming = upCommingDates.map((item) => item.dayOfYear);
                const future = futureDates.map((item) => item.dayOfYear);
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
            />
          </div>
        ) : (
          <CircularProgress />
        )}
        <button onClick={() => handleSubmit()}>Submit</button>
      </div>
    </MainLayout>
  );
};

export default ExperienceActivationPage;

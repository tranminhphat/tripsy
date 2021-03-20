import * as React from "react";
import { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";

interface Props {}

const ExperienceActivationPage: React.FC<Props> = () => {
  const [value, setValue] = useState<DateObject | DateObject[]>();
  const [value2, setValue2] = useState<DateObject | DateObject[]>();

  const isDateValid = (
    pickedDates: DateObject | DateObject[],
    date: DateObject
  ) => {
    if (pickedDates instanceof DateObject) {
      let isValid = pickedDates.dayOfYear === date.dayOfYear;
      if (!isValid)
        return {
          disabled: true,
          style: { color: "#ccc" },
          onClick: () => alert("weekends are disabled"),
        };
    } else {
      const daysOfYear = pickedDates.map((item) => item.dayOfYear);
      let isValid = daysOfYear?.includes(date.dayOfYear);
      if (!isValid)
        return {
          disabled: true,
          style: { color: "#ccc" },
          onClick: () => alert("weekends are disabled"),
        };
    }
  };

  return (
    <>
      <DatePicker
        multiple
        animation
        type="icon"
        format="DD/MM/YYYY"
        value={value}
        onChange={setValue}
      />
      <DatePicker
        mapDays={({ date }) => {
          if (value) {
            return isDateValid(value, date);
          }
        }}
        multiple
        animation
        type="icon"
        format="DD/MM/YYYY"
        value={value2}
        onChange={setValue2}
      />
    </>
  );
};

export default ExperienceActivationPage;

import * as React from "react";
import { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";

interface Props {
  dayOfYear: any;
  setDayOfYear: any;
}

const FilterDate: React.FC<Props> = ({ setDayOfYear, dayOfYear }) => {
  const [value, setValue] = useState(undefined);

  const handleChange = (e: any) => {
    setValue(e);
    setDayOfYear(e.dayOfYear);
  };

  return (
    <>
      <DatePicker
        value={value}
        onChange={handleChange}
        mapDays={({ date }) => {
          const today = new DateObject();
          if (date.unix < today.unix) {
            return {
              disabled: true,
              style: {
                disabled: true,
                style: { color: "#ccc" },
              },
            };
          }
        }}
        type="custom"
        format="DD/MM/YYYY"
        render={(stringDate, openCalendar) => {
          return (
            <button
              onClick={openCalendar}
              className="border border-gray-300 outline-none p-2 rounded-md hover:border-black hover:font-bold cursor-pointer"
            >
              Ngày bắt đầu{dayOfYear ? `: ${stringDate}` : null}
            </button>
          );
        }}
      />
    </>
  );
};

export default FilterDate;

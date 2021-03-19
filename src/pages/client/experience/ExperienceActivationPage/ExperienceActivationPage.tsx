import * as React from "react";
import { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";

interface Props {}

const ExperienceActivationPage: React.FC<Props> = () => {
  const [value, setValue] = useState<DateObject | DateObject[]>();

  return <DatePicker multiple value={value} onChange={setValue} />;
};

export default ExperienceActivationPage;

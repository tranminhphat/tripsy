import { MenuItem, Select, Typography } from "@material-ui/core";
import SortIcon from "@material-ui/icons/Sort";
import * as React from "react";
import { useState } from "react";

interface Props {
  setStatus: any;
}

const FilterExperienceList: React.FC<Props> = ({ setStatus }) => {
  const [value, setValue] = useState(1);

  const handleOnChange = (e) => {
    setValue(e.target.value);
    switch (e.target.value) {
      case 1:
        setStatus("paid");
        break;
      case 2:
        setStatus("finish");
        break;
    }
  };

  return (
    <div className="flex items-center">
      <div className="flex items-center">
        <SortIcon width={24} height={24} />
        <Typography className="text-lg ml-2 mr-4">Sắp xếp theo:</Typography>
      </div>
      <div>
        <Select
          value={value}
          onChange={handleOnChange}
          defaultValue={1}
          className="w-full"
        >
          <MenuItem value={1}>Chưa diễn ra</MenuItem>
          <MenuItem value={2}>Đã diễn ra</MenuItem>
        </Select>
      </div>
    </div>
  );
};

export default FilterExperienceList;

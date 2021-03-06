import { IconButton, Typography } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import FilterIcon from "assets/images/icons/filter.svg";
import * as React from "react";
import FilterDate from "./FilterDate";
import FilterGroupSize from "./FilterGroupSize";
import FilterLanguage from "./FilterLanguage";
import FilterLocation from "./FilterLocation";
import FilterPrice from "./FilterPrice";
import FilterTheme from "./FilterTheme";

interface Props {
  filterObject: any;
  dayOfYear: any;
  setFilterObject: any;
  setDayOfYear: any;
}

const FilterMetadata: React.FC<Props> = ({
  setFilterObject,
  filterObject,
  dayOfYear,
  setDayOfYear,
}) => {
  const { theme, groupSize, language, price, location } = filterObject;

  return (
    <div className="flex items-center">
      <div className="flex items-center">
        <img width={24} height={24} src={FilterIcon} alt="filter" />
        <Typography className="text-lg ml-2 mr-4">Bộ lọc:</Typography>
      </div>
      <div>
        <FilterTheme initialValue={theme} setFilterObject={setFilterObject} />
      </div>
      <div className="ml-2">
        <FilterGroupSize
          initialValue={groupSize}
          setFilterObject={setFilterObject}
        />
      </div>
      <div className="ml-2">
        <FilterLanguage
          initialValue={language}
          setFilterObject={setFilterObject}
        />
      </div>
      <div className="ml-2">
        <FilterPrice
          initialValue={Object.keys(filterObject).length === 0 ? null : price}
          setFilterObject={setFilterObject}
        />
      </div>
      <div className="ml-2">
        <FilterDate setDayOfYear={setDayOfYear} dayOfYear={dayOfYear} />
      </div>
      <div className="ml-2">
        <FilterLocation
          initialValue={location}
          setFilterObject={setFilterObject}
        />
      </div>

      <div className="ml-2">
        <IconButton
          className="outline-none"
          onClick={() => {
            setFilterObject({});
            setDayOfYear();
          }}
        >
          <ClearIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default FilterMetadata;

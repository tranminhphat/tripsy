import { IconButton, Typography } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import FilterIcon from "assets/images/icons/filter.svg";
import * as React from "react";
import FilterGroupSize from "./FilterGroupSize";
import FilterLanguage from "./FilterLanguage";
import FilterPrice from "./FilterPrice";
import FilterTheme from "./FilterTheme";

interface Props {
  filterObject: any;
  setFilterObject: any;
}

const FilterMetadata: React.FC<Props> = ({ setFilterObject, filterObject }) => {
  const { theme, groupSize, language, price } = filterObject;

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
        <IconButton
          className="outline-none"
          onClick={() => setFilterObject({})}
        >
          <ClearIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default FilterMetadata;

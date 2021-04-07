import * as React from "react";
import FilterTheme from "./FilterTheme";

interface Props {
  filterObject: any;
  setFilterObject: any;
}

const FilterMetadata: React.FC<Props> = ({ setFilterObject, filterObject }) => {
  const { theme } = filterObject;

  return (
    <div className="flex">
      <div>
        <FilterTheme initialTheme={theme} setFilterObject={setFilterObject} />
      </div>
    </div>
  );
};

export default FilterMetadata;

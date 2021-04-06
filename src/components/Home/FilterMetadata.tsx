import * as React from "react";
import FilterTheme from "./FilterTheme";

interface Props {
  setFilterObject: any;
}

const FilterMetadata: React.FC<Props> = ({ setFilterObject }) => {
  return (
    <div className="flex">
      <div>
        <FilterTheme setFilterObject={setFilterObject} />
      </div>
    </div>
  );
};

export default FilterMetadata;

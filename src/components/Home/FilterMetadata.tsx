import * as React from "react";
import FilterGroupSize from "./FilterGroupSize";
import FilterLanguage from "./FilterLanguage";
import FilterTheme from "./FilterTheme";

interface Props {
  filterObject: any;
  setFilterObject: any;
}

const FilterMetadata: React.FC<Props> = ({ setFilterObject, filterObject }) => {
  const { theme, groupSize, language } = filterObject;

  return (
    <div className="flex">
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
    </div>
  );
};

export default FilterMetadata;

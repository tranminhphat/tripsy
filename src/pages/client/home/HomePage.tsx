import { CircularProgress } from "@material-ui/core";
import { getExperiences, getExperiencesByDate } from "api/experiences";
import { Header } from "components/Header/Header";
import FilterMetadata from "components/Home/FilterMetadata";
import SortMetadata from "components/Home/SortMetadata";
import MyAlert from "components/Shared/MyAlert";
import MyExperienceCard from "components/Shared/MyExperienceCard";
import IExperience from "interfaces/experiences/experience.interface";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const intersection = (a, b) => {
  if (a) {
    const experienceIdByDate = a.map((item) => {
      const { experience } = item;
      return experience._id;
    });

    return b.filter((item) => experienceIdByDate.includes(item._id));
  }

  return b;
};

const HomePage: React.FC = () => {
  const [experiences, setExperiences] = useState<IExperience[]>();
  const [filterObject, setFilterObject] = useState({});
  const [sortString, setSortString] = useState("");
  const [dayOfYear, setDayOfYear] = useState<number>();

  useEffect(() => {
    fetchExperiences(filterObject, sortString, dayOfYear);
  }, [filterObject, sortString, dayOfYear]);

  const fetchExperiences = async (filterObject, sortString, dayOfYear) => {
    if (!dayOfYear) {
      const { data } = await getExperiences(filterObject, sortString);
      if (data) {
        setExperiences(data);
      }
    } else {
      const { data: experiencesByField } = await getExperiences(
        filterObject,
        sortString
      );
      const { data: experiencesByDate } = await getExperiencesByDate(dayOfYear);
      const intersectObject = intersection(
        experiencesByDate,
        experiencesByField
      );
      setExperiences(intersectObject);
    }
  };

  return (
    <div className="h-full w-full">
      <Header withSearchBar={true} setFilterObject={setFilterObject} />
      <div className="container mx-auto" style={{ paddingTop: "96px" }}>
        <div>
          <div className="my-4">
            <SortMetadata setSortString={setSortString} />
          </div>
          <div className="my-6">
            <FilterMetadata
              filterObject={filterObject}
              setFilterObject={setFilterObject}
              setDayOfYear={setDayOfYear}
              dayOfYear={dayOfYear}
            />
          </div>
          {experiences ? (
            <div>
              {experiences.map((item) => (
                <div className="mt-4 max-w-lg" key={item._id}>
                  <Link to={`/experience/${item._id}`}>
                    <MyExperienceCard experience={item} />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <CircularProgress />
          )}
        </div>
        <MyAlert />
      </div>
    </div>
  );
};

export default HomePage;

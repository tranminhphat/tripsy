import { Header } from "components/Header/Header";
import FilterMetadata from "components/Home/FilterMetadata";
import SortMetadata from "components/Home/SortMetadata";
import MyAlert from "components/Shared/MyAlert";
import MyExperienceCard from "components/Shared/MyExperienceCard";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import useExperiences from "hooks/queries/experiences/useExperiences";
import useExperiencesByDate from "hooks/queries/experiences/useExperiencesByDate";
import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const intersectionExperiences = (a, b) => {
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
  // const [experiences, setExperiences] = useState<IExperience[]>();
  const [filterObject, setFilterObject] = useState({});
  const [sortString, setSortString] = useState("");
  const [dayOfYear, setDayOfYear] = useState<number>();

  const { data: experiencesByField } = useExperiences(filterObject, sortString);
  const { data: experiencesByDate } = useExperiencesByDate(dayOfYear);

  const experiences = intersectionExperiences(
    experiencesByDate,
    experiencesByField
  );

  // useEffect(() => {
  //   fetchExperiences(filterObject, sortString, dayOfYear);
  // }, [filterObject, sortString, dayOfYear]);

  // const fetchExperiences = async (filterObject, sortString, dayOfYear) => {
  //   if (!dayOfYear) {
  //     const { data } = await getExperiences(filterObject, sortString);
  //     if (data) {
  //       setExperiences(data);
  //     }
  //   } else {
  //     const { data: experiencesByField } = await getExperiences(
  //       filterObject,
  //       sortString
  //     );
  //     const { data: experiencesByDate } = await getExperiencesByDate(dayOfYear);
  //     const intersectObject = intersection(
  //       experiencesByDate,
  //       experiencesByField
  //     );
  //     setExperiences(intersectObject);
  //   }
  // };

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
            <div className="flex-grow justify-center items-center">
              <MyLoadingIndicator width={300} height={300} />
            </div>
          )}
        </div>
        <MyAlert />
      </div>
    </div>
  );
};

export default HomePage;

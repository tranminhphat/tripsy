import { CircularProgress } from "@material-ui/core";
import { getExperiences, getExperiencesByDate } from "api/experiences";
import FilterMetadata from "components/Home/FilterMetadata";
import MyExperienceCard from "components/Shared/MyExperienceCard";
import IExperience from "interfaces/experiences/experience.interface";
import MainLayout from "layouts/MainLayout";
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
  const [dayOfYear, setDayOfYear] = useState<number>();

  useEffect(() => {
    fetchExperiences(filterObject, dayOfYear);
  }, [filterObject, dayOfYear]);

  const fetchExperiences = async (filterObject, dayOfYear) => {
    if (!dayOfYear) {
      const { data } = await getExperiences(filterObject);
      if (data) {
        setExperiences(data);
      }
    } else {
      const { data: experiencesByField } = await getExperiences(filterObject);
      const { data: experiencesByDate } = await getExperiencesByDate(dayOfYear);
      const intersectObject = intersection(
        experiencesByDate,
        experiencesByField
      );
      setExperiences(intersectObject);
    }
  };

  return (
    <MainLayout>
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
    </MainLayout>
  );
};

export default HomePage;

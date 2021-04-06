import { CircularProgress } from "@material-ui/core";
import { getExperiences } from "api/experiences";
import FilterMetadata from "components/Home/FilterMetadata";
import MyExperienceCard from "components/Shared/MyExperienceCard";
import IExperience from "interfaces/experiences/experience.interface";
import MainLayout from "layouts/MainLayout";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  const [experiences, setExperiences] = useState<IExperience[]>();
  const [filterObject, setFilterObject] = useState({});

  useEffect(() => {
    console.log(filterObject);
    fetchExperience(filterObject);
  }, [filterObject]);

  const fetchExperience = async (filterObject) => {
    const { data } = await getExperiences(filterObject);
    if (data) {
      setExperiences(data);
    }
  };
  return (
    <MainLayout>
      <div className="my-6">
        <FilterMetadata setFilterObject={setFilterObject} />
      </div>
      {experiences ? (
        <div>
          {experiences.map((item) => (
            <div className="mt-4" key={item._id}>
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

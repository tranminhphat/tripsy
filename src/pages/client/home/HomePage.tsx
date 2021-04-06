import { CircularProgress } from "@material-ui/core";
import { getExperiences } from "api/experiences";
import MyExperienceCard from "components/Shared/MyExperienceCard";
import IExperience from "interfaces/experiences/experience.interface";
import MainLayout from "layouts/MainLayout";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  const [experiences, setExperiences] = useState<IExperience[]>();

  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = async () => {
    const { data } = await getExperiences({});
    if (data) {
      setExperiences(data);
    }
  };
  return (
    <MainLayout>
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

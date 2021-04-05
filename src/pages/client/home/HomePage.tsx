import { CircularProgress } from "@material-ui/core";
import { getExperiences } from "api/experiences";
import MyExperienceCard from "components/Shared/MyExperienceCard";
import IExperience from "interfaces/experiences/experience.interface";
import MainLayout from "layouts/MainLayout";
import * as React from "react";
import { useEffect, useState } from "react";

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
      <div className="grid grid-cols-8">
        {experiences ? (
          <div className="col-span-6 grid grid-cols-6 gap-4">
            {experiences.map((item) => (
              <div className="col-span-1" key={item._id}>
                {/* <Link to={`/experience/${item._id}`}> */}
                <MyExperienceCard
                  experienceTitle={item.title!}
                  experienceImage={item.photoGallery![0].url!}
                  experiencePrice={item.pricing?.individualPrice!}
                />
                {/* </Link> */}
              </div>
            ))}
          </div>
        ) : (
          <CircularProgress />
        )}
        <div className="col-span-2"></div>
      </div>
    </MainLayout>
  );
};

export default HomePage;

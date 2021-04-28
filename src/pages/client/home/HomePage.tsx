import { Header } from "components/Header/Header";
import FilterMetadata from "components/Home/FilterMetadata";
import SortMetadata from "components/Home/SortMetadata";
import MyAlert from "components/Shared/MyAlert";
import MyExperienceCard from "components/Shared/MyExperienceCard";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import {
  useExperiences,
  useExperiencesByDate,
} from "hooks/queries/experiences";
import { useProfile } from "hooks/queries/profiles";
import { useCurrentUser } from "hooks/queries/users";
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
  const [filterObject, setFilterObject] = useState({});
  const [sortString, setSortString] = useState("");
  const [dayOfYear, setDayOfYear] = useState<number>();

  const { data: experiencesByField } = useExperiences(filterObject, sortString);
  const { data: experiencesByDate } = useExperiencesByDate(dayOfYear);

  const experiences = intersectionExperiences(
    experiencesByDate,
    experiencesByField
  );

  const { data: user } = useCurrentUser();
  const { data: userProfile } = useProfile(user?.profileId);

  return (
    <div className="h-full w-full">
      <Header withSearchBar={true} setFilterObject={setFilterObject} />
      <div
        className="container mx-auto mb-16 h-full flex items-center grid grid-cols-4 lg:grid-cols-12"
        style={{ marginTop: "108px" }}
      >
        <div className="col-span-12">
          <div className="mt-4 flex justify-between">
            <div>
              <FilterMetadata
                filterObject={filterObject}
                setFilterObject={setFilterObject}
                setDayOfYear={setDayOfYear}
                dayOfYear={dayOfYear}
              />
            </div>
            <div>
              <SortMetadata setSortString={setSortString} />
            </div>
          </div>
          {experiences && userProfile ? (
            <div className="grid grid-cols-12">
              {experiences.map((item) => (
                <div className="col-span-12" key={item._id}>
                  <Link to={`/experience/${item._id}`}>
                    <MyExperienceCard
                      isSaved={
                        userProfile.savedExperiences?.includes(item._id)!
                      }
                      experience={item}
                    />
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

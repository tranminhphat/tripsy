import { CircularProgress } from "@material-ui/core";
import { getExperienceById } from "api/experiences";
import { IExperienceResponse } from "interfaces/experiences/experience.interface";
import * as React from "react";
import { useEffect, useState } from "react";
import { Calendar } from "react-multi-date-picker";
import { useParams } from "react-router-dom";

interface Props {}

const ExperiencePage: React.FC<Props> = () => {
  const { id } = useParams<{ id: string }>();
  const [experience, setExperience] = useState<IExperienceResponse>();

  useEffect(() => {
    fetchExperience(id);
  }, [id]);

  const fetchExperience = async (id: string) => {
    const {
      data: { experience },
    } = await getExperienceById(id);
    if (experience) {
      setExperience(experience);
    }
  };
  return (
    <div>
      {experience ? (
        <Calendar
          mapDays={({ date }) => {
            const daysOfYear = experience.availableDates.map(
              (item) => item.dayOfYear
            );
            if (!daysOfYear.includes(date.dayOfYear)) {
              return {
                disabled: true,
                style: {
                  color: "#ccc",
                },
              };
            }
          }}
          multiple
          format="DD/MM/YYYY"
        />
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default ExperiencePage;

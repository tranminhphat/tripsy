import IExperience from "interfaces/experiences/experience.interface";
import * as React from "react";
import { createContext, useState } from "react";

const ExperienceCreationContext = createContext<any>(null);

const ExperienceCreationProvider: React.FC<{}> = ({ children }) => {
  const [creationObject, setCreationObject] = useState<IExperience>({});
  return (
    <ExperienceCreationContext.Provider
      value={{
        creationObject,
        updateCreationObject: (updatedProperties) => {
          setCreationObject((prevVal) => ({
            ...prevVal,
            ...updatedProperties,
          }));
        },
        resetCreationObject: () => {
          setCreationObject({});
        },
      }}
    >
      {children}
    </ExperienceCreationContext.Provider>
  );
};

export { ExperienceCreationProvider };
export default ExperienceCreationContext;

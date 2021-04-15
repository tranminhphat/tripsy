import { Button, Typography } from "@material-ui/core";
import MyStepper from "components/Shared/MyStepper";
import IExperience from "interfaces/experiences/experience.interface";
import * as React from "react";
import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { ExperienceCreationContext } from "../ExperienceCreationPage";
import BookingDate from "./BookingDate";
import Duration from "./Duration";
import GroupSize from "./GroupSize";
import Price from "./Price";

interface Props {
  handleDone: (index: number) => void;
}

const getSteps = (currentProgress: number, currentStep: number) => [
  {
    label: "Số lượng khách",
    isCompleted:
      currentProgress === -1 || currentProgress > 3 || currentStep > 1,
  },
  {
    label: "Thời lượng",
    isCompleted:
      currentProgress === -1 || currentProgress > 3 || currentStep > 2,
  },
  {
    label: "Chi phí",
    isCompleted:
      currentProgress === -1 || currentProgress > 3 || currentStep > 3,
  },
  {
    label: "Thời hạn đặt chổ",
    isCompleted:
      currentProgress === -1 || currentProgress > 3 || currentStep > 4,
  },
];

const getStepContent = (step: number) => {
  switch (step) {
    case 1:
      return "Số lượng khách";
    case 2:
      return "Thời lượng";
    case 3:
      return "Chi phí";
    case 4:
      return "Thời hạn đặt chổ";
    default:
      return "Unknown step";
  }
};

const Setting: React.FC<Props> = ({ handleDone }) => {
  const { updateCreationObject } = useContext(ExperienceCreationContext);

  /* Get the current step that user been doing from route */
  const location = useLocation<{
    currentProgress: number;
    currentStep: number;
  }>();
  const { currentProgress, currentStep } = location.state;

  /* Store the array of steps in state */
  const [steps, setSteps] = useState(getSteps(currentProgress, currentStep));

  /* Store the active step in state */
  const [activeStep, setActiveStep] = useState(currentStep);

  /* Store the updatedValue in state */
  const [stepValue, setStepValue] = useState<IExperience>({});

  /* Check if user have done the current step for the "Next" button */
  const [isValid, setIsValid] = useState<boolean>(false);

  /* Handle click on the "Next" button */
  const handleNext = () => {
    /* Update the experience state in context */
    updateCreationObject(stepValue);
    /* Update the active step */
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    /* Update the steps (isCompleted property) */
    const newSteps = steps.map((step, index) => {
      if (index === activeStep - 1) {
        return { ...step, isCompleted: true };
      } else {
        return { ...step };
      }
    });
    setSteps(newSteps);

    /* Check if we've done the progress yet */
    if (activeStep === steps.length) {
      handleDone(3);
    }

    /* Disabled the "Next" button in the next step */
    setIsValid(false);
  };

  /* Handle click on the "Back" button */
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const stepProps = {
    setStepValue,
    setIsValid,
  };

  const renderSwitch = (stepId: number) => {
    switch (stepId) {
      case 1:
        return <GroupSize stepProps={stepProps} />;
      case 2:
        return <Duration stepProps={stepProps} />;
      case 3:
        return <Price stepProps={stepProps} />;
      case 4:
        return <BookingDate stepProps={stepProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="mx-4">
        <MyStepper
          activeStep={activeStep}
          steps={steps}
          getStepContent={getStepContent}
        />
      </div>
      <div className="flex-grow mx-4">{renderSwitch(activeStep)}</div>
      <div>
        <div className="flex justify-between items-center p-4 bg-gray-300">
          <div>
            <Button
              disabled={activeStep === 1}
              onClick={handleBack}
              className="text-black"
            >
              Quay lại
            </Button>
          </div>
          <div>
            <Typography>
              {activeStep}/{steps.length}
            </Typography>
          </div>
          <div>
            <Button
              disabled={!isValid}
              variant="contained"
              className="bg-black text-white"
              onClick={handleNext}
            >
              {activeStep === steps.length ? "Hoàn tất" : "Tiếp theo"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;

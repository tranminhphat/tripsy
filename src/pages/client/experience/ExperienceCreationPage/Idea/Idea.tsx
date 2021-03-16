import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import MyStepper from "components/Shared/MyStepper";
import { IExperienceResponse } from "interfaces/experiences/experience.interface";
import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { updateExperience } from "redux/actions/experience/experienceAction";
import Language from "./Language";
import Location from "./Location";
import Theme from "./Theme";

interface Props {
  handleDone: (index: number) => void;
}

/**
 *  Return all the steps in IDEA progress
 *  @param currentStep - to help initialize the isCompleted property for each step.
 */
const getSteps = (currentProgress: number, currentStep: number) => [
  {
    label: "Chủ đề của hoạt động",
    isCompleted:
      currentProgress === -1 || currentProgress > 1 || currentStep > 1,
  },
  {
    label: "Địa điểm tổ chức",
    isCompleted:
      currentProgress === -1 || currentProgress > 1 || currentStep > 2,
  },
  {
    label: "Ngôn ngữ sử dụng",
    isCompleted:
      currentProgress === -1 || currentProgress > 1 || currentStep > 3,
  },
];

/**
 * Return the stepper value for each step
 * @param step
 */
function getStepContent(step: number) {
  switch (step) {
    case 1:
      return "Chủ đề";
    case 2:
      return "Địa điểm";
    case 3:
      return "Ngôn ngữ";
    default:
      return "Unknown step";
  }
}

const Idea: React.FC<Props> = ({ handleDone }) => {
  const dispatch = useDispatch();

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
  const [stepValue, setStepValue] = useState<IExperienceResponse>({});

  /* Check if user have done the current step for the "Next" button */
  const [isValid, setIsValid] = useState<boolean>(false);

  /* Handle click on the "Next" button */
  const handleNext = () => {
    /* Update the experience state in redux store */
    dispatch(updateExperience(stepValue));
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

    /* Disabled the "Next" button in the next step */
    setIsValid(false);

    /* Check if we've done the progress yet */
    if (activeStep === steps.length) {
      handleDone(1);
    }
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
        return <Theme stepProps={stepProps} />;
      case 2:
        return <Location stepProps={stepProps} />;
      case 3:
        return <Language stepProps={stepProps} />;
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
        <div className="flex justify-between items-center p-4 bg-gray-100 border-t border-black rounded-md">
          <div>
            <Button
              disabled={activeStep === 1}
              onClick={handleBack}
              className="mr-2"
            >
              Back
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
              color="primary"
              className="mr-2"
              onClick={handleNext}
            >
              {activeStep === steps.length ? "Finish" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Idea;

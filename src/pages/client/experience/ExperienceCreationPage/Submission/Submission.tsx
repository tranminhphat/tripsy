import { Button, Typography } from "@material-ui/core";
import MyStepper from "components/Shared/MyStepper";
import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import IDCardVerification from "./IDCardVerification";
import InfoVerification from "./InfoVerification";
import PhoneVerification from "./PhoneVerification";
interface Props {
  handleDone: (index: number) => void;
}

const getSteps = (currentProgress: number, currentStep: number) => [
  {
    label: "Xác thực hồ sơ",
    isCompleted:
      currentProgress === -1 || currentProgress > 4 || currentStep > 1,
  },
  {
    label: "Xác thực số điện thoại",
    isCompleted:
      currentProgress === -1 || currentProgress > 4 || currentStep > 2,
  },
  {
    label: "Xác thực thẻ căn cước",
    isCompleted:
      currentProgress === -1 || currentProgress > 4 || currentStep > 3,
  },
];

const getStepContent = (step: number) => {
  switch (step) {
    case 1:
      return "Xác thực hồ sơ";
    case 2:
      return "Xác thực số điện thoại";
    case 3:
      return "Xác thực thẻ căn cước";
    default:
      return "Unknown step";
  }
};

const Setting: React.FC<Props> = ({ handleDone }) => {
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
  const [stepValue, setStepValue] = useState<{}>();

  /* Check if user have done the current step for the "Next" button */
  const [isValid, setIsValid] = useState<boolean>(true);

  /* Handle click on the "Next" button */
  const handleNext = () => {
    /* Update the experience state in redux store */
    // dispatch(updateExperience(stepValue));
    /* Update the active step */
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    /* Update the steps (isCompleted property) */
    // const newSteps = steps.map((step, index) => {
    //   if (index === activeStep - 1) {
    //     return { ...step, isCompleted: true };
    //   } else {
    //     return { ...step };
    //   }
    // });
    // setSteps(newSteps);

    /* Check if we've done the progress yet */
    if (activeStep === steps.length) {
      handleDone(4);
    }

    /* Disabled the "Next" button in the next step */
    // setIsValid(false);
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
        return <InfoVerification stepProps={stepProps} />;
      case 2:
        return <PhoneVerification stepProps={stepProps} />;
      case 3:
        return <IDCardVerification stepProps={stepProps} />;
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

export default Setting;

import { Button } from "@material-ui/core";
import MyStepper from "components/Shared/MyStepper";
import * as React from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

interface Props {
  handleDone: (index: number) => void;
  currentProgressIndex: number;
}

function getSteps() {
  return ["Select campaign settings", "Create an ad group", "Create an ad"];
}

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return "Select campaign settings...";
    case 1:
      return "What is an ad group anyways?";
    case 2:
      return "This is the bit I really care about!";
    default:
      return "Unknown step";
  }
}

const Progress1: React.FC<Props> = ({ handleDone, currentProgressIndex }) => {
  const steps = getSteps();
  const [activeStep, setActiveStep] = React.useState(0);

  const renderSwitch = (stepId: number) => {
    switch (stepId) {
      case 0:
        return <Step1 handleDone={handleDone} />;
      case 1:
        return <Step2 handleDone={handleDone} />;
      case 2:
        return <Step3 handleDone={handleDone} />;
      default:
        return null;
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div>
      <div>
        <MyStepper
          activeStep={activeStep}
          steps={steps}
          getStepContent={getStepContent}
        />
      </div>
      {renderSwitch(activeStep)}
      <div>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          className="mr-2"
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          className="mr-2"
        >
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default Progress1;

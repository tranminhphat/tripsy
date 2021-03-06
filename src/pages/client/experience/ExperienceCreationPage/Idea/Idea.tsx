import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import MyStepper from "components/Shared/MyStepper";
import * as React from "react";
import { useParams } from "react-router-dom";
import Theme from "./Theme";
import Location from "./Location";
import Language from "./Language";

interface Props {
  handleDone: (index: number) => void;
  setUpdatedProperties: (values: any) => void;
}

function getSteps() {
  return ["Chủ đề của hoạt động", "Địa điểm tổ chức", "Ngôn ngữ sử dụng"];
}

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return "Chủ đề";
    case 1:
      return "Địa điểm";
    case 2:
      return "Ngôn ngữ";
    default:
      return "Unknown step";
  }
}

const Idea: React.FC<Props> = ({ handleDone, setUpdatedProperties }) => {
  const steps = getSteps();
  const { progressStep } = useParams<{ progressStep: string }>();
  const [activeStep, setActiveStep] = React.useState(Number(progressStep) - 1);
  const [stepValue, setStepValue] = React.useState<{}>();
  const [isValid, setIsValid] = React.useState<boolean>(false);

  const handleNext = () => {
    setUpdatedProperties(stepValue);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === steps.length - 1) {
      handleDone(0);
    }
    setIsValid(false);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const stepProps = {
    steps,
    activeStep,
    setStepValue,
    setIsValid,
  };

  const renderSwitch = (stepId: number) => {
    switch (stepId) {
      case 0:
        return <Theme stepProps={stepProps} />;
      case 1:
        return <Location stepProps={stepProps} />;
      case 2:
        return <Language stepProps={stepProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="mx-4">
        <MyStepper
          activeStep={activeStep}
          steps={steps}
          getStepContent={getStepContent}
        />
      </div>
      <div className="flex-grow mx-4">{renderSwitch(activeStep)}</div>
      <div>
        <div className="flex justify-between items-center p-4 bg-gray-100 rounded-md">
          <div>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className="mr-2"
            >
              Back
            </Button>
          </div>
          <div>
            <Typography>
              {activeStep + 1}/{steps.length}
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
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Idea;

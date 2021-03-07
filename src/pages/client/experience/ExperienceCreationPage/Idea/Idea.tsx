import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import MyStepper from "components/Shared/MyStepper";
import * as React from "react";
import { useLocation } from "react-router-dom";
import Theme from "./Theme";
import Location from "./Location";
import Language from "./Language";

interface Props {
  handleDone: (index: number) => void;
  setUpdatedProperties: (values: any) => void;
}

const getSteps = () => [
  { label: "Chủ đề của hoạt động", isCompleted: false },
  { label: "Địa điểm tổ chức", isCompleted: false },
  { label: "Ngôn ngữ sử dụng", isCompleted: false },
];

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

const Idea: React.FC<Props> = ({ handleDone, setUpdatedProperties }) => {
  const location = useLocation<{ progressStep: string }>();
  const [steps, setSteps] = React.useState(getSteps());
  const { progressStep } = location.state;
  const [activeStep, setActiveStep] = React.useState(Number(progressStep));
  const [stepValue, setStepValue] = React.useState<{}>();
  const [isValid, setIsValid] = React.useState<boolean>(false);

  const handleNext = () => {
    setUpdatedProperties(stepValue);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const newSteps = steps.map((step, index) => {
      if (index === activeStep - 1) {
        return { ...step, isCompleted: true };
      } else {
        return { ...step };
      }
    });
    setSteps(newSteps);
    if (activeStep === steps.length) {
      handleDone(0);
    }
  };

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

import * as React from "react";
import { useLocation } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import MyStepper from "components/Shared/MyStepper";
import GuestRequirement from "./GuestRequirement";
import Description from "./Description";
import DetailLocation from "./DetailLocation";
import HostProvision from "./HostProvision";

function getSteps() {
  return [
    { label: "Mô tả về hoạt động", isCompleted: false },
    { label: "Chi tiết địa điểm", isCompleted: false },
    { label: "Đồ dùng người tổ chức cung cấp", isCompleted: false },
    { label: "Đồ dùng khách cần mang theo", isCompleted: false },
  ];
}

function getStepContent(step: number) {
  switch (step) {
    case 1:
      return "Mô tả";
    case 2:
      return "Chi tiết địa điểm";
    case 3:
      return "Cung cấp";
    case 4:
      return "Tự túc";
    default:
      return "Unknown step";
  }
}

interface Props {
  handleDone: (index: number) => void;
  setUpdatedProperties: (values: any) => void;
}

const Introduction: React.FC<Props> = ({
  handleDone,
  setUpdatedProperties,
}) => {
  const steps = getSteps();
  const location = useLocation<{ progressStep: string }>();
  const { progressStep } = location.state;
  const [activeStep, setActiveStep] = React.useState(Number(progressStep));
  const [stepValue, setStepValue] = React.useState<{}>();
  const [isValid, setIsValid] = React.useState<boolean>(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
        return <Description stepProps={stepProps} />;
      case 2:
        return <DetailLocation stepProps={stepProps} />;
      case 3:
        return <HostProvision />;
      case 4:
        return <GuestRequirement />;
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

export default Introduction;

import { Button, Typography } from "@material-ui/core";
import MyStepper from "components/Shared/MyStepper";
import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { updateExperience } from "redux/actions/experience/experienceAction";
import Address from "./Address";
import Description from "./Description";
import GuestBring from "./GuestBring";
import HostProvision from "./HostProvision";

function getSteps(currentStep: number) {
  return [
    { label: "Mô tả về hoạt động", isCompleted: currentStep > 1 },
    { label: "Chi tiết địa điểm", isCompleted: currentStep > 2 },
    { label: "Đồ dùng người tổ chức cung cấp", isCompleted: currentStep > 3 },
    { label: "Đồ dùng khách cần mang theo", isCompleted: currentStep > 4 },
  ];
}

function getStepContent(step: number) {
  switch (step) {
    case 1:
      return "Mô tả";
    case 2:
      return "Chi tiết địa điểm";
    case 3:
      return "Những gì bạn sẽ cung cấp";
    case 4:
      return "Đồ dùng khách cần mang";
    default:
      return "Unknown step";
  }
}

interface Props {
  handleDone: (index: number) => void;
}

const Introduction: React.FC<Props> = ({ handleDone }) => {
  const dispatch = useDispatch();
  const location = useLocation<{ currentStep: number }>();
  const { currentStep } = location.state;
  const [steps, setSteps] = useState(getSteps(currentStep));
  const [activeStep, setActiveStep] = useState(currentStep);
  const [stepValue, setStepValue] = useState<{}>();
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleNext = () => {
    dispatch(updateExperience(stepValue));
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
      handleDone(1);
    }

    setIsValid(false);
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
        return <Address stepProps={stepProps} />;
      case 3:
        return <HostProvision stepProps={stepProps} />;
      case 4:
        return <GuestBring stepProps={stepProps} />;
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

export default Introduction;

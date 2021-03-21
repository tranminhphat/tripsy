import { Button, Typography } from "@material-ui/core";
import MyStepper from "components/Shared/MyStepper";
import { IExperienceResponse } from "interfaces/experiences/experience.interface";
import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { updateExperience } from "redux/actions/experience/experienceAction";
import Address from "./Address";
import Description from "./Description";
import GuestBring from "./GuestBring";
import HostProvision from "./HostProvision";
import Photos from "./Photos";
import Title from "./Title";

function getSteps(currentProgress: number, currentStep: number) {
  return [
    {
      label: "Mô tả",
      isCompleted:
        currentProgress === -1 || currentProgress > 2 || currentStep > 1,
    },
    {
      label: "Chi tiết địa điểm",
      isCompleted:
        currentProgress === -1 || currentProgress > 2 || currentStep > 2,
    },
    {
      label: "Đồ dùng cung cấp",
      isCompleted:
        currentProgress === -1 || currentProgress > 2 || currentStep > 3,
    },

    {
      label: "Đồ dùng tự túc",
      isCompleted:
        currentProgress === -1 || currentProgress > 2 || currentStep > 4,
    },
    {
      label: "Tiêu đề",
      isCompleted:
        currentProgress === -1 || currentProgress > 2 || currentStep > 5,
    },
    {
      label: "Hình ảnh",
      isCompleted:
        currentProgress === -1 || currentProgress > 2 || currentStep > 6,
    },
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
    case 5:
      return "Tiêu đề";
    case 6:
      return "Hình ảnh";
    default:
      return "Unknown step";
  }
}

interface Props {
  handleDone: (index: number) => void;
}

const Introduction: React.FC<Props> = ({ handleDone }) => {
  const dispatch = useDispatch();
  const location = useLocation<{
    currentProgress: number;
    currentStep: number;
  }>();
  const { currentProgress, currentStep } = location.state;
  const [steps, setSteps] = useState(getSteps(currentProgress, currentStep));
  const [activeStep, setActiveStep] = useState(currentStep);
  const [stepValue, setStepValue] = useState<IExperienceResponse>({});
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
    setIsValid(false);

    if (activeStep === steps.length) {
      handleDone(2);
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
        return <Description stepProps={stepProps} />;
      case 2:
        return <Address stepProps={stepProps} />;
      case 3:
        return <HostProvision stepProps={stepProps} />;
      case 4:
        return <GuestBring stepProps={stepProps} />;
      case 5:
        return <Title stepProps={stepProps} />;
      case 6:
        return <Photos stepProps={stepProps} />;
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

export default Introduction;

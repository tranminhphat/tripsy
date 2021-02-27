import * as React from "react";
import { useParams } from "react-router-dom";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

interface Props {
  handleDone: (index: number) => void;
  currentProgressIndex: number;
}

const Step: React.FC<Props> = ({ handleDone, currentProgressIndex }) => {
  const { stepId } = useParams<{ stepId: string }>();

  const renderSwitch = (stepId: string) => {
    switch (stepId) {
      case "1":
        return <Step1 handleDone={handleDone} />;
      case "2":
        return <Step2 handleDone={handleDone} />;
      case "3":
        return <Step3 handleDone={handleDone} />;
      default:
        return null;
    }
  };

  return <div>{renderSwitch(stepId)}</div>;
};

export default Step;

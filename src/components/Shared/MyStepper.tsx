import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import Typography from "@material-ui/core/Typography";
import React from "react";

interface Props {
  activeStep: number;
  steps: any;
  getStepContent: any;
}

const MyStepper: React.FC<Props> = ({ activeStep, steps, getStepContent }) => {
  return (
    <div className="w-full">
      <Stepper activeStep={activeStep - 1}>
        {steps.map((step: { label: string; isCompleted: boolean }) => {
          return (
            <Step key={step.label} completed={step.isCompleted}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        <div>
          <Typography className="my-2 font-bold">
            {getStepContent(activeStep)}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default MyStepper;

import * as React from "react";

interface Props {
  handleDone: (index: number) => void;
}

const Step1: React.FC<Props> = ({ handleDone }) => {
  return (
    <div>
      <div>This is step 1 page</div>
      <button onClick={() => handleDone(0)}>Done</button>
    </div>
  );
};

export default Step1;

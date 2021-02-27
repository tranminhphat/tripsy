import * as React from "react";

interface Props {
  handleDone: (index: number) => void;
}

const Step3: React.FC<Props> = ({ handleDone }) => {
  return (
    <div>
      <div>This is step 3 page</div>
      <button onClick={() => handleDone(2)}>Done</button>
    </div>
  );
};

export default Step3;

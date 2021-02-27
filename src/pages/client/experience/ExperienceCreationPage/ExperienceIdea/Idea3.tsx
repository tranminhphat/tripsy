import * as React from "react";

interface Props {
  handleDone: (index: number) => void;
}

const Idea3: React.FC<Props> = ({ handleDone }) => {
  return (
    <div>
      <div>This is idea 3 page</div>
      <button onClick={() => handleDone(2)}>Done</button>
    </div>
  );
};

export default Idea3;

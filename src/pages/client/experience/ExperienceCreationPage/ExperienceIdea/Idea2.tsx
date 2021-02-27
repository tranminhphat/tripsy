import * as React from "react";

interface Props {
  handleDone: (index: number) => void;
}

const Idea2: React.FC<Props> = ({ handleDone }) => {
  return (
    <div>
      <div>This is idea 2 page</div>
      <button onClick={() => handleDone(1)}>Done</button>
    </div>
  );
};

export default Idea2;

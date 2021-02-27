import * as React from "react";
import { useParams } from "react-router-dom";
import Idea2 from "./Idea2";
import Idea3 from "./Idea3";

interface Props {
  handleDone: (index: number) => void;
}

const Idea1: React.FC<Props> = ({ handleDone }) => {
  const { idea } = useParams<{ idea: string }>();

  const renderSwitch = (idea: string) => {
    switch (idea) {
      case "idea2":
        return <Idea2 handleDone={handleDone} />;
      case "idea3":
        return <Idea3 handleDone={handleDone} />;
      default:
        return (
          <div>
            <div>This is idea 1 page</div>
            <button onClick={() => handleDone(0)}>Done</button>
          </div>
        );
    }
  };

  return <div>{renderSwitch(idea)}</div>;
};

export default Idea1;

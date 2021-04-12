import loader from "assets/animations/loader.json";
import * as React from "react";
import LottieAnimation from "./Lottie";

interface Props {
  width?: number;
  height?: number;
}

const MyLoadingIndicator: React.FC<Props> = ({ width = 100, height = 100 }) => {
  return (
    <div>
      <LottieAnimation lotti={loader} height={height} width={width} />
    </div>
  );
};

export default MyLoadingIndicator;

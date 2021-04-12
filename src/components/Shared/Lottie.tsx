import React from "react";
import Lottie from "react-lottie";

interface Props {
  lotti: any;
  width: number;
  height: number;
}

const LottieAnimation: React.FC<Props> = ({ lotti, width, height }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lotti,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={height} width={width} />
    </div>
  );
};

export default LottieAnimation;

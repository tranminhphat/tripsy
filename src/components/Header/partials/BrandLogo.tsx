import * as React from "react";
import { Link } from "react-router-dom";

import BrandLogoImage from "assets/images/logos/tripsy_logo_128.png";

interface Props {}

const BrandLogo: React.FC<Props> = () => {
  return (
    <>
      <Link to="/">
        <div
          style={{
            backgroundImage: `url(${BrandLogoImage})`,
            width: 128,
            height: 128,
          }}
          className="bg-contain bg-no-repeat bg-center"
        />
      </Link>
    </>
  );
};

export default BrandLogo;

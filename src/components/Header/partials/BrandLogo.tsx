import * as React from "react";
import { Link } from "react-router-dom";

import BrandLogoImage from "assets/images/logos/logo_128.png";

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
          className="opacity-60 hover:opacity-100 hover:transform hover:scale-105 transition ease-in-out duration-500 bg-contain bg-no-repeat bg-center"
        />
      </Link>
    </>
  );
};

export default BrandLogo;

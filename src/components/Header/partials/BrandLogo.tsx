import BrandLogoImage from "assets/images/logos/logo_icon_128.png";
import * as React from "react";
import { Link } from "react-router-dom";

interface Props {}

const BrandLogo: React.FC<Props> = () => {
  return (
    <>
      <Link to="/">
        <div
          style={{
            backgroundImage: `url(${BrandLogoImage})`,
            width: 128,
            height: 40,
          }}
          className="bg-contain bg-no-repeat bg-center"
        />
      </Link>
    </>
  );
};

export default BrandLogo;

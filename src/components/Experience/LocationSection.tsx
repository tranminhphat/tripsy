import MyMapbox from "components/Shared/MyMapbox";
import * as React from "react";

interface Props {
  coordinates: [number, number];
}

const LocationSection: React.FC<Props> = ({ coordinates }) => {
  return (
    <>
      {" "}
      <div>
        <h1 className="text-2xl font-bold">Địa điểm tổ chức</h1>
      </div>
      <div className="mt-4 flex justify-center">
        <MyMapbox width="100%" height="400px" coordinates={coordinates} />
      </div>
    </>
  );
};

export default LocationSection;

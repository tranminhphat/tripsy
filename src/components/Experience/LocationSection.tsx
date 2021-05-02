import { Typography } from "@material-ui/core";
import MyMapbox from "components/Shared/MyMapbox";
import * as React from "react";

interface Props {
  coordinates: [number, number];
  detail: string;
}

const LocationSection: React.FC<Props> = ({ coordinates, detail }) => {
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold">Địa điểm tổ chức</h1>
      </div>
      <div className="mt-4 flex justify-center">
        <MyMapbox width="100%" height="500px" coordinates={coordinates} />
      </div>
      <div className="mt-4">
        <Typography>{detail}</Typography>
      </div>
    </>
  );
};

export default LocationSection;

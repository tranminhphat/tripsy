import "mapbox-gl/dist/mapbox-gl.css";
import * as React from "react";
import ReactMapboxGl, { Feature, Layer } from "react-mapbox-gl";

interface Props {
  width: string;
  height: string;
  coordinates: [number, number];
  onDragEnd: (lng: number, lat: number) => void;
}

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoidHJhbm1pbmhwaGF0IiwiYSI6ImNrbHdkZHhydzJ6Y3Myb24xOTI5ZjlteTEifQ.1XeapTPIPwrlnE9hHMqYxg",
});

const MyMapbox: React.FC<Props> = ({
  height,
  width,
  coordinates,
  onDragEnd,
}) => {
  return (
    <Map
      // eslint-disable-next-line react/style-prop-object
      style="mapbox://styles/mapbox/light-v9"
      containerStyle={{
        height: height,
        width: width,
      }}
      center={coordinates}
    >
      <Layer
        type="symbol"
        id="marker"
        maxZoom={20}
        layout={{ "icon-image": "marker-15" }}
      >
        <Feature
          draggable={true}
          onDragEnd={(e: any) => onDragEnd(e.lngLat.lng, e.lngLat.lat)}
          coordinates={coordinates}
        />
      </Layer>
    </Map>
  );
};

export default MyMapbox;

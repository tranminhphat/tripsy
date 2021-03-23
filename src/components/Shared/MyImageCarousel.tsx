import { Paper } from "@material-ui/core";
import * as React from "react";
import Carousel from "react-material-ui-carousel";

interface Props {
  urlArray: string[];
}

function Item(props) {
  return (
    <Paper variant="outlined">
      <div className="bg-black">
        <img
          src={props.item}
          alt={props.item}
          className="w-full h-96 object-contain"
        />
      </div>
    </Paper>
  );
}

const MyImageCarousel: React.FC<Props> = ({ urlArray }) => {
  return (
    <Carousel autoPlay fullHeightHover={false}>
      {urlArray.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
};

export default MyImageCarousel;

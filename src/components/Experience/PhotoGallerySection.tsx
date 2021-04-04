import { Hidden } from "@material-ui/core";
import MyImageCarousel from "components/Shared/MyImageCarousel";
import MyImageHero from "components/Shared/MyImageHero";
import * as React from "react";

interface Props {
  photoGallery: any[];
}

const PhotoGallerySection: React.FC<Props> = ({ photoGallery }) => {
  return (
    <div className="overflow-hidden rounded-lg">
      <Hidden mdUp>
        <MyImageCarousel
          urlArray={photoGallery.map((item) => item.url) as string[]}
        />
      </Hidden>
      <Hidden mdDown>
        <MyImageHero photoGallery={photoGallery} />
      </Hidden>
    </div>
  );
};

export default PhotoGallerySection;

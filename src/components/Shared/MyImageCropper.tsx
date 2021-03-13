import "cropperjs/dist/cropper.css";
import React, { useRef } from "react";
import Cropper from "react-cropper";

interface Props {
  src: string;
}

const MyImageCropper: React.FC<Props> = ({ src }) => {
  const cropperRef = useRef<HTMLImageElement>(null);
  const onCrop = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    // console.log(cropper.getCroppedCanvas().toDataURL());
  };

  return (
    <Cropper
      src={src}
      // Cropper.js options
      aspectRatio={2 / 3}
      guides={false}
      crop={onCrop}
      ref={cropperRef}
      viewMode={1}
      zoomOnWheel={false}
    />
  );
};

export default MyImageCropper;

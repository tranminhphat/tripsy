import AddPhotoIcon from "@material-ui/icons/AddPhotoAlternate";
import * as React from "react";

interface Props {}

const MyPhotoUpload: React.FC<Props> = () => {
  return (
    <div>
      <label htmlFor="photo-input">
        <div className="h-60 w-40 border border-dashed flex justify-center items-center cursor-pointer">
          <AddPhotoIcon />
        </div>
        <input type="file" id="photo-input" className="hidden" />
      </label>
    </div>
  );
};

export default MyPhotoUpload;

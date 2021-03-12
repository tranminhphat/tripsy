import { Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import AddPhotoIcon from "@material-ui/icons/AddPhotoAlternate";
import ClearIcon from "@material-ui/icons/Clear";
import * as React from "react";
import { useRef, useState } from "react";

interface Props {}

const MyPhotoUpload: React.FC<Props> = () => {
  const [photoInput, setPhotoInput] = useState("");
  const photoInputEl = useRef<HTMLInputElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handlePhotoInputChange = (e: any) => {
    const file = e.target.files[0];
    const img = new Image();
    img.src = window.URL.createObjectURL(file);
    img.onload = () => {
      setWidth(img.naturalWidth);
      setHeight(img.naturalHeight);
      if (width < 800 || height < 1200) {
        setIsModalOpen(true);
      }
    };
  };

  return (
    <div>
      <label htmlFor="photo-input">
        <div className="h-60 w-40 border border-dashed flex justify-center items-center cursor-pointer">
          <AddPhotoIcon />
        </div>
        <input
          type="file"
          ref={photoInputEl}
          accept=".jpg,.jpeg,.png.gif"
          value={photoInput}
          onChange={handlePhotoInputChange}
          id="photo-input"
          className="hidden"
        />
      </label>
      <Modal open={isModalOpen}>
        <div className="absolute w-max max-w-lg h-72 inset-0 m-auto bg-white rounded-2xl outline-none">
          <div className="flex flex-col justity-center items-center py-4 px-6">
            <div className="flex justify-between">
              <button
                onClick={() => setIsModalOpen(false)}
                className="focus:outline-none mr-4"
              >
                <span>
                  <ClearIcon />
                </span>
              </button>
              <h2 className="text-lg font-semibold">
                Tải lên một bức ảnh có chất lượng tốt hơn
              </h2>
            </div>
            <div className="mt-8">
              <p>
                Hình ảnh phải có độ phân giải ít nhất là 800px chiều rộng và
                1200px chiều cao. Vui lòng đăng tải hình ảnh thỏa yêu cầu. Hình
                bạn vừa tải lên có độ phân giải {width}x{height}
              </p>
            </div>
            <div className="flex justify-around mt-8">
              <Button variant="contained" className="mr-2">
                Hủy
              </Button>
              <Button
                onClick={() => {
                  if (photoInputEl.current !== null) {
                    photoInputEl.current.click();
                    setIsModalOpen(false);
                  }
                }}
                variant="contained"
                color="primary"
                className="ml-2"
              >
                Tải ảnh khác
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MyPhotoUpload;

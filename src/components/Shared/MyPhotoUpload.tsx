import { Button } from "@material-ui/core";
import AddPhotoIcon from "@material-ui/icons/AddPhotoAlternate";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { FileReaderResultType } from "types";
import MyImageCropper from "./MyImageCropper";
import MyModal from "./MyModal";

interface Props {}

const MyPhotoUpload: React.FC<Props> = () => {
  const [photoInput, setPhotoInput] = useState<Blob | null>(null);
  const [previewSource, setPreviewSource] = useState<FileReaderResultType>(
    null
  );
  const photoInputEl = useRef<HTMLInputElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPhotoEditModalOpen, setIsPhotoEditModalOpen] = useState(false);

  useEffect(() => {
    if (photoInput) {
      checkImageValid(photoInput);
    }
  }, [photoInput]);

  const checkImageValid = (photoInput: Blob) => {
    if (width < 800 || height < 1200) {
      console.log("width", width);
      console.log("height", height);
      setIsModalOpen(true);
    } else {
      previewFile(photoInput);
    }
  };

  const handlePhotoInputChange = (e: any) => {
    const file = e.target.files[0];
    const img = new Image();
    img.src = window.URL.createObjectURL(file);
    img.onload = () => {
      setWidth(img.naturalWidth);
      setHeight(img.naturalHeight);
      setPhotoInput(file);
    };
  };

  const previewFile = (file: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  return (
    <div>
      <label htmlFor="photo-input">
        <div className="h-60 w-40 border border-dashed flex justify-center items-center cursor-pointer">
          {previewSource ? (
            <>
              <img
                className="w-full h-full"
                src={previewSource as string}
                alt="cover"
              />
              <button onClick={() => setIsPhotoEditModalOpen(true)}>
                Edit
              </button>
              <div>
                <MyModal
                  open={isPhotoEditModalOpen}
                  setOpen={setIsPhotoEditModalOpen}
                >
                  {{
                    header: "Chỉnh sửa ảnh",
                    content: (
                      <>
                        <MyImageCropper src={previewSource as string} />
                      </>
                    ),
                  }}
                </MyModal>
              </div>
            </>
          ) : (
            <AddPhotoIcon />
          )}
        </div>
        <input
          type="file"
          ref={photoInputEl}
          accept=".jpg,.jpeg,.png.gif"
          onChange={handlePhotoInputChange}
          id="photo-input"
          className="hidden"
        />
      </label>
      <MyModal open={isModalOpen} setOpen={setIsModalOpen}>
        {{
          header: "Tải lên một bức ảnh có chất lượng tốt hơn",
          content: (
            <p>
              Hình ảnh phải có độ phân giải ít nhất là 800px chiều rộng và
              1200px chiều cao. Vui lòng đăng tải hình ảnh thỏa yêu cầu. Hình
              bạn vừa tải lên có độ phân giải {width}x{height}
            </p>
          ),
          footer: (
            <>
              <Button
                onClick={() => setIsModalOpen(false)}
                variant="contained"
                className="mr-2"
              >
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
            </>
          ),
        }}
      </MyModal>
    </div>
  );
};

export default MyPhotoUpload;

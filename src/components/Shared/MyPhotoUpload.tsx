import { Button } from "@material-ui/core";
import AddPhotoIcon from "@material-ui/icons/AddPhotoAlternate";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { FileReaderResultType } from "types";
import MyModal from "./MyModal";

interface Props {
  url?: FileReaderResultType;
  type?: string;
  setBase64String?: (base64String: FileReaderResultType) => void;
}

const MyPhotoUpload: React.FC<Props> = ({ url, type, setBase64String }) => {
  const [photoInput, setPhotoInput] = useState<Blob | null>(null);
  const [previewSource, setPreviewSource] = useState<FileReaderResultType>(
    url ? url : null
  );
  const photoInputEl = useRef<HTMLInputElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (photoInput) {
      checkImageValid(photoInput);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photoInput]);

  const checkImageValid = (photoInput: Blob) => {
    if (width < 800 || height < 1200) {
      setIsModalOpen(true);
    } else {
      previewFile(photoInput);
    }
  };

  const handlePhotoInputChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const img = new Image();
      img.src = window.URL.createObjectURL(file);
      img.onload = () => {
        setWidth(img.naturalWidth);
        setHeight(img.naturalHeight);
        setPhotoInput(file);
      };
    }
  };

  const previewFile = (file: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      if (setBase64String) {
        setBase64String(reader.result);
      }
    };
  };

  return (
    <div className="h-60 w-40">
      <label htmlFor={type}>
        <div className="h-60 w-40 border border-gray-400 border-dashed flex justify-center items-center cursor-pointer">
          {previewSource ? (
            <img
              className="w-full h-full"
              src={previewSource as string}
              alt="cover"
            />
          ) : (
            <AddPhotoIcon />
          )}
        </div>
        <input
          id={type}
          type="file"
          ref={photoInputEl}
          accept=".jpg,.jpeg,.png.gif"
          onChange={handlePhotoInputChange}
          className="hidden"
        />
      </label>
      <MyModal size="lg" open={isModalOpen} setOpen={setIsModalOpen}>
        {{
          header: (
            <h2 className="text-lg font-bold">
              Tải lên một bức ảnh có chất lượng tốt hơn
            </h2>
          ),
          content: (
            <div className="text-center">
              <p className="text-lg">
                Hình ảnh phải có độ phân giải ít nhất là 800px chiều rộng và
                1200px chiều cao. Vui lòng đăng tải hình ảnh thỏa yêu cầu. Hình
                bạn vừa tải lên có độ phân giải {width}x{height}
              </p>
            </div>
          ),
          footer: (
            <div className="flex justify-between">
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
            </div>
          ),
        }}
      </MyModal>
    </div>
  );
};

export default MyPhotoUpload;

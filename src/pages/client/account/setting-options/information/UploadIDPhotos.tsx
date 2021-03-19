import { CircularProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { getCurrentUser, updateUserById } from "api/users";
import GovIDBackIcon from "assets/images/icons/gov-id-back.svg";
import GovIDFrontIcon from "assets/images/icons/gov-id-front.svg";
import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { showAlert } from "redux/actions/alert/alertAction";
import { FileReaderResultType } from "types";

interface Props {
  setIdType: (idType: string) => void;
}

const UploadIDPhotos: React.FC<Props> = ({ setIdType }) => {
  const [
    frontCardPreview,
    setFrontCardPreview,
  ] = useState<FileReaderResultType>(null);
  const [backCardPreview, setBackCardPreview] = useState<FileReaderResultType>(
    null
  );
  const [buttonLoading, setButtonLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleInputChange = (e: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    if (e.target.id === "front-card") {
      reader.onloadend = () => {
        setFrontCardPreview(reader.result);
      };
    } else {
      reader.onloadend = () => {
        setBackCardPreview(reader.result);
      };
    }
  };

  const handleSubmit = async () => {
    setButtonLoading(true);
    const {
      data: {
        user: { _id },
      },
    } = await getCurrentUser(["_id"]);
    const res = await updateUserById(_id, {
      idCard: { front: frontCardPreview, back: backCardPreview },
    });
    if (res) {
      history.push("/account-settings/personal-info");
      dispatch(showAlert("success", "Cập nhật thành công"));
      setButtonLoading(false);
    } else {
      dispatch(showAlert("error", "Xảy ra lỗi"));
      setButtonLoading(false);
    }
  };

  return (
    <div className="my-2 max-w-2xl">
      <h1 className="text-4xl font-bold text-main-blue">
        Thêm ảnh mặt trước và mặt sau giấy tờ tùy thân của bạn
      </h1>
      <p className="mt-2 text-xl text-gray-400">
        Đảm bảo ảnh của bạn không bị nhòe, mờ và mặt trước giấy tờ tùy thân thể
        hiện rõ khuôn mặt bạn.
      </p>
      <div className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
          <label htmlFor="front-card">
            <div className="flex flex-col h-full justify-center items-center border-2 border-dashed border-gray-300 p-8 cursor-pointer">
              {frontCardPreview ? (
                <img src={frontCardPreview as string} alt="front-card" />
              ) : (
                <>
                  <div>
                    <img src={GovIDFrontIcon} alt="front id card icon" />
                  </div>
                  <div className="mt-4 text-center">
                    <p className="font-bold">
                      Thêm mặt trước của giấy tờ tùy thân
                    </p>
                    <p>JPEG hoặc PNG</p>
                  </div>
                </>
              )}
            </div>
            <input
              id="front-card"
              type="file"
              accept=".jpg,.jpeg"
              className="hidden"
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor="back-card">
            <div className="flex flex-col h-full justify-center items-center border-2 border-dashed border-gray-300 p-8 cursor-pointer">
              {backCardPreview ? (
                <img src={backCardPreview as string} alt="back-card" />
              ) : (
                <>
                  <div>
                    <img src={GovIDBackIcon} alt="back id card icon" />
                  </div>
                  <div className="mt-4 text-center">
                    <p className="font-bold">
                      Thêm mặt sau của giấy tờ tùy thân
                    </p>
                    <p>JPEG hoặc PNG</p>
                  </div>
                </>
              )}
            </div>
            <input
              id="back-card"
              type="file"
              accept=".jpg,.jpeg"
              className="hidden"
              onChange={handleInputChange}
            />
          </label>
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <Button onClick={() => setIdType("")}>Quay lại</Button>
        <Button
          disabled={!(frontCardPreview && backCardPreview)}
          onClick={() => handleSubmit()}
          variant="contained"
          className={
            !(frontCardPreview && backCardPreview)
              ? "bg-gray-400 text-white"
              : "bg-secondary-blue text-white"
          }
        >
          {buttonLoading ? (
            <CircularProgress className="text-white" size={30} />
          ) : (
            "Cập nhật"
          )}
        </Button>
      </div>
    </div>
  );
};

export default UploadIDPhotos;

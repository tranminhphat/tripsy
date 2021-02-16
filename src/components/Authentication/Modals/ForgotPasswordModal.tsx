import * as React from "react";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

import EmailVerificationImage from "assets/images/icons/email-verification.png";

interface VerificationProps {
  open: boolean;
  userEmail: string;
  onModalClose: () => void;
}

const EmailVerificationModal: React.FC<VerificationProps> = ({
  open,
  userEmail,
  onModalClose,
}) => {
  return (
    <Modal open={open}>
      <div className="absolute w-max h-96 inset-0 m-auto bg-white outline-none pb-4">
        <div className="flex justify-center bg-green-300 pt-10 rounded-b-full">
          <img src={EmailVerificationImage} alt="Email verification" />
        </div>
        <div className="flex flex-col justity-center items-center">
          <h2 style={{ fontFamily: "Lora" }} className="text-2xl my-4">
            Xác nhận email của bạn
          </h2>
          <div className="text-gray-400 text-center mx-4 leading-8">
            <p>Cảm ơn bạn! Chúng tôi đã gửi một thư xác nhận email</p>
            <p>
              vào địa chỉ:{" "}
              <span style={{ fontFamily: "Lora" }} className="text-green-300">
                {userEmail}
              </span>
              , hãy xác nhận email của bạn để thay đổi password
            </p>
          </div>
          <Button
            onClick={() => onModalClose()}
            className="w-32 h-12 mt-8 focus:outline-none bg-green-300 hover:bg-green-600 text-white"
          >
            Đồng ý
          </Button>
          <div className="mt-8 mb-4">
            <p>
              Bạn chưa nhận được email?{" "}
              <a
                style={{ fontFamily: "Lora" }}
                className="underline cursor-pointer hover:no-underline hover:text-green-600"
                onClick={() => {}}
                href="#reset-password"
              >
                Click để gửi lại.
              </a>
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EmailVerificationModal;

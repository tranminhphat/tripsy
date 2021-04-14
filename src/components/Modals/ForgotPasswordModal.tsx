import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import EmailVerificationImage from "assets/images/icons/email-verification.png";
import * as React from "react";

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
        <div className="flex justify-center bg-primary pt-10 rounded-b-full">
          <img src={EmailVerificationImage} alt="Email verification" />
        </div>
        <div className="flex flex-col justity-center items-center">
          <h2 className="text-2xl font-semibold my-4">
            Xác nhận email của bạn
          </h2>
          <div className="text-gray-400 text-center mx-4 leading-8">
            <p>Cảm ơn bạn! Chúng tôi đã gửi một thư xác nhận email</p>
            <p>
              vào địa chỉ: <span className="text-secondary">{userEmail}</span>,
              hãy xác nhận email của bạn để thay đổi password
            </p>
          </div>
          <Button
            onClick={() => onModalClose()}
            className="outline-none w-32 h-12 mt-8 outline:none bg-primary text-white"
          >
            Đồng ý
          </Button>
          <div className="mt-8 mb-4">
            <p>
              Bạn chưa nhận được email?{" "}
              <a
                className="underline cursor-pointer hover:no-underline"
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

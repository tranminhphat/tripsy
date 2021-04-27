import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { resendEmailVerification } from "api/auth";
import MailSentIcon from "assets/images/icons/mail.svg";
import * as React from "react";

interface VerificationProps {
  open: boolean;
  userId: string;
  userEmail: string;
  userFirstName: string;
  onModalClose: () => void;
}

const EmailVerificationModal: React.FC<VerificationProps> = ({
  open,
  userId,
  userEmail,
  userFirstName,
  onModalClose,
}) => {
  return (
    <Modal open={open}>
      <div className="absolute w-max h-96 inset-0 m-auto bg-white outline-none pb-4">
        <div className="flex justify-center bg-primary pt-10 rounded-b-full">
          <img
            src={MailSentIcon}
            width={72}
            height={72}
            alt="Email verification"
          />
        </div>
        <div className="flex flex-col justity-center items-center">
          <h2 className="text-2xl font-semibold my-4">
            Xác nhận email của bạn
          </h2>
          <div className="text-gray-400 mx-4">
            <p>
              Cảm ơn <span className="text-secondary">{userFirstName}</span> !
              Chúng tôi đã gửi một thư xác nhận email
            </p>
            <p>
              vào địa chỉ: <span className="text-secondary">{userEmail}</span>,
              hãy xác nhận email của bạn
            </p>
          </div>
          <Button
            onClick={() => onModalClose()}
            className="outline:none w-32 h-12 mt-8 outline:none bg-primary text-white"
          >
            Đồng ý
          </Button>
          <div className="mt-8 mb-4">
            <p>
              Bạn chưa nhận được email?{" "}
              <a
                className="underline cursor-pointer hover:no-underline"
                onClick={() => resendEmailVerification(userId, userEmail)}
                href="#resend-email-verification"
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

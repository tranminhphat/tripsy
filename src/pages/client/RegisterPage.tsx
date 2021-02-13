import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import IRegisterForm from "interfaces/forms/RegisterForm.interface";
import { register } from "api/Auth";
import RegisterForm from "components/RegisterForm";
import EmailVerificationModal from "components/EmailVerificationModal";

interface Props extends RouteComponentProps {}

export const RegisterPage: React.FC<Props> = ({ history }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleModalOpen = () => {
    setIsOpen(true);
  };
  const handleModalClose = () => {
    setIsOpen(false);
  };
  const handleSubmit = async (values: IRegisterForm) => {
    try {
      const res = await register(values);
      if (res.data) {
        handleModalOpen();
        // history.push("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center">
      <RegisterForm
        onSubmit={(values: IRegisterForm) => handleSubmit(values)}
      />
      <EmailVerificationModal
        open={isOpen}
        onModalClose={handleModalClose}
        userEmail="phattm204@gmail.com"
        userFullName="Trần Minh Phát"
      />
    </div>
  );
};

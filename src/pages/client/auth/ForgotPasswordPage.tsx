import * as React from "react";

import { forgotPassword } from "api/auth";
import LoginBackground from "assets/images/backgrounds/login-bg.jpg";
import ForgotPasswordForm from "components/Authentication/Forms/ForgotPasswordForm";
import ForgotPasswordModal from "components/Authentication/Modals/ForgotPasswordModal";
import useErrorHandler from "hooks/useErrorHandler";

interface Props {}

const ForgotPasswordPage: React.FC<Props> = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [errorMessage, setErrorMessage] = useErrorHandler();

  const handleModalOpen = (email: string) => {
    setEmail(email);
    setIsOpen(true);
  };
  const handleModalClose = () => {
    setIsOpen(false);
  };
  const handleSubmit = async (values: { email: string }) => {
    try {
      setIsLoading(true);
      const res = await forgotPassword(values.email);
      if (res) {
        setIsLoading(false);
        setErrorMessage("");
        handleModalOpen(values.email);
      }
    } catch (err) {
      setIsLoading(false);
      if (err.response) {
        setErrorMessage(err.response.data);
      }
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${LoginBackground})`,
        boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.5)",
      }}
      className="flex justify-center h-screen bg-cover bg-no-repeat bg-center"
    >
      <ForgotPasswordForm
        isLoading={isLoading}
        error={errorMessage}
        onSubmit={(values: { email: string }) => handleSubmit(values)}
      />
      <ForgotPasswordModal
        open={isOpen}
        userEmail={email}
        onModalClose={handleModalClose}
      />
    </div>
  );
};

export default ForgotPasswordPage;

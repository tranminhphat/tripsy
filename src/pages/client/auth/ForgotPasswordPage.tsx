import * as React from "react";

import { forgotPassword } from "api/auth";
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
        setErrorMessage(err.response.data.error);
      }
    }
  };

  return (
    <div className="flex justify-center h-screen">
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

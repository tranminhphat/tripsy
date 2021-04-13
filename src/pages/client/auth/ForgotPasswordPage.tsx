import { forgotPassword } from "api/auth";
import ForgotPasswordForm from "components/Forms/ForgotPasswordForm";
import ForgotPasswordModal from "components/Modals/ForgotPasswordModal";
import useErrorHandler from "hooks/useErrorHandler";
import MainLayout from "layouts/MainLayout";
import * as React from "react";
import { useState } from "react";

interface Props {}

const ForgotPasswordPage: React.FC<Props> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
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
    <MainLayout>
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
    </MainLayout>
  );
};

export default ForgotPasswordPage;

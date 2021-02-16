import * as React from "react";

import { forgotPassword } from "api/auth";
import LoginBackground from "assets/images/backgrounds/login-bg.jpg";
import ForgotPasswordForm from "components/Authentication/Forms/ForgotPasswordForm";
import ForgotPasswordModal from "components/Authentication/Modals/ForgotPasswordModal";

interface Props {}

const ForgotPasswordPage: React.FC<Props> = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const handleModalOpen = (email: string) => {
    setEmail(email);
    setIsOpen(true);
  };
  const handleModalClose = () => {
    setIsOpen(false);
  };
  const handleSubmit = async (values: { email: string }) => {
    try {
      const res = await forgotPassword(values.email);
      if (res) {
        handleModalOpen(values.email);
      }
    } catch (err) {
      console.error(err);
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

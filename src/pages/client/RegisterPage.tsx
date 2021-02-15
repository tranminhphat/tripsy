import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

import { register } from "api/auth";
import RegisterForm from "components/RegisterForm";
import EmailVerificationModal from "components/EmailVerificationModal";
import RegisterBackground from "assets/images/backgrounds/register-bg.jpg";
import IRegisterForm from "interfaces/forms/register-form.interface";
import IUserResponse from "interfaces/users/user.interface";
import { CircularProgress } from "@material-ui/core";

interface Props extends RouteComponentProps {}

export const RegisterPage: React.FC<Props> = ({ history }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [userData, setUserData] = React.useState<IUserResponse>();

  const handleModalOpen = () => {
    setIsOpen(true);
  };
  const handleModalClose = () => {
    setIsOpen(false);
    history.push("/login");
  };
  const handleSubmit = async (values: IRegisterForm) => {
    try {
      setIsLoading(true);
      const res = await register(values);
      if (res.data) {
        setIsLoading(false);
        setUserData(res.data);
        handleModalOpen();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${RegisterBackground})`,
        boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.5)",
      }}
      className="flex justify-center bg-cover bg-no-repeat bg-center"
    >
      {!isLoading ? (
        <>
          <RegisterForm
            onSubmit={(values: IRegisterForm) => handleSubmit(values)}
          />
          <EmailVerificationModal
            open={isOpen}
            onModalClose={handleModalClose}
            userId={userData ? userData._id : ""}
            userEmail={userData ? userData.email : ""}
            userFullName={userData ? userData.fullName : ""}
          />
        </>
      ) : (
        <div className="h-screen flex justify-center items-center">
          <CircularProgress
            className="text-green-600"
            size={80}
            thickness={8.0}
          />
        </div>
      )}
    </div>
  );
};

import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import IRegisterForm from "interfaces/forms/RegisterForm.interface";
import { register } from "api/Auth";
import RegisterForm from "components/RegisterForm";
import EmailVerificationModal from "components/EmailVerificationModal";
import IUserResponse from "interfaces/users/User.interface";
import RegisterBackground from "assets/images/register-bg.jpg";

interface Props extends RouteComponentProps {}

export const RegisterPage: React.FC<Props> = ({ history }) => {
  const [isOpen, setIsOpen] = React.useState(false);
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
      const res = await register(values);
      if (res.data) {
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
    </div>
  );
};

import { register } from "api/auth";
import RegisterForm from "components/Forms/RegisterForm";
import EmailVerificationModal from "components/Modals/EmailVerificationModal";
import AlertContext from "contexts/AlertContext";
import useErrorHandler from "hooks/useErrorHandler";
import IRegisterForm from "interfaces/forms/register-form.interface";
import { IUser } from "interfaces/users/user.interface";
import MainLayout from "layouts/MainLayout";
import * as React from "react";
import { useContext, useState } from "react";
import { RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps {}

const RegisterPage: React.FC<Props> = ({ history }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useErrorHandler();
  const [userResponse, setUserResponse] = useState<IUser>();
  const { alert } = useContext(AlertContext);

  const handleModalOpen = () => {
    setIsOpen(true);
  };
  const handleModalClose = () => {
    setIsOpen(false);
    alert("success", "Đăng ký thành công");
    history.push("/login");
  };
  const handleSubmit = async (values: IRegisterForm) => {
    try {
      setIsLoading(true);
      const { data } = await register(values);
      if (data) {
        setIsLoading(false);
        setUserResponse(data);
        handleModalOpen();
      }
    } catch (err) {
      setIsLoading(false);
      if (err.response) {
        setErrorMessage(err.response.data.error);
        alert("error", "Đăng ký thất bại");
      }
    }
  };

  return (
    <MainLayout>
      <div className="flex justify-center">
        <RegisterForm
          error={errorMessage}
          isLoading={isLoading}
          onSubmit={(values: IRegisterForm) => handleSubmit(values)}
        />
        <EmailVerificationModal
          open={isOpen}
          onModalClose={handleModalClose}
          userId={userResponse ? userResponse._id! : ""}
          userEmail={userResponse ? userResponse.email! : ""}
          userFirstName={userResponse ? userResponse.firstName! : ""}
        />
      </div>
    </MainLayout>
  );
};

export default RegisterPage;

import { register } from "api/auth";
import RegisterForm from "components/Authentication/Forms/RegisterForm";
import EmailVerificationModal from "components/Authentication/Modals/EmailVerificationModal";
import useErrorHandler from "hooks/useErrorHandler";
import IRegisterForm from "interfaces/forms/register-form.interface";
import { IUser } from "interfaces/users/user.interface";
import MainLayout from "layouts/MainLayout";
import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { showAlert } from "redux/actions/alert/alertAction";

interface Props extends RouteComponentProps {}

const RegisterPage: React.FC<Props> = ({ history }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useErrorHandler();
  const [userResponse, setUserResponse] = useState<IUser>();
  const dispatch = useDispatch();

  const handleModalOpen = () => {
    setIsOpen(true);
  };
  const handleModalClose = () => {
    setIsOpen(false);
    dispatch(showAlert("success", "Đăng ký thành công"));
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
        dispatch(showAlert("error", "Đăng ký thất bại"));
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

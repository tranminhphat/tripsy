import * as React from "react";
import { useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { register } from "api/auth";
import RegisterForm from "components/Authentication/Forms/RegisterForm";
import EmailVerificationModal from "components/Authentication/Modals/EmailVerificationModal";
import IRegisterForm from "interfaces/forms/register-form.interface";
import IUserResponse from "interfaces/users/user.interface";
import useErrorHandler from "hooks/useErrorHandler";
import { showAlert } from "redux/actions/alert/alertAction";

interface Props extends RouteComponentProps {}

const RegisterPage: React.FC<Props> = ({ history }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = useErrorHandler();
  const [userData, setUserData] = React.useState<IUserResponse>();
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
      const res = await register(values);
      if (res.data) {
        setIsLoading(false);
        setUserData(res.data);
        handleModalOpen();
      }
    } catch (err) {
      setIsLoading(false);
      if (err.response) {
        setErrorMessage(err.response.data);
        dispatch(showAlert("error", "Đăng ký thất bại"));
      }
    }
  };

  return (
    <div className="flex justify-center">
      <RegisterForm
        error={errorMessage}
        isLoading={isLoading}
        onSubmit={(values: IRegisterForm) => handleSubmit(values)}
      />
      <EmailVerificationModal
        open={isOpen}
        onModalClose={handleModalClose}
        userId={userData ? userData._id : ""}
        userEmail={userData ? userData.email : ""}
        userFirstName={userData ? userData.firstName : ""}
      />
    </div>
  );
};

export default RegisterPage;

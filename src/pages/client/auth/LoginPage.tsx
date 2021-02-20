import * as React from "react";
import { useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { login } from "api/auth";
import { getUserById } from "api/users";
import LoginForm from "components/Authentication/Forms/LoginForm";
import { showAlert } from "redux/actions/alert/alertAction";
import ILoginForm from "interfaces/forms/login-form.interface";
import useErrorHandler from "hooks/useErrorHandler";

interface Props extends RouteComponentProps {}

const LoginPage: React.FC<Props> = ({ history }) => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useErrorHandler();

  const handleSubmit = async (values: ILoginForm) => {
    try {
      const { data } = await login(values);
      if (data.userId) {
        try {
          const userData = await getUserById(data.userId);
          if (!userData.data.isVerified) {
            dispatch(showAlert("error", "Email của bạn chưa được xác nhận"));
          } else {
            history.push("/");
            localStorage.setItem("userId", data.userId);
            dispatch(showAlert("success", "Đăng nhập thành công"));
          }
        } catch (err) {
          if (err.response) {
            setErrorMessage(err.response.data);
          }
          dispatch(showAlert("error", "Đăng nhập thất bại"));
        }
      }
    } catch (err) {
      if (err.response) {
        setErrorMessage(err.response.data);
      }
      dispatch(showAlert("error", "Đăng nhập thất bại"));
    }
  };
  return (
    <div className="flex justify-center h-screen">
      <LoginForm
        error={errorMessage}
        onSubmit={(values: ILoginForm) => handleSubmit(values)}
      />
    </div>
  );
};

export default LoginPage;

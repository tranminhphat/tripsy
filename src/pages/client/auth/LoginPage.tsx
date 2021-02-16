import * as React from "react";
import { useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { login } from "api/auth";
import { getUserById } from "api/user";
import LoginForm from "components/Authentication/Forms/LoginForm";
import { setUserData } from "redux/actions/user/userAction";
import { showAlert } from "redux/actions/alert/alertAction";
import ILoginForm from "interfaces/forms/login-form.interface";
import LoginBackground from "assets/images/backgrounds/login-bg.jpg";
import useErrorHandler from "hooks/useErrorHandler";

interface Props extends RouteComponentProps {}

const LoginPage: React.FC<Props> = ({ history }) => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useErrorHandler();

  const handleSubmit = async (values: ILoginForm) => {
    try {
      const res = await login(values);
      console.log(res);
      const { data } = res;
      if (data.userId) {
        try {
          const userData = await getUserById(data.userId);
          if (!userData.data.isVerified) {
            dispatch(showAlert("error", "Email của bạn chưa được xác nhận"));
          } else {
            history.push("/");
            dispatch(setUserData(userData.data));
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
    <div
      style={{
        backgroundImage: `url(${LoginBackground})`,
        boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.5)",
      }}
      className="flex justify-center h-screen bg-cover bg-no-repeat bg-center"
    >
      <LoginForm
        error={errorMessage}
        onSubmit={(values: ILoginForm) => handleSubmit(values)}
      />
    </div>
  );
};

export default LoginPage;

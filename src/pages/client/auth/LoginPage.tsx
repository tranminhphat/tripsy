import { login } from "api/auth";
import { getUserById } from "api/users";
import LoginForm from "components/Forms/LoginForm";
import AlertContext from "contexts/AlertContext";
import useErrorHandler from "hooks/useErrorHandler";
import ILoginForm from "interfaces/forms/login-form.interface";
import MainLayout from "layouts/MainLayout";
import * as React from "react";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { setAuth } from "redux/actions/auth/authAction";

interface Props extends RouteComponentProps {}

const LoginPage: React.FC<Props> = ({ history }) => {
  const dispatch = useDispatch();
  const { alert } = useContext(AlertContext);
  const [errorMessage, setErrorMessage] = useErrorHandler();

  const handleSubmit = async (values: ILoginForm) => {
    try {
      const { data } = await login(values);
      if (data.userId) {
        try {
          const userData = await getUserById(data.userId);
          if (!userData.data.isEmailVerified) {
            alert("error", "Email của bạn chưa được xác nhận");
          } else {
            dispatch(setAuth());
            alert("success", "Đăng nhập thành công");
            history.push("/");
          }
        } catch (err) {
          if (err.response.data) {
            setErrorMessage(err.response.data.error);
          }
          alert("error", "Đăng nhập thất bại");
        }
      }
    } catch (err) {
      if (err.response.data) {
        setErrorMessage(err.response.data.error);
      }
      alert("error", "Đăng nhập thất bại");
    }
  };
  return (
    <MainLayout>
      <div className="flex justify-center h-screen">
        <LoginForm
          error={errorMessage}
          onSubmit={(values: ILoginForm) => handleSubmit(values)}
        />
      </div>
    </MainLayout>
  );
};

export default LoginPage;

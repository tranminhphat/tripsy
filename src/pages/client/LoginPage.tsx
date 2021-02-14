import * as React from "react";
import LoginForm from "components/LoginForm";
import { login } from "api/Auth";
import { RouteComponentProps } from "react-router-dom";
import ILoginForm from "interfaces/forms/LoginForm.interface";
import { getUserById } from "api/User";
import { showAlert } from "redux/actions/alert/alertAction";
import { useDispatch } from "react-redux";
import { setUser } from "redux/actions/user/userAction";
import LoginBackground from "assets/images/login-bg.jpg";

interface Props extends RouteComponentProps {}

const LoginPage: React.FC<Props> = ({ history }) => {
  const dispatch = useDispatch();
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
            dispatch(setUser(userData.data));
            dispatch(showAlert("success", "Đăng nhập thành công"));
          }
        } catch (err) {
          console.error(err);
        }
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
      className="flex justify-center bg-cover bg-no-repeat bg-center"
    >
      <LoginForm onSubmit={(values: ILoginForm) => handleSubmit(values)} />
    </div>
  );
};

export default LoginPage;

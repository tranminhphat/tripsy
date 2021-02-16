import * as React from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { resetPassword } from "api/auth";
import LoginBackground from "assets/images/backgrounds/login-bg.jpg";
import ResetPasswordForm from "components/Authentication/Forms/ResetPasswordForm";
import { showAlert } from "redux/actions/alert/alertAction";

interface Props extends RouteComponentProps {}

const ResetPasswordPage: React.FC<Props> = ({ history }) => {
  const { token } = useParams<{ token: string }>();
  const dispatch = useDispatch();

  const handleSubmit = async (newPassword: string) => {
    try {
      const res = await resetPassword(token, newPassword);
      if (res) {
        dispatch(showAlert("success", "Đổi mật khẩu thành công"));
        history.push("/login");
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
      <ResetPasswordForm
        onSubmit={(newPassword) => handleSubmit(newPassword)}
      />
    </div>
  );
};

export default ResetPasswordPage;

import { resetPassword } from "api/auth";
import ResetPasswordForm from "components/Forms/ResetPasswordForm";
import AlertContext from "contexts/AlertContext";
import useErrorHandler from "hooks/useErrorHandler";
import MainLayout from "layouts/MainLayout";
import * as React from "react";
import { useContext } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";

interface Props extends RouteComponentProps {}

const ResetPasswordPage: React.FC<Props> = ({ history }) => {
  const { token } = useParams<{ token: string }>();
  const [errorMessage, setErrorMessage] = useErrorHandler();
  const { alert } = useContext(AlertContext);

  const handleSubmit = async (newPassword: string) => {
    try {
      const res = await resetPassword(token, newPassword);
      if (res) {
        alert("success", "Đổi mật khẩu thành công");
        history.push("/login");
      }
    } catch (err) {
      if (err.response) {
        setErrorMessage(err.response.data.error);
        alert("error", "Đổi mật khẩu thất bại");
      }
    }
  };

  return (
    <MainLayout>
      <div className="flex justify-center h-screen">
        <ResetPasswordForm
          error={errorMessage}
          onSubmit={(newPassword) => handleSubmit(newPassword)}
        />
      </div>
    </MainLayout>
  );
};

export default ResetPasswordPage;

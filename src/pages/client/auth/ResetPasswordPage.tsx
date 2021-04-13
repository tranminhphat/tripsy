import { resetPassword } from "api/auth";
import ResetPasswordForm from "components/Forms/ResetPasswordForm";
import useErrorHandler from "hooks/useErrorHandler";
import MainLayout from "layouts/MainLayout";
import * as React from "react";
import { useDispatch } from "react-redux";
import { RouteComponentProps, useParams } from "react-router-dom";
import { showAlert } from "redux/actions/alert/alertAction";

interface Props extends RouteComponentProps {}

const ResetPasswordPage: React.FC<Props> = ({ history }) => {
  const { token } = useParams<{ token: string }>();
  const [errorMessage, setErrorMessage] = useErrorHandler();
  const dispatch = useDispatch();

  const handleSubmit = async (newPassword: string) => {
    try {
      const res = await resetPassword(token, newPassword);
      if (res) {
        dispatch(showAlert("success", "Đổi mật khẩu thành công"));
        history.push("/login");
      }
    } catch (err) {
      if (err.response) {
        setErrorMessage(err.response.data.error);
        dispatch(showAlert("error", "Đổi mật khẩu thất bại"));
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

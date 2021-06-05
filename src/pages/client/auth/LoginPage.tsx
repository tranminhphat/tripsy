import { login } from "api/auth";
import { getUserById } from "api/users";
import LoginForm from "components/Forms/LoginForm";
import AlertContext from "contexts/AlertContext";
import AuthContext from "contexts/AuthContext";
import useErrorHandler from "hooks/useErrorHandler";
import ILoginForm from "interfaces/forms/login-form.interface";
import MainLayout from "layouts/MainLayout";
import * as React from "react";
import { useContext } from "react";
import { RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps {}

const LoginPage: React.FC<Props> = ({ history }) => {
	const { alert } = useContext(AlertContext);
	const { refreshAuth } = useContext(AuthContext);
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
						refreshAuth();
						alert("success", "Đăng nhập thành công");
						if (userData.data.roleId.includes("603275723be1c62dc86527b8")) {
							history.push("/admin/dashboard", { tabName: "Dashboard" });
						} else {
							history.push("/");
						}
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
			<div className="flex justify-center">
				<LoginForm
					error={errorMessage}
					onSubmit={(values: ILoginForm) => handleSubmit(values)}
				/>
			</div>
		</MainLayout>
	);
};

export default LoginPage;

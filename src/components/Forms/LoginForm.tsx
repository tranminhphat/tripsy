import { Button } from "@material-ui/core";
import LoginImage from "assets/images/backgrounds/signin-image.jpg";
import MyErrorMessage from "components/Shared/MyErrorMessage";
import { Form, Formik } from "formik";
import ILoginForm from "interfaces/forms/login-form.interface";
import * as React from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import MyTextField from "../Shared/MyTextField";

interface Props {
	error: string;
	onSubmit: (values: ILoginForm) => void;
}

const validationSchema = yup.object({
	username: yup
		.string()
		.required("Username là thông tin bắt buộc")
		.min(6, "Username phải có tối thiểu 6 ký tự"),

	password: yup
		.string()
		.required("Mật khẩu là thông tin bắt buộc")
		.min(6, "Mật khẩu phải có tối thiểu 6 ký tự"),
});

const LoginForm: React.FC<Props> = ({ error, onSubmit }) => {
	return (
		<div className="px-8 flex items-center">
			<div className="mr-8">
				<img src={LoginImage} alt="login illustation" />
			</div>
			<div className="ml-8 flex flex-col items-center justify-center">
				<div className="text-center mt-4">
					<h1 className="text-4xl font-semibold leading-normal mt-0 mb-2 text-secondary">
						Đăng nhập
					</h1>
				</div>
				<div className="mt-4 w-80 h-px border border-solid border-secondary" />
				<Formik
					initialValues={{ username: "", password: "" }}
					onSubmit={(values) => {
						onSubmit(values);
					}}
					validationSchema={validationSchema}
				>
					{() => (
						<Form className="mt-6 w-full flex flex-col items-center justify-center">
							<div className="mt-4 w-7/12">
								<MyTextField
									className="w-full"
									name="username"
									label="Username"
								/>
							</div>
							<div className="mt-4 w-7/12">
								<MyTextField
									className="w-full"
									name="password"
									label="Password"
									type="password"
								/>
							</div>
							<div className="mt-4 w-7/12 flex justify-end">
								<Link className="hover:underline" to="/forgot-password">
									Quên mật khẩu?
								</Link>
							</div>
							<div className="mt-12 w-4/12 h-12">
								<Button
									className="outline:none w-full h-full focus:outline-none bg-secondary text-white"
									type="submit"
								>
									Đăng nhập
								</Button>
							</div>
							<div className="mt-4">
								{error !== "" ? <MyErrorMessage>{error}</MyErrorMessage> : ""}
							</div>
							<div className="mt-4 mb-6">
								<a
									className="text-lg underline hover:no-underline"
									href="/register"
								>
									Hoặc tạo một tài khoản mới
								</a>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default LoginForm;

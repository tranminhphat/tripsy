import * as React from "react";
import { Formik, Form } from "formik";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import * as yup from "yup";

import ILoginForm from "interfaces/forms/login-form.interface";
import MyTextField from "../../Shared/MyTextField";
import MyErrorMessage from "components/Shared/MyErrorMessage";

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
    .required("Password là thông tin bắt buộc")
    .min(6, "Password phải có tối thiểu 6 ký tự"),
});

const LoginForm: React.FC<Props> = ({ error, onSubmit }) => {
  return (
    <div className="my-12 flex flex-col items-center justify-center w-96 bg-white border border-gray-200 shadow-2xl rounded-2xl">
      <div className="text-center mt-4">
        <h1
          style={{ fontFamily: "Lora" }}
          className="text-4xl font-semibold leading-normal mt-0 mb-2 text-main-blue"
        >
          Đăng nhập
        </h1>
        <p style={{ fontFamily: "Lora" }}>
          và bắt đầu những <em className="font-bold">trải nghiệm</em>
        </p>
      </div>
      <div className="mt-4 w-80 h-px border border-solid border-main-blue" />
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
              <Link
                style={{ fontFamily: "Lora" }}
                className="hover:underline"
                to="/forgot-password"
              >
                Quên mật khẩu?
              </Link>
            </div>
            <div className="mt-12 w-4/12 h-12">
              <Button
                className="outline:none w-full h-full focus:outline-none bg-main-blue text-white"
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
                style={{ fontFamily: "Lora" }}
                className="text-lg underline hover:no-underline hover:text-main-pink"
                href="/register"
              >
                Hoặc tạo một tài khoản mới
              </a>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;

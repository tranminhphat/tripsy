import * as React from "react";
import { Formik, Form } from "formik";
import { Button } from "@material-ui/core";
import * as yup from "yup";

import ILoginForm from "interfaces/forms/login-form.interface";
import MyTextField from "./Shared/MyTextField";

interface Props {
  onSubmit: (values: ILoginForm) => void;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .required("Email là thông tin bắt buộc")
    .email("Email không hợp lệ"),

  password: yup
    .string()
    .required("Password là thông tin bắt buộc")
    .min(6, "Password phải có tối thiểu 6 ký tự"),
});

const LoginForm: React.FC<Props> = ({ onSubmit }) => {
  return (
    <div className="my-12 flex flex-col items-center justify-center w-96 bg-white shadow-lg rounded-2xl">
      <div className="text-center mt-4">
        <h1 className="text-4xl font-normal leading-normal mt-0 mb-2 text-green-600">
          Đăng nhập
        </h1>
        <p style={{ fontFamily: "Lora" }}>
          và bắt đầu những <em className="font-bold">trải nghiệm</em>
        </p>
      </div>
      <div className=" mt-4 w-80 h-px border border-solid border-green-600" />
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          onSubmit(values);
        }}
        validationSchema={validationSchema}
      >
        {({ values }) => (
          <Form className="mt-6 w-full flex flex-col items-center justify-center">
            <div className="mt-4 w-7/12">
              <MyTextField className="w-full" name="email" label="Email" />
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
              <a
                style={{ fontFamily: "Lora" }}
                className="hover:underline"
                href="/"
              >
                Quên mật khẩu?
              </a>
            </div>
            <div className="mt-12 w-4/12 h-12">
              <Button
                className="w-full h-full focus:outline-none bg-green-500 hover:bg-green-700 text-white"
                type="submit"
              >
                Đăng nhập
              </Button>
            </div>
            <div className="mt-4 mb-6">
              <a
                style={{ fontFamily: "Lora" }}
                className="text-lg underline hover:no-underline hover:text-green-600"
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

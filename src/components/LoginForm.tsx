import { TextField, Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as React from "react";
import ILoginForm from "../@types/forms/LoginForm";
interface Props {
  onSubmit: (values: ILoginForm) => void;
}

export const LoginForm: React.FC<Props> = ({ onSubmit }) => {
  return (
    <div className="my-10 flex flex-col items-center justify-center w-96 bg-white shadow-lg rounded-2xl">
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
      >
        {({ values, handleChange, handleBlur }) => (
          <Form className="mt-6 w-full flex flex-col items-center justify-center">
            <div className="mt-4 w-7/12">
              <TextField
                className="w-full"
                name="email"
                label="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className="mt-4 w-7/12">
              <TextField
                className="w-full"
                type="password"
                name="password"
                label="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
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

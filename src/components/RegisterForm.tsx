import { TextField, Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as React from "react";
import IRegisterForm from "../@types/forms/RegisterForm";
interface Props {
  onSubmit: (values: IRegisterForm) => void;
}

export const RegisterForm: React.FC<Props> = ({ onSubmit }) => {
  return (
    <div className="my-10 flex flex-col items-center justify-center w-96 bg-white shadow-lg rounded-2xl">
      <div className="text-center mt-4">
        <h1 className="text-4xl font-normal leading-normal mt-0 mb-2 text-green-600">
          Đăng ký
        </h1>
        <p style={{ fontFamily: "Lora" }}>
          và bắt đầu những <em className="font-bold">trải nghiệm</em>
        </p>
      </div>
      <div className=" mt-4 w-80 h-px border border-solid border-green-600" />
      <Formik
        initialValues={{ fullName: "", email: "", username: "", password: "" }}
        onSubmit={(values) => {
          onSubmit(values);
        }}
      >
        {({ values, handleChange, handleBlur }) => (
          <Form className="mt-6 w-full flex flex-col items-center justify-center">
            <div className="mt-4 w-7/12">
              <TextField
                className="w-full"
                name="fullName"
                label="Họ và Tên"
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
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
                name="username"
                label="Username"
                value={values.username}
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
            <div className="mt-4 w-7/12" />
            <div className="mt-12 w-4/12 h-12">
              <Button
                className="w-full h-full focus:outline-none bg-green-500 hover:bg-green-700 text-white"
                type="submit"
              >
                Đăng ký
              </Button>
            </div>
            <div className="mt-4 mb-6">
              <span className="text-lg">
                Bạn đã có tài khoản?{" "}
                <a
                  className="underline hover:no-underline hover:text-green-600"
                  href="/login"
                  style={{ fontFamily: "Lora" }}
                >
                  Đăng nhập ngay!
                </a>
              </span>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

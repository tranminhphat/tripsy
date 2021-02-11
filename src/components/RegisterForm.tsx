import { Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import * as React from "react";
import IRegisterForm from "interfaces/forms/RegisterForm.interface";
import MyTextField from "./Shared/MyTextField";
import * as yup from "yup";
import { AlertType } from "types/alertType";
import { showAlert } from "redux/actions/alert/alertAction";
interface Props {
  onSubmit: (values: IRegisterForm) => void;
  showAlert: (alertType: AlertType, alertMessage: string) => void;
}

const validationSchema = yup.object({
  fullName: yup.string().required("Họ và Tên là thông tin bắt buộc"),

  email: yup
    .string()
    .required("Email là thông tin bắt buộc")
    .email("Email không hợp lệ"),

  username: yup
    .string()
    .required("Username là thông tin bắt buộc")
    .min(6, "Username phải có tối thiểu 6 ký tự")
    .strict()
    .lowercase("Username không được có ký tự viết hoa"),

  password: yup
    .string()
    .required("Password là thông tin bắt buộc")
    .min(6, "Password phải có tối thiểu 6 ký tự"),
});

const RegisterForm: React.FC<Props> = ({ onSubmit, showAlert }) => {
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
          showAlert("success", "Đăng ký thành công");
        }}
        validationSchema={validationSchema}
      >
        {({ values }) => (
          <Form className="mt-6 w-full flex flex-col items-center justify-center">
            <div className="mt-4 w-7/12">
              <MyTextField
                label="Họ và Tên"
                name="fullName"
                className="w-full"
              />
            </div>
            <div className="mt-4 w-7/12">
              <MyTextField label="Email" name="email" className="w-full" />
            </div>
            <div className="mt-4 w-7/12">
              <MyTextField
                label="Username"
                name="username"
                className="w-full"
              />
            </div>
            <div className="mt-4 w-7/12">
              <MyTextField
                label="Password"
                name="password"
                type="password"
                className="w-full"
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
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  showAlert: (alertType: AlertType, alertMessage: string) =>
    dispatch(showAlert(alertType, alertMessage)),
});

export default connect(null, mapDispatchToProps)(RegisterForm);

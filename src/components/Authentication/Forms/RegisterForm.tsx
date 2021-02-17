import * as React from "react";
import { Formik, Form } from "formik";
import { Button } from "@material-ui/core";
import * as yup from "yup";

import IRegisterForm from "interfaces/forms/register-form.interface";
import MyTextField from "../../Shared/MyTextField";
import { MyFileInput } from "../../Shared/MyFileInput";
import { FileReaderResultType } from "types";
import MyErrorMessage from "components/Shared/MyErrorMessage";
import CircularProgress from "@material-ui/core/CircularProgress";
interface Props {
  error: string;
  isLoading: boolean;
  onSubmit: (values: IRegisterForm) => void;
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

const RegisterForm: React.FC<Props> = ({ error, isLoading, onSubmit }) => {
  console.log(error);
  const [
    base64EncodedImage,
    setBase64EncodedImage,
  ] = React.useState<FileReaderResultType>(null);

  const handleSetImage = (image: FileReaderResultType) => {
    setBase64EncodedImage(image);
  };

  return (
    <div className="my-12 flex flex-col items-center justify-center w-96 md:w-1/2 bg-white shadow-lg rounded-2xl">
      <div className="text-center mt-4">
        <h1
          style={{ fontFamily: "Lora" }}
          className="text-4xl font-semibold leading-normal mt-0 mb-2 text-main-blue"
        >
          Đăng ký
        </h1>
        <p style={{ fontFamily: "Lora" }}>
          và bắt đầu những <em className="font-bold">trải nghiệm</em>
        </p>
      </div>
      <div className=" mt-4 w-80 h-px border border-solid border-main-blue" />
      <div className="mt-4">
        {error !== "" ? <MyErrorMessage>{error}</MyErrorMessage> : ""}
      </div>
      <Formik
        initialValues={{ fullName: "", email: "", username: "", password: "" }}
        onSubmit={(values) => {
          onSubmit({ ...values, avatarBase64: base64EncodedImage });
        }}
        validationSchema={validationSchema}
      >
        {() => (
          <Form className="mt-6 w-full grid grid-cols-1 justify-items-center md:grid-cols-2 md:grid-gap-2">
            <div className="mt-4 w-7/12 ">
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
            <div className="mt-4 w-7/12 md:col-span-2">
              <label
                style={{ fontFamily: "Lora" }}
                className="text-xs font-bold mb-2 uppercase text-grey-darkest"
              >
                Chọn ảnh đại diện:
              </label>
              <MyFileInput handleSetImage={handleSetImage} />
            </div>
            <div className="mt-4 w-7/12" />
            <div className="mt-8 w-4/12 md:col-span-2 h-12">
              <Button
                className="outline:none w-full h-full bg-main-blue opacity-60 hover:opacity-100 transition ease-in-out duration-500 text-white"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress className="text-white" />
                ) : (
                  <p>Đăng ký</p>
                )}
              </Button>
            </div>
            <div className="mt-4 md:col-span-2 mb-6">
              <span className="text-lg">
                Bạn đã có tài khoản?{" "}
                <a
                  className="underline hover:no-underline hover:text-main-pink"
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

export default RegisterForm;
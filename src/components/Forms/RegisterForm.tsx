import { Button } from "@material-ui/core";
import MyErrorMessage from "components/Shared/MyErrorMessage";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import MyRadioButton from "components/Shared/MyRadioButton";
import { Form, Formik } from "formik";
import IRegisterForm from "interfaces/forms/register-form.interface";
import * as React from "react";
import { useState } from "react";
import { FileReaderResultType } from "types";
import * as yup from "yup";
import { MyFileInput } from "../Shared/MyFileInput";
import MyTextField from "../Shared/MyTextField";

interface Props {
  error: string;
  isLoading: boolean;
  onSubmit: (values: IRegisterForm) => void;
}

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object({
  firstName: yup.string().required("Tên là thông tin bắt buộc"),
  lastName: yup.string().required("Họ là thông tin bắt buộc"),
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

  gender: yup.string().required("Giới tính là thông tin bắt buộc"),

  dateOfBirth: yup.date().required("Ngày sinh là thông tin bắt buộc"),

  phoneNumber: yup
    .string()
    .matches(phoneRegExp, "Số điện thoại không hợp lệ.")
    .min(10, "Số điện thoại bao gồm 10 ký tự")
    .max(10, "Số điện thoại bao gồm 10 ký tự"),

  address: yup.string(),
});

const RegisterForm: React.FC<Props> = ({ error, isLoading, onSubmit }) => {
  const [
    base64EncodedImage,
    setBase64EncodedImage,
  ] = useState<FileReaderResultType>("");

  const handleSetImage = (image: FileReaderResultType) => {
    setBase64EncodedImage(image);
  };

  return (
    <div className="my-12 flex flex-col items-center justify-center w-96 md:w-1/2 bg-white border border-gray-200 shadow-2xl rounded-2xl">
      <div className="text-center mt-4">
        <h1 className="text-4xl font-semibold leading-normal mt-0 mb-2 text-secondary">
          Đăng ký
        </h1>
        <p>
          và bắt đầu những <em className="font-bold">trải nghiệm</em>
        </p>
      </div>
      <div className=" mt-4 w-80 h-px border border-solid border-secondary" />
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          username: "",
          password: "",
          gender: "",
          dateOfBirth: "",
          phoneNumber: "",
          address: "",
        }}
        onSubmit={(values) => {
          onSubmit({
            ...values,
            avatarBase64: base64EncodedImage,
            introduction: "",
          });
        }}
        validationSchema={validationSchema}
      >
        {({ values }) => (
          <Form className="mt-6 w-full grid grid-cols-1 justify-items-center md:grid-cols-2 md:grid-gap-2">
            <div className="mt-4 w-7/12 ">
              <MyTextField label="Tên" name="firstName" className="w-full" />
            </div>
            <div className="mt-4 w-7/12 ">
              <MyTextField label="Họ" name="lastName" className="w-full" />
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
            <div className="mt-4 w-7/12">
              <label className="text-xs mb-4 uppercase text-gray-400">
                Giới tính
              </label>
              <div>
                <MyRadioButton
                  name="gender"
                  type="radio"
                  value="male"
                  label="Nam"
                />
                <MyRadioButton
                  name="gender"
                  type="radio"
                  value="female"
                  label="Nữ"
                />
              </div>
            </div>
            <div className="mt-4 w-7/12">
              <MyTextField
                label="Ngày sinh"
                type="date"
                name="dateOfBirth"
                className="w-full"
              />
            </div>
            <div className="mt-4 w-7/12">
              <MyTextField
                label="Số điện thoại"
                type="tel"
                name="phoneNumber"
                className="w-full"
              />
            </div>
            <div className="mt-4 w-7/12">
              <MyTextField label="Địa chỉ" name="address" className="w-full" />
            </div>
            <div className="mt-4 w-7/12 md:col-span-2">
              <label className="text-xs mb-4 uppercase text-gray-400">
                Chọn ảnh đại diện:
              </label>
              <MyFileInput handleSetImage={handleSetImage} />
            </div>
            <div className="mt-4 w-7/12" />
            <div className="mt-8 w-4/12 md:col-span-2 h-12">
              <Button
                className="outline:none w-full h-full bg-secondary text-white"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <MyLoadingIndicator /> : <p>Đăng ký</p>}
              </Button>
            </div>
            <div className="mt-4 md:col-span-2">
              {error !== "" ? <MyErrorMessage>{error}</MyErrorMessage> : ""}
            </div>
            <div className="mt-4 md:col-span-2 mb-6">
              <span className="text-lg">
                Bạn đã có tài khoản?{" "}
                <a className="underline hover:no-underline" href="/login">
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
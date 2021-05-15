import { Button } from "@material-ui/core";
import MyErrorMessage from "components/Shared/MyErrorMessage";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import MyRadioButton from "components/Shared/MyRadioButton";
import MyTextField from "components/Shared/MyTextField";
import { Form, Formik } from "formik";
import IRegisterForm from "interfaces/forms/register-form.interface";
import * as React from "react";
import { useState } from "react";
import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import * as yup from "yup";

interface Props {
  error: string;
  isLoading: boolean;
  onSubmit: (values: IRegisterForm) => void;
}

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
  address: yup.string(),
});

const InsertUserForm: React.FC<Props> = ({ error, isLoading, onSubmit }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  return (
    <div className="mx-72 my-10 bg-white border border-gray-200 shadow-2xl rounded-2xl">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          username: "",
          password: "",
          gender: "",
          dateOfBirth: "",
          address: "",
        }}
        onSubmit={(values) => {
          onSubmit({
            ...values,
            phoneNumber: phoneNumber!,
          });
        }}
        validationSchema={validationSchema}
      >
        {() => (
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
              <MyTextField label="Địa chỉ" name="address" className="w-full" />
            </div>
            <div className="mt-4 w-7/12">
              <label
                htmlFor="phoneNumber"
                className="text-xs mb-4 uppercase text-gray-400"
              >
                Số điện thoại
              </label>
              <div
                className={`border border-gray-300 rounded-md p-2 ${
                  phoneNumberError !== "" ? "border-danger" : ""
                }`}
              >
                <PhoneInput
                  international
                  defaultCountry="VN"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  onBlur={() =>
                    phoneNumber
                      ? isPossiblePhoneNumber(phoneNumber)
                        ? setPhoneNumberError("")
                        : setPhoneNumberError("Số điện thoại không hợp lệ ")
                      : setPhoneNumberError(
                          "Số điện thoại là thông tin bắt buộc"
                        )
                  }
                />
              </div>
              <div className="text-sm text-danger mt-2">{phoneNumberError}</div>
            </div>
            <div className="mt-8 w-4/12 md:col-span-2 h-12">
              <Button
                className="outline:none w-full h-full bg-secondary text-white"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <MyLoadingIndicator /> : <p>Add</p>}
              </Button>
            </div>
            <div className="my-4 md:col-span-2">
              {error !== "" ? <MyErrorMessage>{error}</MyErrorMessage> : ""}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default InsertUserForm;

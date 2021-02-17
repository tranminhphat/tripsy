import * as React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";

import MyTextField from "components/Shared/MyTextField";
import Button from "@material-ui/core/Button";
import MyErrorMessage from "components/Shared/MyErrorMessage";

interface Props {
  error: string;
  onSubmit: (values: { email: string }) => void;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .required("Email là thông tin bắt buộc")
    .email("Email không hợp lệ"),
});

const ForgotPasswordForm: React.FC<Props> = ({ error, onSubmit }) => {
  return (
    <div className="my-32 flex flex-col items-center justify-center w-96 bg-white shadow-lg rounded-2xl">
      <div className="text-center mt-4">
        <h3
          style={{ fontFamily: "GT Walsheim Bold" }}
          className="text-2xl font-semibold leading-normal mt-0 mb-2 text-main-blue"
        >
          Nhập địa chỉ email của bạn
        </h3>
      </div>
      <div className="mt-4 w-80 h-px border border-solid border-main-blue" />
      <div className="mt-4">
        {error !== "" ? <MyErrorMessage>{error}</MyErrorMessage> : ""}
      </div>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={(values) => onSubmit(values)}
        validationSchema={validationSchema}
      >
        {() => (
          <Form className="mt-6 w-full flex flex-col items-center justify-center">
            <div className="mt-4 w-9/12">
              <MyTextField className="w-full" name="email" label="Email" />
            </div>
            <div className="mt-12 w-4/12 h-12">
              <Button
                className="w-full h-full bg-main-blue opacity-60 hover:opacity-100 transition ease-in-out duration-500 text-white"
                type="submit"
              >
                Tiếp tục
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPasswordForm;

import * as React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";

import MyTextField from "components/Shared/MyTextField";
import Button from "@material-ui/core/Button";
import MyErrorMessage from "components/Shared/MyErrorMessage";

interface Props {
  error: string;
  onSubmit: (newPassword: string) => void;
}

const validationSchema = yup.object({
  password: yup.string().required("Mật khẩu là thông tin bắt buộc "),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Mật khẩu xác nhận không trùng khớp "),
});

const ResetPasswordForm: React.FC<Props> = ({ error, onSubmit }) => {
  return (
    <div className="my-32 flex flex-col items-center justify-center w-96 bg-white shadow-lg rounded-2xl">
      <div className="text-center mt-4">
        <h3 className="text-2xl font-normal leading-normal mt-0 mb-2 text-green-600">
          Nhập một mật khẩu mới
        </h3>
      </div>
      <div className="mt-4 w-80 h-px border border-solid border-green-600" />
      <div className="mt-4">
        {error !== "" ? <MyErrorMessage>{error}</MyErrorMessage> : ""}
      </div>
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        onSubmit={(values) => {
          onSubmit(values.password);
        }}
        validationSchema={validationSchema}
      >
        {() => (
          <Form className="mt-6 w-full flex flex-col items-center justify-center">
            <div className="mt-4 w-9/12">
              <MyTextField
                className="w-full"
                name="password"
                type="password"
                label="Mật khẩu"
              />
            </div>
            <div className="mt-4 w-9/12">
              <MyTextField
                className="w-full"
                name="confirmPassword"
                type="password"
                label="Xác nhận mật khẩu"
              />
            </div>
            <div className="mt-12 w-4/12 h-12">
              <Button
                className="w-full h-full focus:outline-none bg-green-500 hover:bg-green-700 text-white"
                type="submit"
              >
                Đổi mật khẩu
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPasswordForm;

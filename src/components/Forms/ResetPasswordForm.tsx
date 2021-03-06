import Button from "@material-ui/core/Button";
import MyErrorMessage from "components/Shared/MyErrorMessage";
import MyTextField from "components/Shared/MyTextField";
import { Form, Formik } from "formik";
import * as React from "react";
import * as yup from "yup";

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
    <div className="my-20 flex flex-col items-center justify-center w-96 bg-white border border-gray-200 shadow-2xl rounded-2xl">
      <div className="text-center mt-8">
        <h3 className="text-2xl font-semibold leading-normal my-2 text-secondary">
          Nhập một mật khẩu mới
        </h3>
      </div>
      <div className="mt-4 w-80 h-px border border-solid border-secondary" />
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
                className="outline:none w-full h-full bg-primary text-white"
                type="submit"
              >
                Đổi mật khẩu
              </Button>
            </div>
            <div className="mt-4 mb-6">
              {error !== "" ? <MyErrorMessage>{error}</MyErrorMessage> : ""}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPasswordForm;

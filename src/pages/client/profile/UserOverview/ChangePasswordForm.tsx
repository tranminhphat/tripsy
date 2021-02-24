import { Button } from "@material-ui/core";
import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import MyTextField from "components/Shared/MyTextField";

interface Props {
  onSubmit: (values) => void;
  onDone: () => void;
}

const validationSchema = yup.object({
  newPassword: yup.string().required("Mật khẩu là thông tin bắt buộc "),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("newPassword"), null],
      "Mật khẩu xác nhận không trùng khớp "
    ),
});

const ChangePasswordForm: React.FC<Props> = ({ onSubmit, onDone }) => {
  return (
    <div>
      <Formik
        initialValues={{
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        onSubmit={(values) => {
          onSubmit(values);
        }}
        validationSchema={validationSchema}
      >
        {() => (
          <Form className="flex flex-col">
            <div>
              <div>
                <MyTextField
                  label="Mật khẩu mới"
                  type="password"
                  name="newPassword"
                  className="w-full"
                />
              </div>
              <div>
                <MyTextField
                  label="Xác nhận mật khẩu"
                  type="password"
                  name="confirmPassword"
                  className="w-full"
                />
              </div>
            </div>
            <div className="self-center mt-4">
              <Button type="submit" className="bg-main-blue text-white">
                Cập nhật
              </Button>
              <Button
                onClick={() => onDone()}
                className="ml-3"
                variant="contained"
                color="secondary"
              >
                Xong
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePasswordForm;

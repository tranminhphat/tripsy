import Button from "@material-ui/core/Button";
import MyErrorMessage from "components/Shared/MyErrorMessage";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import MyTextField from "components/Shared/MyTextField";
import { Form, Formik } from "formik";
import * as React from "react";
import * as yup from "yup";

interface Props {
  isLoading: boolean;
  error: string;
  onSubmit: (values: { email: string }) => void;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .required("Email là thông tin bắt buộc")
    .email("Email không hợp lệ"),
});

const ForgotPasswordForm: React.FC<Props> = ({
  isLoading,
  error,
  onSubmit,
}) => {
  return (
    <div className="my-32 flex flex-col items-center justify-center w-96 bg-white border border-gray-200 shadow-2xl rounded-2xl">
      <div className="text-center mt-8">
        <h3 className="text-2xl font-semibold leading-normal my-2 text-main-blue">
          Nhập địa chỉ email của bạn
        </h3>
      </div>
      <div className="mt-4 w-80 h-px border border-solid border-main-blue" />
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
            <div className="mt-8 w-4/12 h-12">
              <Button
                className="outline:none w-full h-full overflow-hidden bg-secondary-blue text-white"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <MyLoadingIndicator /> : <p>Tiếp tục</p>}
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

export default ForgotPasswordForm;

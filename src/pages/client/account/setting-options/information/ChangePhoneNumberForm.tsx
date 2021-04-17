import Button from "@material-ui/core/Button";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import MyTextField from "components/Shared/MyTextField";
import { Form, Formik } from "formik";
import useUpdateUser from "hooks/mutations/users/useUpdateUser";
import * as React from "react";
import * as yup from "yup";

interface Props {
  userId: string;
  initialValues: { phoneNumber: string };
}

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object({
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, "Số điện thoại không hợp lệ.")
    .min(10, "Số điện thoại bao gồm 10 ký tự")
    .max(10, "Số điện thoại bao gồm 10 ký tự"),
});

const ChangeNameForm: React.FC<Props> = ({ userId, initialValues }) => {
  const userMutation = useUpdateUser();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        userMutation.mutate({ userId, values });
      }}
      validationSchema={validationSchema}
    >
      {() => (
        <Form>
          <div className="w-full">
            <MyTextField type="tel" name="phoneNumber" className="w-full" />
          </div>
          <div className="mt-4">
            <Button
              type="submit"
              variant="contained"
              className="bg-primary overflow-hidden text-white"
              style={{ width: "80px", height: "40px" }}
            >
              {!userMutation.isLoading ? "Lưu" : <MyLoadingIndicator />}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ChangeNameForm;

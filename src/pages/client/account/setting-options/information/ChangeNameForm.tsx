import Button from "@material-ui/core/Button";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import MyTextField from "components/Shared/MyTextField";
import { Form, Formik } from "formik";
import useUserUpdate from "hooks/mutations/users/useUserUpdate";
import * as React from "react";
import * as yup from "yup";

interface Props {
  userId: string;
  initialValues: { firstName: string; lastName: string };
}

const validationSchema = yup.object({
  firstName: yup.string().required("Tên là thông tin bắt buộc"),
  lastName: yup.string().required("Họ là thông tin bắt buộc"),
});

const ChangeNameForm: React.FC<Props> = ({ userId, initialValues }) => {
  const userMutation = useUserUpdate();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        userMutation.mutate({ userId, ...values });
      }}
      validationSchema={validationSchema}
    >
      {() => (
        <Form>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 md:gap-8">
            <div>
              <MyTextField label="Tên" name="firstName" className="w-full" />
            </div>
            <div>
              <MyTextField label="Họ" name="lastName" className="w-full" />
            </div>
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

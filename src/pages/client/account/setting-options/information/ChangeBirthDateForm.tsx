import Button from "@material-ui/core/Button";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import MyTextField from "components/Shared/MyTextField";
import { Form, Formik } from "formik";
import { useUpdateUser } from "hooks/mutations/users";
import * as React from "react";
import * as yup from "yup";

interface Props {
  userId: string;
  initialValues: { dateOfBirth: string };
}

const validationSchema = yup.object({
  dateOfBirth: yup.date().required("Ngày sinh là thông tin bắt buộc"),
});

const ChangeBirthDateForm: React.FC<Props> = ({ userId, initialValues }) => {
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
          <div className="w-full grid grid-cols-1 md:grid-cols-2 md:gap-8">
            <div>
              <MyTextField type="date" name="dateOfBirth" className="w-full" />
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

export default ChangeBirthDateForm;

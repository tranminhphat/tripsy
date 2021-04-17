import Button from "@material-ui/core/Button";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import MyTextField from "components/Shared/MyTextField";
import { Form, Formik } from "formik";
import { useUpdateUser } from "hooks/mutations/users";
import * as React from "react";
import * as yup from "yup";

interface Props {
  userId: string;
  initialValues: { address: string };
}

const validationSchema = yup.object({
  address: yup.string(),
});

const ChangeAddressForm: React.FC<Props> = ({ userId, initialValues }) => {
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
            <MyTextField name="address" className="w-full" />
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

export default ChangeAddressForm;

import { CircularProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { updateUserById } from "api/users";
import MyTextField from "components/Shared/MyTextField";
import { Form, Formik } from "formik";
import * as React from "react";
import { useState } from "react";
import * as yup from "yup";

interface Props {
  userId: string;
  initialValues: { address: string };
}

const validationSchema = yup.object({
  address: yup.string(),
});

const ChangeAddressForm: React.FC<Props> = ({ userId, initialValues }) => {
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleOnSubmit = async (values: { address: string }) => {
    setButtonLoading(true);
    const { data } = await updateUserById(userId, values);
    if (data) {
      setButtonLoading(false);
      window.location.reload();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        handleOnSubmit(values);
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
              className="bg-secondary-blue text-white"
            >
              {!buttonLoading ? (
                "Lưu"
              ) : (
                <CircularProgress className="text-white" />
              )}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ChangeAddressForm;

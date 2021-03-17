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
  initialValues: { firstName: string; lastName: string };
}

const validationSchema = yup.object({
  firstName: yup.string().required("Tên là thông tin bắt buộc"),
  lastName: yup.string().required("Họ là thông tin bắt buộc"),
});

const ChangeNameForm: React.FC<Props> = ({ userId, initialValues }) => {
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleOnSubmit = async (values: {
    firstName: string;
    lastName: string;
  }) => {
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
      {({ values }) => (
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

export default ChangeNameForm;

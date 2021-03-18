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
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleOnSubmit = async (values: { phoneNumber: string }) => {
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
            <MyTextField type="tel" name="phoneNumber" className="w-full" />
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

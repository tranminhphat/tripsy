import { CircularProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { updateUserById } from "api/users";
import MyRadioButton from "components/Shared/MyRadioButton";
import { Form, Formik } from "formik";
import * as React from "react";
import { useState } from "react";
import * as yup from "yup";

interface Props {
  userId: string;
  initialValues: { gender: string };
}

const validationSchema = yup.object({
  gender: yup.string().required("Giới tính là thông tin bắt buộc"),
});

const ChangeGenderForm: React.FC<Props> = ({ userId, initialValues }) => {
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleOnSubmit = async (values: { gender: string }) => {
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
          <div className="w-full grid grid-cols-1 md:grid-cols-2 md:gap-8">
            <div>
              <label className="text-xs mb-4 uppercase text-gray-400">
                Giới tính
              </label>
              <div>
                <MyRadioButton
                  name="gender"
                  type="radio"
                  value="male"
                  label="Nam"
                />
                <MyRadioButton
                  name="gender"
                  type="radio"
                  value="female"
                  label="Nữ"
                />
              </div>
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

export default ChangeGenderForm;

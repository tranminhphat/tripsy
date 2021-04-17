import Button from "@material-ui/core/Button";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import MyRadioButton from "components/Shared/MyRadioButton";
import { Form, Formik } from "formik";
import useUpdateUser from "hooks/mutations/users/useUpdateUser";
import * as React from "react";
import * as yup from "yup";

interface Props {
  userId: string;
  initialValues: { gender: string };
}

const validationSchema = yup.object({
  gender: yup.string().required("Giới tính là thông tin bắt buộc"),
});

const ChangeGenderForm: React.FC<Props> = ({ userId, initialValues }) => {
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

export default ChangeGenderForm;

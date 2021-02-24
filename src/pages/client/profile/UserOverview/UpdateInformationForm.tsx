import { Button } from "@material-ui/core";
import React from "react";
import { Formik, Form } from "formik";
import { IUpdateUserData } from "interfaces/users/user.interface";
import MyRadioButton from "components/Shared/MyRadioButton";
import MyTextField from "components/Shared/MyTextField";

interface Props {
  initialValues: IUpdateUserData;
  onSubmit: (values: IUpdateUserData) => void;
  onDone: () => void;
}

const UpdateInformationForm: React.FC<Props> = ({
  initialValues,
  onSubmit,
  onDone,
}) => {
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          onSubmit(values);
        }}
      >
        {() => (
          <Form className="flex flex-col">
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
              <div>
                <MyTextField
                  label="Số điện thoại"
                  type="tel"
                  name="phoneNumber"
                  className="w-full"
                />
              </div>
              <div>
                <MyTextField
                  label="Địa chỉ"
                  name="address"
                  className="w-full"
                />
              </div>
            </div>
            <div className="self-center mt-4">
              <Button type="submit" className="bg-main-blue text-white">
                Cập nhật
              </Button>
              <Button
                onClick={() => onDone()}
                className="ml-3"
                variant="contained"
                color="secondary"
              >
                Xong
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateInformationForm;

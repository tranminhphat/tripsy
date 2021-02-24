import { Button } from "@material-ui/core";
import MyCheckbox from "components/Shared/MyCheckbox";
import React from "react";
import { Formik, Form } from "formik";
import { IDisplayedUserData } from "interfaces/users/user.interface";

interface Props {
  initialValues: IDisplayedUserData;
  onSubmit: (values: IDisplayedUserData) => void;
  onDone: () => void;
}

const DisplayedInformationForm: React.FC<Props> = ({
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
              <MyCheckbox name="email" type="checkbox" label="Email" />
            </div>
            <div>
              <MyCheckbox name="gender" type="checkbox" label="Giới tính" />
            </div>
            <div>
              <MyCheckbox
                name="phoneNumber"
                type="checkbox"
                label="Số điện thoại"
              />
            </div>
            <div>
              <MyCheckbox name="address" type="checkbox" label="Địa chỉ" />
            </div>
            <div>
              <MyCheckbox
                name="dateOfBirth"
                type="checkbox"
                label="Ngày sinh"
              />
            </div>
            <div className="self-center">
              <Button type="submit" className="bg-main-blue text-white">
                Cập nhật
              </Button>
              <Button
                onClick={() => onDone()}
                className="ml-3"
                color="secondary"
                variant="contained"
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

export default DisplayedInformationForm;

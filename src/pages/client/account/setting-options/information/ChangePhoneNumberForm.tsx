import Button from "@material-ui/core/Button";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import { Form, Formik } from "formik";
import { useUpdateUser } from "hooks/mutations/users";
import * as React from "react";
import { useState } from "react";
import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";

interface Props {
  userId: string;
  initialValues: { phoneNumber: string };
}

const ChangeNameForm: React.FC<Props> = ({ userId, initialValues }) => {
  const userMutation = useUpdateUser();
  const [phoneNumber, setPhoneNumber] = useState(initialValues.phoneNumber);
  const [phoneNumberError, setPhoneNumberError] = useState("");

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={() => {
        userMutation.mutate({ userId, values: { phoneNumber } });
      }}
    >
      {() => (
        <Form>
          <div className="w-full">
            <div
              className={`border border-gray-300 rounded-md p-2 ${
                phoneNumberError !== "" ? "border-danger" : ""
              }`}
            >
              <PhoneInput
                international
                defaultCountry="VN"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={setPhoneNumber}
                onBlur={() =>
                  phoneNumber
                    ? isPossiblePhoneNumber(phoneNumber)
                      ? setPhoneNumberError("")
                      : setPhoneNumberError("Số điện thoại không hợp lệ ")
                    : setPhoneNumberError("Số điện thoại là thông tin bắt buộc")
                }
              />
            </div>
            <div className="text-sm text-danger mt-2">{phoneNumberError}</div>
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

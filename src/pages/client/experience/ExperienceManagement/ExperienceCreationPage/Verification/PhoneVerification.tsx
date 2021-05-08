import { Button, Typography } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { createPhoneVerification, sendVerifyToken } from "api/vonage";
import MyModal from "components/Shared/MyModal";
import AlertContext from "contexts/AlertContext";
import { useUpdateUser } from "hooks/mutations/users";
import { IUser } from "interfaces/users/user.interface";
import * as React from "react";
import { useContext, useState } from "react";
import PhoneInput from "react-phone-number-input";

interface Props {
  userData: IUser;
}

const PhoneVerification: React.FC<Props> = ({ userData }) => {
  const updateUser = useUpdateUser();
  const { alert } = useContext(AlertContext);
  const [verifyId, setVerifyId] = useState("");
  const [verifyToken, setVerifyToken] = useState("");
  const [openVerifyPhoneNumberModal, setOpenVerifyPhoneNumberModal] = useState(
    false
  );

  return (
    <div className="max-w-xl my-8 text-justify mx-auto">
      <>
        <h1 className="text-4xl font-bold">Xác nhận số điện thoại của bạn</h1>
        <p className="my-4 text-lg text-gray-500">
          Hãy xác thực số điện thoại để đảm bảo danh tính của bạn.
        </p>
        <div>
          <label
            htmlFor="phoneNumber"
            className="text-xs mb-4 uppercase text-gray-400"
          >
            Số điện thoại
          </label>
          <div className="flex items-center">
            <div className="border border-gray-300 rounded-md p-2">
              <PhoneInput
                international
                defaultCountry="VN"
                placeholder="Enter phone number"
                value={userData.phoneNumber}
                disabled={true}
              />
            </div>
            <div className="ml-4">
              {userData.isPhoneVerified ? (
                <p>
                  <CheckCircleIcon className="text-success mr-2" />
                  Số điện thoại này đã được xác minh
                </p>
              ) : (
                <Button
                  onClick={async () => {
                    const {
                      data: { id },
                    } = await createPhoneVerification(userData.phoneNumber!);
                    setVerifyId(id);
                    setOpenVerifyPhoneNumberModal(true);
                  }}
                  className="bg-black text-white"
                  variant="outlined"
                >
                  Xác thực
                </Button>
              )}
            </div>
          </div>
        </div>
        <MyModal
          size="lg"
          open={openVerifyPhoneNumberModal}
          setOpen={setOpenVerifyPhoneNumberModal}
        >
          {{
            header: (
              <Typography className="text-xl font-bold">
                Xác thực số điện thoại
              </Typography>
            ),
            content: (
              <div className="flex items-center mt-4 px-4">
                <div>
                  <Typography className="text-lg">
                    Chúng tôi đã gửi vào số điện thoại{" "}
                    <b>{userData.phoneNumber}</b> một mã xác thực
                  </Typography>
                  <div className="mt-4 flex justify-between items-center">
                    <Typography className="text-lg">
                      Vui lòng nhập mã vào đây:
                    </Typography>
                    <input
                      className="ml-2 p-2 border border-gray-300"
                      type="text"
                      value={verifyToken}
                      onChange={(e) => setVerifyToken(e.target.value)}
                    />
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="contained"
                      className="bg-secondary text-white"
                      onClick={async () => {
                        try {
                          const {
                            data: { response },
                          } = await sendVerifyToken(verifyId, verifyToken);
                          if (response.status === "0") {
                            updateUser.mutate({
                              userId: userData._id,
                              values: { isPhoneVerified: true },
                            });
                            setVerifyToken("");
                            setOpenVerifyPhoneNumberModal(false);
                            alert("success", "Xác thực thành công");
                          } else {
                            alert("error", "Mã xác thực không hợp lệ");
                          }
                        } catch (err) {
                          alert("error", "Mã xác thực không hợp lệ");
                        }
                      }}
                    >
                      Xác thực
                    </Button>
                  </div>
                </div>
              </div>
            ),
          }}
        </MyModal>
      </>
    </div>
  );
};

export default PhoneVerification;

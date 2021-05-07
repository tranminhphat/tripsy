import { Button, Tooltip, Typography } from "@material-ui/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import MyBreadcrumbs from "components/Shared/MyBreadcrumbs";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import MyModal from "components/Shared/MyModal";
import { useCurrentUser } from "hooks/queries/users";
import MainLayout from "layouts/MainLayout";
import * as React from "react";
import { useState } from "react";
import ChangeAddressForm from "./ChangeAddressForm";
import ChangeBirthDateForm from "./ChangeBirthDateForm";
import ChangeGenderForm from "./ChangeGenderForm";
import ChangeNameForm from "./ChangeNameForm";
import ChangePhoneNumberForm from "./ChangePhoneNumberForm";

interface Props {}

const InfoSettingPage: React.FC<Props> = () => {
  const { data: userData } = useCurrentUser();
  const [openNameForm, setOpenNameForm] = useState(false);
  const [openGenderForm, setOpenGenderForm] = useState(false);
  const [openAddressForm, setOpenAddressFrom] = useState(false);
  const [openBirthDateForm, setOpenBirthDateForm] = useState(false);
  const [opnePhoneNumberForm, setopenPhoneNumberForm] = useState(false);
  const [openVerifyPhoneNumberModal, setOpenVerifyPhoneNumberModal] = useState(
    false
  );

  return (
    <MainLayout>
      <div className="container mx-auto px-40">
        <MyBreadcrumbs
          linkArray={[
            {
              path: "/account-settings",
              name: "Tài khoản",
            },
            {
              path: "/account-settings/personal-info",
              name: "Thông tin cá nhân",
            },
          ]}
        />
        {userData ? (
          <>
            <div className="my-4">
              <h1 className="text-4xl font-bold text-secondary">
                Thông tin cá nhân
              </h1>
            </div>
            <div className="mt-16 max-w-xl">
              <div className="flex justify-between">
                <h3 className="text-lg font-bold text-secondary">
                  Tên pháp lý
                </h3>
                <button onClick={() => setOpenNameForm(!openNameForm)}>
                  <p className="font-bold text-primary hover:underline">
                    {openNameForm ? "Hủy" : "Chỉnh sửa"}
                  </p>
                </button>
              </div>
              <div className="mt-2 mb-4">
                {!openNameForm ? (
                  <p className="text-xl">
                    {userData.lastName} {userData.firstName}
                  </p>
                ) : (
                  <ChangeNameForm
                    userId={userData._id as string}
                    initialValues={{
                      firstName: userData.firstName as string,
                      lastName: userData.lastName as string,
                    }}
                  />
                )}
              </div>
              <div>
                <hr />
              </div>
              <div className="flex justify-between mt-4">
                <h3 className="text-lg font-bold text-secondary">Giới tính</h3>
                <button onClick={() => setOpenGenderForm(!openGenderForm)}>
                  <p className="font-bold text-primary hover:underline">
                    {openGenderForm ? "Hủy" : "Chỉnh sửa"}
                  </p>
                </button>
              </div>
              <div className="mt-2 mb-4">
                {!openGenderForm ? (
                  <p className="text-xl">
                    {userData.gender === "male"
                      ? "Nam"
                      : userData.gender
                      ? "Nữ"
                      : "Khác"}
                  </p>
                ) : (
                  <ChangeGenderForm
                    userId={userData._id as string}
                    initialValues={{ gender: userData.gender as string }}
                  />
                )}
              </div>
              <div>
                <hr />
              </div>
              <div className="flex justify-between mt-4">
                <h3 className="text-lg font-bold text-secondary">Ngày sinh</h3>
                <button
                  onClick={() => setOpenBirthDateForm(!openBirthDateForm)}
                >
                  <p className="font-bold text-primary hover:underline">
                    {openBirthDateForm ? "Hủy" : "Chỉnh sửa"}
                  </p>
                </button>
              </div>
              <div className="mt-2 mb-4">
                {!openBirthDateForm ? (
                  <p className="text-xl">
                    Ngày {userData.dateOfBirth?.slice(8, 10)} tháng{" "}
                    {userData.dateOfBirth?.slice(5, 7)} năm{" "}
                    {userData.dateOfBirth?.slice(0, 4)}
                  </p>
                ) : (
                  <ChangeBirthDateForm
                    userId={userData._id as string}
                    initialValues={{
                      dateOfBirth: userData.dateOfBirth as string,
                    }}
                  />
                )}
              </div>
              <div>
                <hr />
              </div>
              <div className="flex justify-between mt-4">
                <h3 className="text-lg font-bold text-secondary">
                  Số điện thoại{" "}
                  {!userData.isPhoneVerified ? (
                    <Tooltip
                      className="ml-2"
                      title="Số điện thoại chưa được xác thực"
                    >
                      <ErrorOutlineIcon className="text-danger text-md" />
                    </Tooltip>
                  ) : (
                    ""
                  )}
                </h3>
                <button
                  onClick={() => setopenPhoneNumberForm(!opnePhoneNumberForm)}
                >
                  <p className="font-bold text-primary hover:underline">
                    {opnePhoneNumberForm ? "Hủy" : "Chỉnh sửa"}
                  </p>
                </button>
              </div>
              <div className="mt-2 mb-4">
                {!opnePhoneNumberForm ? (
                  <div className="flex items-center">
                    <p className="text-xl">{userData.phoneNumber}</p>
                    <button
                      onClick={() => setOpenVerifyPhoneNumberModal(true)}
                      className="ml-4"
                    >
                      <p className="text-sm text-gray-500 underline hover:no-underline">
                        {!userData.isPhoneVerified
                          ? "Xác thực số điện thoại này"
                          : ""}
                      </p>
                    </button>
                  </div>
                ) : (
                  <ChangePhoneNumberForm
                    userId={userData._id as string}
                    initialValues={{
                      phoneNumber: userData.phoneNumber as string,
                    }}
                  />
                )}
              </div>
              <div>
                <hr />
              </div>
              <div className="flex justify-between mt-4">
                <h3 className="text-lg font-bold text-secondary">Địa chỉ</h3>
                <button onClick={() => setOpenAddressFrom(!openAddressForm)}>
                  <p className="font-bold text-primary hover:underline">
                    {openAddressForm ? "Hủy" : "Chỉnh sửa"}
                  </p>
                </button>
              </div>
              <div className="mt-2 mb-4">
                {!openAddressForm ? (
                  <p className="text-xl">{userData.address}</p>
                ) : (
                  <ChangeAddressForm
                    userId={userData._id as string}
                    initialValues={{ address: userData.address as string }}
                  />
                )}
              </div>
              <div>
                <hr />
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
                          />
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Button
                            variant="contained"
                            className="bg-secondary text-white"
                          >
                            Xác thực
                          </Button>
                        </div>
                      </div>
                    </div>
                  ),
                }}
              </MyModal>
            </div>
          </>
        ) : (
          <div className="flex-grow justify-center items-center">
            <MyLoadingIndicator width={300} height={300} />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default InfoSettingPage;

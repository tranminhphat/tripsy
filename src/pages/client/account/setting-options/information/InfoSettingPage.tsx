import CircularProgress from "@material-ui/core/CircularProgress";
import { getCurrentUser } from "api/users";
import MyBreadcrumbs from "components/Shared/MyBreadcrumbs";
import { IUser } from "interfaces/users/user.interface";
import MainLayout from "layouts/MainLayout";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ChangeAddressForm from "./ChangeAddressForm";
import ChangeBirthDateForm from "./ChangeBirthDateForm";
import ChangeGenderForm from "./ChangeGenderForm";
import ChangeNameForm from "./ChangeNameForm";
import ChangePhoneNumberForm from "./ChangePhoneNumberForm";

interface Props {}

const InfoSettingPage: React.FC<Props> = () => {
  const [userData, setUserData] = useState<IUser>();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [openNameForm, setOpenNameForm] = useState(false);
  const [openGenderForm, setOpenGenderForm] = useState(false);
  const [openAddressForm, setOpenAddressFrom] = useState(false);
  const [openBirthDateForm, setOpenBirthDateForm] = useState(false);
  const [opnePhoneNumberForm, setopenPhoneNumberForm] = useState(false);

  useEffect(() => {
    console.log("here");
    fetchUserInfoData();
  }, []);

  const fetchUserInfoData = async () => {
    const {
      data: { user },
    } = await getCurrentUser([
      "_id",
      "firstName",
      "lastName",
      "gender",
      "dateOfBirth",
      "phoneNumber",
      "address",
      "isIdVerified",
    ]);
    if (user) {
      setUserData(user);
    }
  };

  return (
    <MainLayout withSearchBar={false}>
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
              <h1 className="text-4xl font-bold text-main-blue">
                Thông tin cá nhân
              </h1>
            </div>
            <div className="mt-16 max-w-xl">
              <div className="flex justify-between">
                <h3 className="text-lg font-bold text-main-blue">
                  Tên pháp lý
                </h3>
                <button onClick={() => setOpenNameForm(!openNameForm)}>
                  <p className="text-lg font-bold text-secondary-blue hover:underline">
                    {openNameForm ? "Hủy" : "Chỉnh sửa"}
                  </p>
                </button>
              </div>
              <div className="mt-2 mb-4">
                {!openNameForm ? (
                  <p className="text-xl">
                    {userData.firstName} {userData.lastName}
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
                <h3 className="text-lg font-bold text-main-blue">Giới tính</h3>
                <button onClick={() => setOpenGenderForm(!openGenderForm)}>
                  <p className="text-lg font-bold text-secondary-blue hover:underline">
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
                <h3 className="text-lg font-bold text-main-blue">Ngày sinh</h3>
                <button
                  onClick={() => setOpenBirthDateForm(!openBirthDateForm)}
                >
                  <p className="text-lg font-bold text-secondary-blue hover:underline">
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
                <h3 className="text-lg font-bold text-main-blue">
                  Số điện thoại
                </h3>
                <button
                  onClick={() => setopenPhoneNumberForm(!opnePhoneNumberForm)}
                >
                  <p className="text-lg font-bold text-secondary-blue hover:underline">
                    {opnePhoneNumberForm ? "Hủy" : "Chỉnh sửa"}
                  </p>
                </button>
              </div>
              <div className="mt-2 mb-4">
                {!opnePhoneNumberForm ? (
                  <p className="text-xl">{userData.phoneNumber}</p>
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
                <h3 className="text-lg font-bold text-main-blue">Địa chỉ</h3>
                <button onClick={() => setOpenAddressFrom(!openAddressForm)}>
                  <p className="text-lg font-bold text-secondary-blue hover:underline">
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
              <div className="flex justify-between mt-4">
                <h3 className="text-lg font-bold text-main-blue">
                  Giấy tờ tùy thân do chính phủ cấp
                </h3>
                <Link to="/account-settings/personal-info/update-id">
                  <p className="text-lg font-bold text-secondary-blue hover:underline">
                    {userData.isIdVerified ? "Cập nhật" : "Thêm"}
                  </p>
                </Link>
              </div>
              <div className="mt-2 mb-4">
                {userData.isIdVerified ? (
                  <p className="text-xl">Đã cung cấp giấy tờ tùy thân</p>
                ) : (
                  <p className="text-xl">Chưa cung cấp giấy tờ tùy thân</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center">
            <CircularProgress />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default InfoSettingPage;

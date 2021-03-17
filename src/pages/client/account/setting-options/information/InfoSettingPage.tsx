import CircularProgress from "@material-ui/core/CircularProgress";
import { getCurrentUser } from "api/users";
import MyBreadcrumbs from "components/Shared/MyBreadcrumbs";
import { IUserResponse } from "interfaces/users/user.interface";
import MainLayout from "layouts/MainLayout";
import * as React from "react";
import { useEffect, useState } from "react";
import ChangeNameForm from "./ChangeNameForm";

interface Props {}

const InfoSettingPage: React.FC<Props> = () => {
  const [userData, setUserData] = useState<IUserResponse>();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [openNameForm, setOpenNameForm] = useState(false);

  useEffect(() => {
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
                <button onClick={() => setIsFormOpen(!isFormOpen)}>
                  <p className="text-lg font-bold text-secondary-blue hover:underline">
                    {isFormOpen ? "Hủy" : "Chỉnh sửa"}
                  </p>
                </button>
              </div>
              <div className="mt-2 mb-4">
                <p className="text-xl">
                  {userData.gender === "male"
                    ? "Nam"
                    : userData.gender
                    ? "Nữ"
                    : "Khác"}
                </p>
              </div>
              <div>
                <hr />
              </div>
              <div className="flex justify-between mt-4">
                <h3 className="text-lg font-bold text-main-blue">Ngày sinh</h3>
                <button onClick={() => setIsFormOpen(!isFormOpen)}>
                  <p className="text-lg font-bold text-secondary-blue hover:underline">
                    {isFormOpen ? "Hủy" : "Chỉnh sửa"}
                  </p>
                </button>
              </div>
              <div className="mt-2 mb-4">
                <p className="text-xl">
                  Ngày {userData.dateOfBirth?.slice(8, 10)} tháng{" "}
                  {userData.dateOfBirth?.slice(5, 7)} năm{" "}
                  {userData.dateOfBirth?.slice(0, 4)}
                </p>
              </div>
              <div>
                <hr />
              </div>
              <div className="flex justify-between mt-4">
                <h3 className="text-lg font-bold text-main-blue">
                  Số điện thoại
                </h3>
                <button onClick={() => setIsFormOpen(!isFormOpen)}>
                  <p className="text-lg font-bold text-secondary-blue hover:underline">
                    {isFormOpen ? "Hủy" : "Chỉnh sửa"}
                  </p>
                </button>
              </div>
              <div className="mt-2 mb-4">
                <p className="text-xl">{userData.phoneNumber}</p>
              </div>
              <div>
                <hr />
              </div>
              <div className="flex justify-between mt-4">
                <h3 className="text-lg font-bold text-main-blue">Địa chỉ</h3>
                <button onClick={() => setIsFormOpen(!isFormOpen)}>
                  <p className="text-lg font-bold text-secondary-blue hover:underline">
                    {isFormOpen ? "Hủy" : "Chỉnh sửa"}
                  </p>
                </button>
              </div>
              <div className="mt-2 mb-4">
                <p className="text-xl">{userData.address}</p>
              </div>
              <div>
                <hr />
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

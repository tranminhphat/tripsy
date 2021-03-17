import CircularProgress from "@material-ui/core/CircularProgress";
import { getCurrentUser } from "api/users";
import { accountSettingOptions } from "constants/index";
import { IUserResponse } from "interfaces/users/user.interface";
import MainLayout from "layouts/MainLayout";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Props {}

const AccountPage: React.FC<Props> = () => {
  const [userData, setUserData] = useState<IUserResponse>();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const {
      data: { user },
    } = await getCurrentUser(["_id", "firstName", "lastName", "email"]);
    setUserData(user);
  };
  return (
    <MainLayout withSearchBar={false}>
      {userData ? (
        <div className="container mx-auto px-40">
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold">Tài khoản</h1>
            <p className="text-lg mt-2">
              <strong>
                {userData.firstName} {userData.lastName},{" "}
              </strong>
              <span>{userData.email} - </span>
              <Link
                className="font-bold text-main-blue hover:underline"
                to={`/user/profile/${userData ? userData._id : ""}`}
              >
                Truy cập hồ sơ
              </Link>
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-3">
            {accountSettingOptions.map((setting) => (
              <div
                key={setting.id}
                className="shadow-xl border border-gray-200 rounded-xl"
              >
                <Link className="w-full h-full" to={setting.url}>
                  <div className="p-8 flex flex-col">
                    <div>
                      <img src={setting.icon} alt="settings" />
                    </div>
                    <div>
                      <h3 className="mt-2 text-2xl font-bold text-main-blue">
                        {setting.title}
                      </h3>
                    </div>
                    <div>
                      <p className="mt-2 text-lg">{setting.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <CircularProgress />
        </div>
      )}
    </MainLayout>
  );
};

export default AccountPage;

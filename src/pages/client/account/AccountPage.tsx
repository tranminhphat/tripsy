import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import { accountSettingOptions } from "constants/index";
import { useCurrentUser } from "hooks/queries/users";
import MainLayout from "layouts/MainLayout";
import * as React from "react";
import { Link } from "react-router-dom";

interface Props {}

const AccountPage: React.FC<Props> = () => {
  const { data: userData } = useCurrentUser();

  return (
    <MainLayout withSearchBar={false}>
      {userData ? (
        <div className="container mx-auto px-28 mt-8">
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold">Tài khoản</h1>
            <p className="text-lg mt-2">
              <strong>
                {userData.lastName} {userData.firstName},{" "}
              </strong>
              <span>{userData.email} - </span>
              <Link
                className="font-bold text-secondary hover:underline"
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
                      <h3 className="mt-2 text-2xl font-bold text-secondary">
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
        <div className="flex-grow justify-center items-center">
          <MyLoadingIndicator width={300} height={300} />
        </div>
      )}
    </MainLayout>
  );
};

export default AccountPage;

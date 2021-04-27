import PersonalInfoSettings from "assets/images/icons/info-settings.svg";
import PasswordSettings from "assets/images/icons/password-settings.svg";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import { useCurrentUser } from "hooks/queries/users";
import MainLayout from "layouts/MainLayout";
import * as React from "react";
import { Link } from "react-router-dom";

interface Props {}

const AccountPage: React.FC<Props> = () => {
  const { data: userData } = useCurrentUser();

  return (
    <MainLayout>
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
            <div className="shadow-xl border border-gray-200 rounded-xl">
              <Link
                className="w-full h-full"
                to="/account-settings/personal-info"
              >
                <div className="p-8 flex flex-col">
                  <div>
                    <img src={PersonalInfoSettings} alt="info settings" />
                  </div>
                  <div>
                    <h3 className="mt-2 text-2xl font-bold text-secondary">
                      Thông tin cá nhân
                    </h3>
                  </div>
                  <div>
                    <p className="mt-2 text-lg">
                      Cung cấp thông tin cá nhân và cách chúng tôi có thể liên
                      hệ với bạn
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="shadow-xl border border-gray-200 rounded-xl">
              <Link
                className="w-full h-full"
                to="/account-settings/login-and-security"
              >
                <div className="p-8 flex flex-col">
                  <div>
                    <img src={PasswordSettings} alt="login settings" />
                  </div>
                  <div>
                    <h3 className="mt-2 text-2xl font-bold text-secondary">
                      Đăng nhập và bảo mật
                    </h3>
                  </div>
                  <div>
                    <p className="mt-2 text-lg">
                      Cập nhật mật khẩu và bảo mật tài khoản của bạn
                    </p>
                  </div>
                </div>
              </Link>
            </div>
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

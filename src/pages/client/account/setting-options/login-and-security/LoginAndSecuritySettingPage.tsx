import MyBreadcrumbs from "components/Shared/MyBreadcrumbs";
import MainLayout from "layouts/MainLayout";
import * as React from "react";

interface Props {}

const LoginAndSecuritySettingPage: React.FC<Props> = () => {
  return (
    <MainLayout withSearchBar={false}>
      <MyBreadcrumbs
        linkArray={[
          {
            path: "/account-settings",
            name: "Tài khoản",
          },
          {
            path: "/account-settings/login-and-security",
            name: "Đăng nhập và bảo mật",
          },
        ]}
      />
      <div>This is login and security page</div>
    </MainLayout>
  );
};

export default LoginAndSecuritySettingPage;

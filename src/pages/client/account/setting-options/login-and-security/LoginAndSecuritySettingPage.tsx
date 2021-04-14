import { Button } from "@material-ui/core";
import { changePassword } from "api/users";
import MyBreadcrumbs from "components/Shared/MyBreadcrumbs";
import MyTextField from "components/Shared/MyTextField";
import { Form, Formik } from "formik";
import MainLayout from "layouts/MainLayout";
import * as React from "react";
import { useDispatch } from "react-redux";
import { showAlert } from "redux/actions/alert/alertAction";
import * as yup from "yup";

interface Props {}

const LoginAndSecuritySettingPage: React.FC<Props> = () => {
  const dispatch = useDispatch();

  const handleChangePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    try {
      const { data } = await changePassword(currentPassword, newPassword);
      if (data) {
        dispatch(showAlert("success", data));
      }
    } catch (err) {
      if (err.response) {
        const { userMessage } = err.response.data.error;
        dispatch(showAlert("error", userMessage));
      }
    }
  };

  const validationSchema = yup.object({
    oldPassword: yup
      .string()
      .required("Mật khẩu hiện tại là thông tin bắt buộc")
      .min(6, "Mật khẩu phải có tối thiểu 6 ký tự"),

    password: yup
      .string()
      .required("Mật khẩu mới là thông tin bắt buộc")
      .min(6, "Mật khẩu mới phải có tối thiểu 6 ký tự"),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Mật khẩu mới không trùng khớp"),
  });
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
              path: "/account-settings/login-and-security",
              name: "Đăng nhập và bảo mật",
            },
          ]}
        />
        <div className="my-4">
          <h1 className="text-4xl font-bold text-secondary">
            Đăng nhập và bảo mật
          </h1>
        </div>
        <Formik
          initialValues={{ oldPassword: "", password: "", confirmPassword: "" }}
          onSubmit={(values) => {
            handleChangePassword(values.oldPassword, values.password);
          }}
          validationSchema={validationSchema}
        >
          {() => (
            <Form>
              <div className="mt-16 max-w-xl">
                <div>
                  <h3 className="text-lg font-bold text-secondary">
                    Đổi mật khẩu
                  </h3>
                </div>
                <div className="mt-4">
                  <label>Mật khẩu hiện tại</label>
                  <div className="mt-2">
                    <MyTextField
                      type="password"
                      name="oldPassword"
                      className="w-full border border-gray-300 hover:border-black rounded-md"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label>Mật khẩu mới</label>
                  <div className="mt-2">
                    <MyTextField
                      type="password"
                      name="password"
                      className="w-full border border-gray-300 hover:border-black rounded-md"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label>Nhập lại mật khẩu mới</label>
                  <div className="mt-2">
                    <MyTextField
                      type="password"
                      name="confirmPassword"
                      className="w-full border border-gray-300 hover:border-black rounded-md"
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-end items-center">
                  <div>
                    <Button
                      variant="contained"
                      size="large"
                      className="bg-primary text-white"
                      type="submit"
                    >
                      Thay đổi
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </MainLayout>
  );
};

export default LoginAndSecuritySettingPage;

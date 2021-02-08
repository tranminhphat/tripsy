import * as React from "react";
import { LoginForm } from "../../components/LoginForm";
import { login } from "../../api/Auth";
import { RouteComponentProps } from "react-router-dom";
import ILoginForm from "../../@types/forms/LoginForm";
import { getUserById } from "../../api/User";

interface Props extends RouteComponentProps {}

export const LoginPage: React.FC<Props> = ({ history }) => {
  const handleSubmit = async (values: ILoginForm) => {
    try {
      const res = await login(values);
      if (res.data.user) {
        const userData = await getUserById(res.data.user);
        console.log(userData);
        history.push("/");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="flex justify-center">
      <LoginForm onSubmit={(values: ILoginForm) => handleSubmit(values)} />
    </div>
  );
};

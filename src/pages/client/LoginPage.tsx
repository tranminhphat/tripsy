import * as React from "react";
import { LoginForm } from "../../components/LoginForm";
import { login } from "../../api/Auth";
import { RouteComponentProps } from "react-router-dom";
import ILoginForm from "../../@types/forms/LoginForm";

interface Props extends RouteComponentProps {}

export const LoginPage: React.FC<Props> = ({ history }) => {
  const handleSubmit = async (values: ILoginForm) => {
    try {
      const res = await login(values);
      console.log(res.data);
      if (res.data.user) {
        history.push("/", { userId: res.data.user });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex justify-center">
      <LoginForm onSubmit={(values: ILoginForm) => handleSubmit(values)} />
    </div>
  );
};

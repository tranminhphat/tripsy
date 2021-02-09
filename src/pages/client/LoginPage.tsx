import * as React from "react";
import { LoginForm } from "../../components/LoginForm";
import { login } from "../../api/Auth";
import { RouteComponentProps } from "react-router-dom";
import ILoginForm from "../../@types/forms/LoginForm";

interface Props extends RouteComponentProps {}

const LoginPage: React.FC<Props> = ({ history }) => {
  const handleSubmit = async (values: ILoginForm) => {
    try {
      const { data } = await login(values);
      if (data.user) {
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

export default LoginPage;

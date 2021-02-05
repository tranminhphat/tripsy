import * as React from "react";
import { LoginForm } from "../../components/LoginForm";
import { login } from "../../api/Auth";
import { RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps {}

export const LoginPage: React.FC<Props> = ({ history }) => {
  const handleSubmit = async (values: any) => {
    try {
      login(values);
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <LoginForm onSubmit={(values) => handleSubmit(values)} />
    </div>
  );
};

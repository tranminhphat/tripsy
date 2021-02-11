import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import IRegisterForm from "interfaces/forms/RegisterForm.interface";
import { register } from "api/Auth";
import RegisterForm from "components/RegisterForm";

interface Props extends RouteComponentProps {}

export const RegisterPage: React.FC<Props> = ({ history }) => {
  const handleSubmit = async (values: IRegisterForm) => {
    try {
      const res = await register(values);
      if (res.data) {
        history.push("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center">
      <RegisterForm
        onSubmit={(values: IRegisterForm) => handleSubmit(values)}
      />
    </div>
  );
};

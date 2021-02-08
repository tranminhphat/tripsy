import * as React from "react";
import { LoginForm } from "../../components/LoginForm";
import { login } from "../../api/Auth";
import { RouteComponentProps } from "react-router-dom";
import ILoginForm from "../../@types/forms/LoginForm";
import { getUserById } from "../../api/User";
import { setUserFullName } from "../../actions/user";
import { connect } from "react-redux";

interface Props extends RouteComponentProps {
  changeFullName: (fullName: string) => void;
}

const LoginPage: React.FC<Props> = ({ history, changeFullName }) => {
  const handleSubmit = async (values: ILoginForm) => {
    try {
      const res = await login(values);
      if (res.data.user) {
        const userData = await getUserById(res.data.user);
        const { fullName } = userData.data.user;
        console.log(userData);
        changeFullName(fullName);
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

const mapDispatchToProps = (dispatch) => ({
  changeFullName: (fullName: string) => dispatch(setUserFullName(fullName)),
});

export default connect(null, mapDispatchToProps)(LoginPage);

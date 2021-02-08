import LoginForm from "./LoginForm";

interface IRegisterForm extends LoginForm {
  fullName: string;
  username: string;
}

export default IRegisterForm;

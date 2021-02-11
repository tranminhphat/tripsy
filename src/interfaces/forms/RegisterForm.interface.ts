import LoginForm from "./LoginForm.interface";

interface IRegisterForm extends LoginForm {
  fullName: string;
  username: string;
}

export default IRegisterForm;

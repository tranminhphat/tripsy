import { FileReaderResultType } from "types";
import LoginForm from "./login-form.interface";

interface IRegisterForm extends LoginForm {
  firstName: string;
  lastName: string;
  username: string;
  gender: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: string;
  avatarBase64?: FileReaderResultType;
  introduction?: string;
}

export default IRegisterForm;

import { FileReaderResultType } from "types";
import LoginForm from "./login-form.interface";

interface IRegisterForm extends LoginForm {
  fullName: string;
  username: string;
  avatarBase64: FileReaderResultType;
}

export default IRegisterForm;
